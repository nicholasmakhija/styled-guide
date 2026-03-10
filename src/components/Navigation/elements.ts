import styled, { style } from '@styled';

import {
  asRem,
  breakpoints,
  focusVisible
} from '@utils';
import {
  BORDER_SIZE,
  CONTENT_SPACER,
  CSS_VARS,
  CUBIC_BEZIER,
  NAV_LINK_PADDING,
  NAV_WIDTH,
  TYPOGRAPHY
} from '@constants';

import type { CSSProperties } from '@styled';

export const Nav = styled.nav<NavProps>({
  position: 'fixed',
  left: asRem(-NAV_WIDTH),
  visibility: 'hidden',
  transition: CUBIC_BEZIER,
  width: asRem(NAV_WIDTH),
  height: '100%',
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
        content: '',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transition: CUBIC_BEZIER,
        background: 'rgba(0, 0, 0, 0.6)'
      }
    }
  }
});

export const NavContent = styled
  .div<NavContentProps>({
    position: 'relative',
    overflow: 'hidden',
    overflowY: 'auto',
    height: '100%',
    paddingTop: asRem(CONTENT_SPACER),
    paddingBottom: asRem(72),
    backgroundColor: CSS_VARS.BACKGROUND.PRIMARY
  })
  .withRef();

export const NavList = styled.ul({
  position: 'relative',
  margin: 0,
  padding: `0 ${asRem(CONTENT_SPACER)}`,
  listStyle: 'none',
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
    style.focusVisible
  )]: styles
});

export const NavLink = styled.a<NavLinkProps>({
  ...focusVisible(),
  ...notHoverAndFocus({
    background: CSS_VARS.ACCENT
  }),
  position: 'relative',
  display: 'inline-block',
  transition: CUBIC_BEZIER,
  padding: asRem(NAV_LINK_PADDING),
  background: 'transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  color: CSS_VARS.COLOUR.CONTENT,
  [style.hover]: {
    color: CSS_VARS.ACCENT
  },
  [style.prop('isTitle')]: {
    ...TYPOGRAPHY.H2,
    ...notHoverAndFocus({
      background: 'transparent',
      [style.after]: {
        width: asRem(12)
      }
    }),
    fontWeight: 'bold',
    [style.after]: {
      content: '',
      position: 'absolute',
      right: asRem(-CONTENT_SPACER),
      transition: CUBIC_BEZIER,
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
