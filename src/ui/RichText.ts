import styled, { style } from '@styled';

import {
  asRem,
  boxShadowBorder,
  breakpoints,
  withScrollMarginTop
} from '@utils';
import {
  ANCHOR,
  BACKGROUND_TRANSPARENT,
  BORDER_SIZE,
  BORDER_ZERO,
  BREAKPOINTS,
  BOX,
  CHILD_PARADIGM,
  CONTENT_SPACER,
  CSS_VARS,
  DISPLAY_BLOCK,
  MARGIN_ZERO,
  OVERFLOW_HIDDEN,
  TYPOGRAPHY,
  VERTICAL_ALIGN_TOP
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
    background: CSS_VARS.BACKGROUND.SECONDARY,
    padding: asRem(8),
    paddingLeft: asRem(CONTENT_SPACER),
    boxShadow: `
      0 ${asRem(BORDER_SIZE)} 0 0 ${CSS_VARS.BORDER},
      inset ${asRem(4)} 0 0 0 ${CSS_VARS.ACCENT}
    `,
    [style.selector('> strong')]: {
      ...DISPLAY_BLOCK,
      color: CSS_VARS.ACCENT
    }
  },
  [style.selector('code')]: {
    ...BOX,
    ...OVERFLOW_HIDDEN,
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
    background: CSS_VARS.BACKGROUND.CODE,
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
      ...BACKGROUND_TRANSPARENT,
      ...DISPLAY_BLOCK,
      ...OVERFLOW_HIDDEN,
      padding: `${asRem(16)} 0`,
      borderRadius: 0,
      boxShadow: 'none',
      overflowX: 'auto',
      whiteSpace: 'pre'
    }
  },
  [style.selector('table')]: {
    ...BORDER_ZERO,
    ...MARGIN_ZERO,
    ...VERTICAL_ALIGN_TOP,
    padding: 0,
    tableLayout: 'auto',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%',
    wordBreak: 'normal',
    whiteSpace: 'nowrap',
    [style.selector('thead', 'tbody', 'tr')]: {
      ...BORDER_ZERO,
      ...MARGIN_ZERO,
      ...VERTICAL_ALIGN_TOP
    },
    [style.selector('tbody tr')]: {
      borderTop: `${asRem(BORDER_SIZE)} solid ${CSS_VARS.BORDER}`
    },
    [style.selector('th')]: {
      textAlign: 'left',
      fontWeight: 'bold'
    },
    [style.selector('th', 'td')]: {
      ...BORDER_ZERO,
      ...MARGIN_ZERO,
      padding: `${asRem(12)} ${asRem(8)}`
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
      ...OVERFLOW_HIDDEN,
      overflowX: 'auto'
    }
  }
});
