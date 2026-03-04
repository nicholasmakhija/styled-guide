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
    TOOLTIP: [
      'rgb(255, 255, 255)'
    ],
    TABLE: [
      'rgb(247, 247, 247, 0.7)',
      'rgb(22, 26, 29, 0.4)'
    ],
    HEADER: [
      'rgba(247, 247, 247, 0.8)',
      'rgba(29, 33, 37, 0.8)'
    ],
    FOOTER: [
      'rgb(247, 247, 247)', // BACKGROUND.SECONDARY.LIGHT
      'rgb(29, 33, 37)' // BACKGROUND.PRIMARY.DARK
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
    TOOLTIP: [
      '#1c1c1c'
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

type CustomDeclarations = {
  LIGHT: string[];
  DARK: string[];
};

export const CSS_DECLARATIONS: CustomDeclarations = {
  LIGHT: [],
  DARK: []
};

const createVar = (
  keys: string[],
  lightAndDarkColours: string[]
): string => {
  const theme = [CSS_DECLARATIONS.LIGHT, CSS_DECLARATIONS.DARK];
  const p = keys.join('-').toLowerCase();

  lightAndDarkColours.forEach((c, i) => theme[i].push(`${p}: ${c};`));

  return `var(${p})`;
};

type MappedVar<T> = {
  [K in keyof T]: T[K] extends string[] ? string : {
    [N in keyof T[K]]: string
  }
};

const mapToVars = <T extends object>(
  target: T,
  propertyKeys: string[] = []
): MappedVar<T> => Object
  .entries(target)
  .reduce((collected, [PROP, VALUE]) => ({
    ...collected,
    [PROP]: Array.isArray(VALUE)
      ? createVar([...propertyKeys, PROP], VALUE as string[])
      : mapToVars(VALUE, [...propertyKeys, PROP])
  }), {} as MappedVar<T>);

export const CSS_VARS = mapToVars(TOKENS, ['--sg']);
