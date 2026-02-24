import styled, { style } from '@styled';

import {
  asRem,
  breakpoints,
  typography
} from '@utils/index';
import {
  BORDER_SIZE,
  CONTENT_SPACER,
  CSS_VARS,
  CUBIC_BEZIER_TRANSITION,
  HEADER_HEIGHT,
  NAV_LINK_PADDING,
  NAV_WIDTH
} from '@constants/index';

import type { CSSProperties } from '@styled';

export const Nav = styled.nav<NavProps>({
  ...CUBIC_BEZIER_TRANSITION,
  position: 'fixed',
  top: asRem(HEADER_HEIGHT),
  left: asRem(-NAV_WIDTH),
  width: asRem(NAV_WIDTH),
  height: '100%',
  visibility: 'hidden',
  textAlign: 'right',
  [breakpoints.up.lg]: {
    left: 'auto',
    visibility: 'visible'
  },
  [style.prop('isOpen')]: {
    [breakpoints.down.lg]: {
      zIndex: 2,
      left: 0,
      visibility: 'visible',
      [style.before]: {
        ...CUBIC_BEZIER_TRANSITION,
        content: '',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.6)'
      }
    }
  }
});

export const NavContent = styled
  .div<NavContentProps>({
    position: 'relative',
    height: '100%',
    paddingTop: asRem(CONTENT_SPACER),
    paddingBottom: asRem(72),
    overflow: 'hidden',
    overflowY: 'auto',
    backgroundColor: CSS_VARS.BACKGROUND.PRIMARY
  })
  .withRef();

export const NavList = styled.ul({
  position: 'relative',
  listStyle: 'none',
  margin: 0,
  padding: `0 ${asRem(CONTENT_SPACER)}`,
  [style.after]: {
    [breakpoints.up.lg]: {
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      width: asRem(BORDER_SIZE),
      height: '100%',
      background: CSS_VARS.BORDER
    }
  }
});

export const NavItem = styled.li({
  margin: 0,
  padding: `0 0 ${asRem(4)}`,
  [style.or(
    style.firstChild,
    style.lastChild
  )]: {
    paddingBottom: asRem(CONTENT_SPACER)
  }
});

const notHoverAndFocus = (styles: CSSProperties): CSSProperties => ({
  [style.and(
    style.not(style.hover),
    style.focus
  )]: styles
});

export const NavLink = styled.a<NavLinkProps>({
  ...CUBIC_BEZIER_TRANSITION,
  ...notHoverAndFocus({
    background: CSS_VARS.ACCENT
  }),
  position: 'relative',
  display: 'inline-block',
  padding: asRem(NAV_LINK_PADDING),
  textDecoration: 'none',
  background: 'transparent',
  color: CSS_VARS.COLOUR.CONTENT,
  cursor: 'pointer',
  [style.hover]: {
    color: CSS_VARS.ACCENT
  },
  [style.focus]: {
    outline: 0
  },
  [style.prop('isTitle')]: {
    ...typography(24, 32),
    ...notHoverAndFocus({
      background: 'none',
      [style.after]: {
        width: asRem(12)
      }
    }),
    fontWeight: 'bold',
    [style.after]: {
      ...CUBIC_BEZIER_TRANSITION,
      content: '',
      position: 'absolute',
      right: asRem(-CONTENT_SPACER),
      width: 0,
      height: asRem(32),
      background: CSS_VARS.ACCENT
    }
  },
  [style.props.all('isTitle', 'isActive')]: {
    color: CSS_VARS.ACCENT,
    [style.after]: {
      width: asRem(8)
    }
  }
});
