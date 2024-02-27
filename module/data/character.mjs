import ForgeActorBase from "./actor-base.mjs";

export default class ForgeCharacter extends ForgeActorBase {

    static defineSchema() {
        const fields = foundry.data.fields;
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        // Iterate over attribute names and create a new SchemaField for each.
        schema.attributes = new fields.SchemaField(Object.keys(CONFIG.FORGE.attributes).reduce((obj, attribute) => {
            obj[attribute] = new fields.SchemaField({
                value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 1, max: 18 }),
                primary: new fields.BooleanField({ initial: false })
            });
            return obj;
        }, {}));

        schema.ac = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
        });
        schema.followers = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            max: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
        });
        schema.level = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 10 }),
            negative: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        });
        schema.movement = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 30, min: 0 })
        });
        schema.slots = new fields.SchemaField({
            value: new fields.NumberField({ required: true, nullable: false, initial: 0, min: 0 })
        });
        schema.spells = new fields.SchemaField({
            arcane: new fields.SchemaField({
                value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
            }),
            divine: new fields.SchemaField({
                value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
            })
        });
        schema.xp = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 500000 })
        });

        return schema;
    }

    prepareDerivedData() {
        // Attribute Scores
        const attributes = this.attributes;
        const level = this.level.value;

        for (const [key, attribute] of Object.entries(attributes)) {
            // Lookup the attribute modifier, or 3 if score > 18, and add to primary or secondary level modifier
            if (attribute.primary){
                attribute.mod = CONFIG.FORGE.attributeModifiers[attribute.value] + level
            }
            else {
                attribute.mod = CONFIG.FORGE.attributeModifiers[attribute.value] + Math.floor(level / 2);
            }
            // Handle attribute label and detail localization.
            attribute.label = CONFIG.FORGE.attributes[key] ?? key;
            attribute.detail = CONFIG.FORGE.attributeDetails[key] ?? key;
        }

        // Followers
        this.followers.max = attributes.cha.mod + 2;

        // HP
        this.hp.die = attributes.con.primary ? 'd8' : 'd6';

        // Level
        const baseLevel = parseInt(Object.entries(CONFIG.FORGE.advancement).find(([level, exp]) => exp >= this.xp.value)[0] - 1) || 1;
        this.level.value = baseLevel - this.level.negative;
        if ((this.level.value > 0) && (this.level.value === this.level.negative)) {
            // Kill the PC when negative levels = character levels
            this.parent.statuses.add(CONFIG.specialStatusEffects.DEAD);
        }

        // Movement
        const movement = this.movement;
        const selectedMovement = Object.values(CONFIG.FORGE.movement).find(obj => obj.value <= movement.value);
        this.movement.label = selectedMovement.label;
        this.movement.detail = selectedMovement.detail;

        // Slots
        this.slots.max = attributes.str.mod + 10;

        // Spells
        const spells = this.spells;
        spells.arcane.power = attributes.int.mod + 10;
        spells.arcane.max = attributes.int.mod;
        spells.divine.power = attributes.wis.mod + 10;
        spells.divine.max = attributes.wis.mod;
    }

    async rest() {
        const hp = this.hp
        const dead = CONFIG.specialStatusEffects.DEAD;
        const effects = this.parent.effects;

        let r = new Roll(this.hp.die);
        await r.evaluate();

        const healedHP = Math.min((hp.value + this.attributes.con.value + r.total), (hp.max - hp.value));
        hp.value = hp.value + healedHP;
        this.level.negative = Math.max(this.level.negative - 1, 0)

        r.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `${this.actor.name} ${game.i18n.localize('FORGE.Health.Flavor')} ${healedHP} ${game.i18n.localize('FORGE.Health.HP')}`,
            rollMode: game.settings.get('core', 'rollMode')
        });
    }
}