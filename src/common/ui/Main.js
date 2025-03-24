import styled, { style } from '@styled';

import {
  asRem,
  boxShadowBorder,
  breakpoints,
  typography
} from '@common/utils';
import {
  ANCHOR,
  BORDER_SIZE,
  CONTENT_SPACER,
  CSS_VARS,
  GUTTER_WIDTH,
  NAV_WIDTH
} from '@common/constants';

/**
 * @param {('h1' | 'h2' | 'h3')} heading
 * @param {number} size
 * @param {number} leading
 * @returns {Record<string, Typography>}
 */
const headingTypography = (
  heading,
  size,
  leading
) => ({
  [style.selector(heading)]: typography(size, leading)
});

/**
 * @param {CodeBlockColours} name 
 * @param {string} hex 
 * @returns {Record<string, Color>}
 */
const dataColor = (name, hex) => ({
  [style.selector(style.data(name))]: {
    color: hex
  }
});

/**
 * @param {keyof import('@common/utils').Breakpoints} breakpoint 
 * @param {number} columns 
 * @returns 
 */
const asColumns = (breakpoint, columns) => ({
  [breakpoints.up[breakpoint]]: {
    columns: columns
  }
});

/** @type {import('@styled').StyledComponent<MainProps>} */
export const Main = styled.main({
  ...headingTypography('h1', 32, 40),
  flex: 1,
  paddingTop: asRem(CONTENT_SPACER),
  paddingRight: asRem(GUTTER_WIDTH),
  paddingLeft: asRem(GUTTER_WIDTH),
  maxWidth: '100%',
  [breakpoints.up.lg]: {
    marginLeft: asRem(NAV_WIDTH),
    maxWidth: `calc(100% - ${asRem(NAV_WIDTH)})`
  },
  [style.selector('a')]: ANCHOR,
  [style.selector(
    '> h1',
    '> section > *'
  )]: {
    margin: `0 0 ${asRem(CONTENT_SPACER)}`,
    [style.lastChild]: {
      marginBottom: 0
    }
  },
  [style.selector('section')]: {
    ...headingTypography('h2', 24, 32),
    ...headingTypography('h3', 18, 32),
    margin: `0 0 ${asRem(CONTENT_SPACER * 2)}`,
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
    }
  },
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
    ...dataColor('white', CSS_VARS.COLOUR.CODE ), // base 
    ...dataColor('yellow', '#e7ee98'), // string
    padding: `0 ${asRem(4)}`,
    borderRadius: asRem(4),
    background: CSS_VARS.BACKGROUND.CODE,
    overflow: 'hidden',
    [style.selector('[data-em]')]: {
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
  [style.selector('[data-table]')]: {
    padding: `0 ${asRem(8)}`,
    background: CSS_VARS.BACKGROUND.TABLE,
    boxShadow:  'inset ' + boxShadowBorder(BORDER_SIZE, CSS_VARS.BORDER).boxShadow,
    [style.selector('> div')]: {
      overflow: 'hidden',
      overflowX: 'auto'
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
    [style.selector('[data-highlight]')]: {
      color: 'rgb(79, 159, 207)'
    }
  }
}).withRef();
