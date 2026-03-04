import styled, { style } from '@styled';

import {
  asRem,
  boxShadowBorder,
  breakpoints,
  contentParadigm,
  headingWithScrollMargin,
  typography
} from '@utils';
import {
  ANCHOR,
  BORDER_SIZE,
  BREAKPOINTS,
  CONTENT_SPACER,
  CSS_VARS
} from '@constants';

import type { CSSProperties } from '@styled';

const dataSelector = (name: string): string => style.selector(style.data(name));

const dataColor = (
  name: CodeBlockColours,
  hex: string
): Record<string, Color> => ({
  [dataSelector(name)]: {
    color: hex
  }
});

const asColumns = (
  breakpoint: Lowercase<keyof typeof BREAKPOINTS>,
  columns: number
): CSSProperties => ({
  [breakpoints.up[breakpoint]]: {
    columns: columns
  }
});

const childParadigm = {
  [style.selector('> *')]: contentParadigm(CONTENT_SPACER)
};

export const Title = styled.h1({
  ...contentParadigm(CONTENT_SPACER),
  ...typography(32, 40),
  scrollMarginTop: 0
});

export const Section = styled.section({
  ...contentParadigm(CONTENT_SPACER * 2),
  ...childParadigm
});

export const SectionGroup = styled.div<SectionGroupProps>({
  ...childParadigm,
  [style.selector('h3')]: headingWithScrollMargin(18, 32),
  [style.selector('> ul')]: {
    paddingLeft: 0,
    // @ts-ignore
    [style.data('column')]: {
      ...asColumns('sm', 2),
      ...asColumns('md', 3)
    },
    [style.selector('li')]: {
      marginLeft: asRem(CONTENT_SPACER)
    }
  },
  [style.selector('a')]: ANCHOR,
  [style.selector('blockquote')]: {
    background: CSS_VARS.BACKGROUND.SECONDARY,
    padding: asRem(8),
    paddingLeft: asRem(CONTENT_SPACER),
    fontSize: asRem(14),
    boxShadow: `
      0 ${asRem(BORDER_SIZE)} 0 0 ${CSS_VARS.BORDER},
      inset ${asRem(4)} 0 0 0 ${CSS_VARS.ACCENT}
    `,
    [style.selector('> strong')]: {
      display: 'block',
      color: CSS_VARS.ACCENT
    }
  },
  [style.selector('code')]: {
    ...boxShadowBorder(2, CSS_VARS.BORDER),
    ...typography(14, 20),
    ...dataColor('blue', '#96dfef'), // type, jsx, {}
    ...dataColor('green', '#61e884'), // function, {}
    ...dataColor('grey', '#697098'), // comment
    ...dataColor('orange', '#ffb86c'), // arg, ${}
    ...dataColor('pink', '#eb82bf'), // keyword, {}
    ...dataColor('purple', '#bf9eee'), // variable, number
    ...dataColor('white', CSS_VARS.COLOUR.CODE), // base
    ...dataColor('yellow', '#e7ee98'), // string
    padding: `0 ${asRem(4)}`,
    borderRadius: asRem(4),
    background: CSS_VARS.BACKGROUND.CODE,
    overflow: 'hidden',
    [dataSelector('em')]: {
      fontStyle: 'italic'
    }
  },
  [style.selector('pre')]: {
    padding: `0 ${asRem(16)}`,
    background: CSS_VARS.BACKGROUND.PRE,
    color: CSS_VARS.COLOUR.CODE,
    whiteSpace: 'pre',
    [style.selector('> code')]: {
      padding: `${asRem(16)} 0`,
      borderRadius: 0,
      background: 'transparent',
      boxShadow: 'none',
      overflow: 'hidden',
      overflowX: 'auto',
      display: 'block',
      whiteSpace: 'pre'
    }
  },
  [style.selector('table')]: {
    margin: 0,
    padding: 0,
    border: 0,
    verticalAlign: 'top',
    tableLayout: 'auto',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%',
    wordBreak: 'normal',
    whiteSpace: 'nowrap',
    [style.selector('thead', 'tbody', 'tr')]: {
      margin: 0,
      border: 0,
      verticalAlign: 'top'
    },
    [style.selector('tbody tr')]: {
      borderTop: `${asRem(BORDER_SIZE)} solid ${CSS_VARS.BORDER}`
    },
    [style.selector('th')]: {
      textAlign: 'left',
      fontWeight: 'bold'
    },
    [style.selector('th', 'td')]: {
      margin: 0,
      padding: `${asRem(12)} ${asRem(8)}`,
      border: 0
    },
    [dataSelector('highlight')]: {
      color: 'rgb(79, 159, 207)'
    }
  },
  [dataSelector('table')]: {
    padding: `0 ${asRem(8)}`,
    background: CSS_VARS.BACKGROUND.TABLE,
    boxShadow:
      'inset ' + boxShadowBorder(BORDER_SIZE, CSS_VARS.BORDER).boxShadow,
    [style.selector('> div')]: {
      overflow: 'hidden',
      overflowX: 'auto'
    }
  }
});
