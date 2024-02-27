export const FORGE = {};

/**
 * The set of Attribute Scores used within the system.
 * @type {Object}
 */
FORGE.attributes = {
  str: 'FORGE.Attribute.Str.Long',
  dex: 'FORGE.Attribute.Dex.Long',
  con: 'FORGE.Attribute.Con.Long',
  int: 'FORGE.Attribute.Int.Long',
  wis: 'FORGE.Attribute.Wis.Long',
  cha: 'FORGE.Attribute.Cha.Long',
};

FORGE.attributeAbbreviations = {
  str: 'FORGE.Attribute.Str.Abbr',
  dex: 'FORGE.Attribute.Dex.Abbr',
  con: 'FORGE.Attribute.Con.Abbr',
  int: 'FORGE.Attribute.Int.Abbr',
  wis: 'FORGE.Attribute.Wis.Abbr',
  cha: 'FORGE.Attribute.Cha.Abbr',
};

FORGE.attributeDetails = {
  str: 'FORGE.Attribute.Str.Detail',
  dex: 'FORGE.Attribute.Dex.Detail',
  con: 'FORGE.Attribute.Con.Detail',
  int: 'FORGE.Attribute.Int.Detail',
  wis: 'FORGE.Attribute.Wis.Detail',
  cha: 'FORGE.Attribute.Cha.Detail',
}

FORGE.attributeModifiers = {
  1: -4,
  2: -3,
  3: -3,
  4: -2,
  5: -2,
  6: -1,
  7: -1,
  8: -1,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 1,
  14: 1,
  15: 1,
  16: 2,
  17: 2,
  18: 3
};

FORGE.advancement = {
  1: 0,
  2: 2000,
  3: 4000,
  4: 8000,
  5: 16000,
  6: 32000,
  7: 64000,
  8: 125000,
  9: 250000,
  10: 500000
};

FORGE.movement = {
  "Close": {
    label: 'FORGE.Distance.Close.label',
    Detail: 'FORGE.Distance.Close.Detail',
    value: 15
  },
  "Near": {
    label: 'FORGE.Distance.Near.label',
    Detail: 'FORGE.Distance.Near.Detail',
    value: 30
  },
  "Far": {
    label: 'FORGE.Distance.Far.label',
    Detail: 'FORGE.Distance.Far.Detail',
    value: 60
  },
  "Very Far": {
    label: 'FORGE.Distance.VeryFar.label',
    Detail: 'FORGE.Distance.VeryFar.Detail',
    value: 120
  },
  "Distant" : {
    label: 'FORGE.Distance.Distant.label',
    Detail: 'FORGE.Distance.Distant.Detail',
    value: 240
  }
}
