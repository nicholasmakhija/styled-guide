import styled, { style } from '@styled';

import {
  asRem,
  breakpoints,
  focusVisible,
  typography
} from '@utils';
import {
  BACKGROUND_TRANSPARENT,
  BORDER_SIZE,
  CONTENT_SPACER,
  CSS_VARS,
  DISPLAY_INLINE_BLOCK,
  LEFT_ZERO,
  MARGIN_ZERO,
  NAV_LINK_PADDING,
  NAV_WIDTH,
  OVERFLOW_HIDDEN,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE,
  TEXT_DECORATION_NONE,
  TOP_ZERO,
  TRANSITION_CUBIC_BEZIER,
  VISIBILITY_HIDDEN,
  VISIBILITY_VISIBLE
} from '@constants';

import type { CSSProperties } from '@styled';

export const Nav = styled.nav<NavProps>({
  ...TRANSITION_CUBIC_BEZIER,
  ...VISIBILITY_HIDDEN,
  position: 'fixed',
  left: asRem(-NAV_WIDTH),
  width: asRem(NAV_WIDTH),
  height: '100%',
  textAlign: 'right',
  [breakpoints.up.lg]: {
    ...VISIBILITY_VISIBLE,
    left: 'auto'
  },
  [style.prop('isOpen')]: {
    [breakpoints.down.lg]: {
      ...LEFT_ZERO,
      ...VISIBILITY_VISIBLE,
      zIndex: 2,
      [style.before]: {
        ...LEFT_ZERO,
        ...TRANSITION_CUBIC_BEZIER,
        ...TOP_ZERO,
        content: '',
        position: 'fixed',
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)'
      }
    }
  }
});

export const NavContent = styled
  .div<NavContentProps>({
    ...OVERFLOW_HIDDEN,
    ...POSITION_RELATIVE,
    height: '100%',
    paddingTop: asRem(CONTENT_SPACER),
    paddingBottom: asRem(72),
    overflowY: 'auto',
    backgroundColor: CSS_VARS.BACKGROUND.PRIMARY
  })
  .withRef();

export const NavList = styled.ul({
  ...MARGIN_ZERO,
  ...POSITION_RELATIVE,
  listStyle: 'none',
  padding: `0 ${asRem(CONTENT_SPACER)}`,
  [style.after]: {
    [breakpoints.up.lg]: {
      ...POSITION_ABSOLUTE,
      ...TOP_ZERO,
      content: '',
      right: 0,
      width: asRem(BORDER_SIZE),
      height: '100%',
      background: CSS_VARS.BORDER
    }
  }
});

export const NavItem = styled.li({
  ...MARGIN_ZERO,
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
  ...BACKGROUND_TRANSPARENT,
  ...DISPLAY_INLINE_BLOCK,
  ...TRANSITION_CUBIC_BEZIER,
  ...POSITION_RELATIVE,
  ...TEXT_DECORATION_NONE,
  ...notHoverAndFocus({
    background: CSS_VARS.ACCENT
  }),
  ...focusVisible(),
  padding: asRem(NAV_LINK_PADDING),
  color: CSS_VARS.COLOUR.CONTENT,
  cursor: 'pointer',
  [style.hover]: {
    color: CSS_VARS.ACCENT
  },
  [style.prop('isTitle')]: {
    ...typography(24, 32),
    ...notHoverAndFocus({
      ...BACKGROUND_TRANSPARENT,
      [style.after]: {
        width: asRem(12)
      }
    }),
    fontWeight: 'bold',
    [style.after]: {
      ...TRANSITION_CUBIC_BEZIER,
      ...POSITION_ABSOLUTE,
      content: '',
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
