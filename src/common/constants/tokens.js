const TOKENS = {
  BACKGROUND: {
    PRIMARY: [
      'rgb(255, 255, 255)', 
      'rgb(29, 33, 37)'
    ],
    SECONDARY: [
      'rgb(247, 247, 247)',
      'rgb(22, 26, 29)'
    ],
    SECONDARY_PALE: [
      'rgb(247, 247, 247, 0.7)',
      'rgb(22, 26, 29, 0.4)'
    ],
    HEADER: [
      'rgba(247, 247, 247, 0.8)',
      'rgba(29, 33, 37, 0.8)'
    ],
    PRE: ['rgb(45, 52, 64)'],
    CODE: [
      'rgba(246, 247, 248, 1)',
      'rgba(255, 255, 255, 0.10)'
    ]
  },
  COLOUR: {
    CONTENT: [
      '#1c1c1c',
      '#e8e8e8'
    ],
    CODE: ['#f5f5f4'] 
  },
  BORDER: [
    'rgba(0, 0, 0, 0.1)',
    'rgba(235, 236, 240, 0.1)'
  ],
  ACCENT: ['#ff6995'],
  SKELETON: [
    'rgba(0, 0, 0, 0.11)',
    'rgba(255, 255, 255, 0.13)'
  ]
};

export const CSS_DECLARATIONS = {
  LIGHT: [],
  DARK: []
};

/**
 * @typedef {[light: string, dark?: string]} ThemeTuple
 */

/**
 * @param {string} property 
 * @param {ThemeTuple} theme 
 */
const addToDeclaration = (property, theme) => {
  const mapped = [CSS_DECLARATIONS.LIGHT, CSS_DECLARATIONS.DARK];

  theme.forEach((t, i) => mapped[i].push(`${property}: ${t};`));
};

/**
 * @param {string[]} keys 
 * @param {ThemeTuple} lightAndDarkHex 
 * @returns 
 */
const createVar = (keys, lightAndDarkHex) => {
  const customProp = keys.join('-').toLowerCase();
  
  addToDeclaration(customProp, lightAndDarkHex);

  return `var(${customProp})`;
};

/**
 * @template T
 * @typedef {{
 *  [K in keyof T]: T[K] extends string[] ? string : {
 *    [N in keyof T[K]]: string
 *  }
 * }} MappedVar
 */

/**
 * @template T
 * @param {T} target 
 * @param {string[]} propertyKeys 
 * @returns {MappedVar<T>}
 */
const mapToVars = (target, propertyKeys) => Object
  .entries(target)
  .reduce((collected, [PROP, VALUE]) => ({
    ...collected,
    [PROP]: Array.isArray(VALUE)
      ? createVar([...propertyKeys, PROP], /** @type {ThemeTuple} */(VALUE))
      : mapToVars(VALUE, [...propertyKeys, PROP])
  }), /** @type {MappedVar<T>} */({}));

export const CSS_VARS = mapToVars(TOKENS, ['--sg']);
