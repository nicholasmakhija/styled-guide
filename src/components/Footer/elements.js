import styled, { style } from '@styled';

import { asRem } from '@common/utils';
import { BORDER_SIZE, CSS_VARS } from '@common/constants';

export const FooterRoot = styled.footer({
  position: 'relative',
  padding: `${asRem(12)} 0`,
  boxShadow: `0 ${asRem(-BORDER_SIZE)} 0 0 ${CSS_VARS.BORDER_SECONDARY}`,
  background: CSS_VARS.BACKGROUND_SECONDARY
});

export const FooterHighlight = styled.span({
  color: CSS_VARS.ACCENT
});
