import styled, { style } from '@styled';

import {
  asRem,
  boxShadowBorder,
  breakpoints,
  typography
} from '@common/utils';
import {
  BORDER_SIZE,
  CONTENT_SPACER,
  CSS_VARS,
  GUTTER_WIDTH,
  NAV_WIDTH
} from '@common/constants';

/**
 * @param {(1 | 2 | 3)} level 
 * @param {number} size 
 * @param {number} leading 
 * @returns {{
 *  [key: string]: Typography
 * }}
 */
const headingTypography = (
  level,
  size,
  leading
) => ({
  [style.selector(`h${level}`)]: typography(size, leading)
});

/** @type {import('@styled').StyledComponent<MainProps>} */
export const Main = styled.main({
  ...headingTypography(1, 32, 40),
  ...headingTypography(2, 24, 32),
  ...headingTypography(3, 18, 32),
  flex: 1,
  paddingTop: asRem(CONTENT_SPACER),
  paddingRight: asRem(GUTTER_WIDTH),
  paddingLeft: asRem(GUTTER_WIDTH),
  maxWidth: '100%',
  [breakpoints.up.lg]: {
    marginLeft: asRem(NAV_WIDTH)
  },
  [style.selector('a')]: {
    color: CSS_VARS.ACCENT,
    textDecoration: 'underline',
    [style.or(
      style.hover,
      style.focus
    )]: {
      textDecoration: 'none'
    },
    [style.focus]: {
      ...boxShadowBorder(4, CSS_VARS.ACCENT),
      outline: 0,
      background: CSS_VARS.ACCENT,
      color: CSS_VARS.COLOR
    }
  },
  [style.selector(
    '> *:not(section)',
    '> section > *'
  )]: {
    margin: `0 0 ${asRem(CONTENT_SPACER)}`,
    [style.lastChild]: {
      marginBottom: 0
    }
  },
  [style.selector('section')]: {
    margin: `0 0 ${asRem(CONTENT_SPACER * 2)}`,
    [style.selector('> ul')]: {
      paddingLeft: 0,
      [style.selector('li')]: {
        marginLeft: asRem(CONTENT_SPACER)
      }
    }
  },
  [style.selector('blockquote')]: {
    background: CSS_VARS.BACKGROUND_SECONDARY,
    padding: asRem(8),
    paddingLeft: asRem(CONTENT_SPACER),
    fontSize: asRem(14),
    boxShadow: `
      0 ${asRem(BORDER_SIZE)} 0 0 ${CSS_VARS.BORDER_SECONDARY},
      inset ${asRem(4)} 0 0 0 ${CSS_VARS.ACCENT}
    `,
    [style.selector('> strong')]: {
      display: 'block',
      color: CSS_VARS.ACCENT
    }
  },  
  [style.selector('code')]: {
    ...boxShadowBorder(2, CSS_VARS.BORDER_SECONDARY),
    ...typography(14, 20),
    padding: `0 ${asRem(4)}`,
    borderRadius: asRem(4),
    background: CSS_VARS.BACKGROUND_CODE,
    overflow: 'hidden',
    [style.selector('[data-em]')]: {
      fontStyle: 'italic'
    },
    [style.selector('[data-blue]')]: { color: '#96dfef' }, // type, jsx, {}
    [style.selector('[data-green]')]: { color: '#61e884' }, // function, {}
    [style.selector('[data-grey]')]: { color: '#697098' }, // comment
    [style.selector('[data-orange]')]: { color: '#ffb86c' }, // arg, ${}
    [style.selector('[data-pink]')]: { color: '#eb82bf' }, // keyword, {}
    [style.selector('[data-purple]')]: { color: '#bf9eee' }, // variable, number
    [style.selector('[data-white]')]: { color: CSS_VARS.COLOR_CODE },
    [style.selector('[data-yellow]')]: { color: '#e7ee98' } // string
  },
  [style.selector('pre')]: {
    padding: 0,
    overflow: 'hidden',
    overflowX: 'auto',
    background: CSS_VARS.BACKGROUND_PRE,
    color: CSS_VARS.COLOR_CODE,
    whiteSpace: 'pre'
  },
  [style.selector('pre > code')]: {
    padding: asRem(16),
    borderRadius: 0,
    background: 'transparent',
    boxShadow: 'none',
    overflow: 'visible',
    display: 'block',
    whiteSpace: 'pre'
  },
  [style.selector('[data-table]')]: {
    ...boxShadowBorder(BORDER_SIZE, CSS_VARS.BORDER_SECONDARY, 'inset '),
    padding: `0 ${asRem(8)}`,
    background: CSS_VARS.BACKGROUND_SECONDARY_PALE,
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
      borderTop: `${asRem(BORDER_SIZE)} solid ${CSS_VARS.BORDER_SECONDARY}`
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
