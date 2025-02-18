import styled, { style } from '@styled';

import {
  asRem,
  boxShadowBorder,
  breakpoints
} from '@common/utils';
import {
  CONTENT_SPACER,
  CSS_VARS,
  GUTTER_WIDTH,
  HEADER_HEIGHT,
  NAV_WIDTH
} from '@common/constants';

export const HeaderRoot = styled.header({
  position: 'relative',
  zIndex: 3,
  height: asRem(HEADER_HEIGHT)
});

export const HeaderSticky = styled.div({
  position: 'fixed',
  zIndex: 2,
  top: 0,
  padding: `${asRem(14)} 0`,
  width: '100%',
  height: asRem(HEADER_HEIGHT),
  backgroundColor: CSS_VARS.BACKGROUND_HEADER,
  backdropFilter: 'saturate(180%) blur(8px)',
  WebkitBackdropFilter: 'blur(0.75rem)',
  boxShadow: `0 ${asRem(1)} ${asRem(2)} 0 ${CSS_VARS.BORDER_SECONDARY}`
});

export const HeaderBrand = styled.div({
  padding: `${asRem(4)} 0`,
  color: CSS_VARS.ACCENT,
  [style.selector('> svg')]: {
    // background: '#ccc', // FIXME: delete!
    verticalAlign: 'middle'
  },
  [breakpoints.up.lg]: {
    // background: 'rgba(255, 204, 0, 0.4)', // FIXME: delete!
    marginLeft: asRem(-GUTTER_WIDTH),
    paddingRight: asRem(CONTENT_SPACER),
    paddingLeft: asRem(CONTENT_SPACER),
    width: asRem(NAV_WIDTH),
    textAlign: 'right'
  }
});

export const HeaderActions = styled.div();

const HEADER_ICON_SIZE = 32;

const HeaderAction = styled.generic({
  margin: 0,
  padding: asRem(4),
  width: asRem(HEADER_ICON_SIZE),
  height: asRem(HEADER_ICON_SIZE),
  display: 'inline-block',
  textAlign: 'center',
  verticalAlign: 'middle',
  color: CSS_VARS.COLOR,
  transition: '0.3s cubic-bezier(0.2, 0, 0, 1)',
  [style.focus]: {
    ...boxShadowBorder(4, CSS_VARS.ACCENT),
    outline: 0,
  },
  [style.not(style.firstChild)]: {
    marginLeft: asRem(16)
  },
  [style.prop('canHover')]: {
    [style.hover]: {
      textDecoration: 'none',
      color: '#303846', // FIXME: update to use css variable
      backgroundColor: '#ebedf0' // FIXME: update to use css variable
    }
  },
  [style.prop('isRounded')]: {
    borderRadius: '50%'
  }
});

/** @type {import('@styled').StyledComponent<HeaderLinkProps>} */
export const HeaderLink = styled
  .a()
  .extend(HeaderAction, {
    textDecoration: 'none',
  });

export const Line = styled.span({
  position: 'absolute',
  display: 'block',
  width: `calc(100% - ${asRem(8)})`,
  height: asRem(2),
  transform: 'rotate(0deg)',
  transition: '0.25s ease-in-out, color 0s',
  backgroundColor: 'currentColor',
  [style.nthChild(1)]: {
    top: asRem(7)
  },
  [style.nthChild(2)]: {
    top: asRem(15),
    left: asRem(4),
  },
  [style.nthChild(3)]: {
    top: asRem(23)
  }
});

/** @type {import('@styled').StyledComponent<HeaderButtonProps>} */
export const HeaderButton = styled
  .button()
  .extend(HeaderAction, {
    border: 'none',
    backgroundColor: 'transparent',
    appearance: 'none',
    cursor: 'pointer',
    [style.prop('isToggle')]: {
      position: 'relative',
      overflow: 'hidden',
      [breakpoints.up.lg]: {
        display: 'none'
      }
    },
    [style.prop('isOpen')]: {
      [style.selector(Line)]: {
        [style.nthChild(1)]: {
          top: asRem(15),
          transform: 'rotate(135deg)'
        },
        [style.nthChild(2)]: {
          left: '100%',
          opacity: 0
        },
        [style.nthChild(3)]: {
          top: asRem(15),
          transform: 'rotate(-135deg)'
        }
      }
    }
  });