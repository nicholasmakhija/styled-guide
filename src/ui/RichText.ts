import styled, { style } from '@styled';

import {
  asRem,
  boxShadowBorder,
  breakpoints,
  withScrollMarginTop
} from '@utils';
import {
  ANCHOR,
  BORDER_SIZE,
  BREAKPOINTS,
  BOX,
  CHILD_PARADIGM,
  CONTENT_SPACER,
  CSS_VARS,
  TYPOGRAPHY
} from '@constants';

import type { CSSProperties } from '@styled';

const dataSelector = (name: string): string =>
  style.selector(style.data(name));

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

export const RichText = styled.div<RichTextProps>({
  ...CHILD_PARADIGM,
  [style.selector('h3')]: withScrollMarginTop(TYPOGRAPHY.H3),
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
    ...TYPOGRAPHY.SMALL,
    boxShadow: `
      0 ${asRem(BORDER_SIZE)} 0 0 ${CSS_VARS.BORDER},
      inset ${asRem(4)} 0 0 0 ${CSS_VARS.ACCENT}
    `,
    padding: asRem(8),
    paddingLeft: asRem(CONTENT_SPACER),
    background: CSS_VARS.BACKGROUND.SECONDARY,
    [style.selector('> strong')]: {
      display: 'block',
      color: CSS_VARS.ACCENT
    }
  },
  [style.selector('code')]: {
    ...BOX,
    ...TYPOGRAPHY.CODE,
    ...boxShadowBorder(2, CSS_VARS.BORDER),
    ...dataColor('blue', '#96dfef'), // type, jsx, {}
    ...dataColor('green', '#61e884'), // function, {}
    ...dataColor('grey', '#697098'), // comment
    ...dataColor('orange', '#ffb86c'), // arg, ${}
    ...dataColor('pink', '#eb82bf'), // keyword, {}
    ...dataColor('purple', '#bf9eee'), // variable, number
    ...dataColor('white', CSS_VARS.COLOUR.CODE), // base
    ...dataColor('yellow', '#e7ee98'), // string
    overflow: 'hidden',
    background: CSS_VARS.BACKGROUND.CODE,
    [dataSelector('em')]: {
      fontStyle: 'italic'
    }
  },
  [style.selector('pre')]: {
    padding: `0 ${asRem(16)}`,
    background: CSS_VARS.BACKGROUND.PRE,
    whiteSpace: 'pre',
    color: CSS_VARS.COLOUR.CODE,
    [style.selector('> code')]: {
      display: 'block',
      overflow: 'hidden',
      overflowX: 'auto',
      boxShadow: 'none',
      borderRadius: 0,
      padding: `${asRem(16)} 0`,
      background: 'transparent',
      whiteSpace: 'pre'
    }
  },
  [style.selector('table')]: {
    tableLayout: 'auto',
    verticalAlign: 'top',
    margin: 0,
    border: 0,
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%',
    padding: 0,
    whiteSpace: 'nowrap',
    wordBreak: 'normal',
    [style.selector('thead', 'tbody', 'tr')]: {
      verticalAlign: 'top',
      border: 0,
      margin: 0
    },
    [style.selector('tbody tr')]: {
      borderTop: `${asRem(BORDER_SIZE)} solid ${CSS_VARS.BORDER}`
    },
    [style.selector('th')]: {
      fontWeight: 'bold',
      textAlign: 'left'
    },
    [style.selector('th', 'td')]: {
      margin: 0,
      border: 0,
      padding: `${asRem(12)} ${asRem(8)}`
    },
    [dataSelector('highlight')]: {
      color: 'rgb(79, 159, 207)'
    }
  },
  [dataSelector('table')]: {
    boxShadow:
      'inset ' + boxShadowBorder(BORDER_SIZE, CSS_VARS.BORDER).boxShadow,
    padding: `0 ${asRem(8)}`,
    background: CSS_VARS.BACKGROUND.TABLE,
    [style.selector('> div')]: {
      overflow: 'hidden',
      overflowX: 'auto'
    }
  }
});
