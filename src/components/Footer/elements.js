import styled from '@styled';

import { Container } from '@common/ui';
import { asRem, breakpoints } from '@common/utils';
import {
  ANCHOR,
  BORDER_SIZE,
  CSS_VARS,
  GUTTER_WIDTH,
  NAV_WIDTH
} from '@common/constants';

const boxShadowBorderTop = {
  boxShadow: `0 ${asRem(-BORDER_SIZE)} 0 0 ${CSS_VARS.BORDER}`
};

export const FooterRoot = styled.footer({
  ...boxShadowBorderTop,
  position: 'relative',
  background: CSS_VARS.BACKGROUND.FOOTER,
  [breakpoints.up.lg]: {
    boxShadow: 'none',
    background: 'transparent'
  }
});

/** @type {import('@styled').StyledComponent<ContainerProps>} */
export const FooterContainer = Container.extend({
  [breakpoints.up.lg]: {
    paddingLeft: asRem(NAV_WIDTH + GUTTER_WIDTH)
  }
});

export const FooterContent = styled.div({
  padding: `${asRem(12)} 0`,
  fontSize: asRem(14),
  [breakpoints.up.lg]: {
    ...boxShadowBorderTop
  }
});

export const FooterLink = styled.a(ANCHOR);
