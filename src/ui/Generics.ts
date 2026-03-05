import styled from '@styled';

import { asRem } from '@utils/as-rem';
import {
  BACKGROUND_TRANSPARENT,
  BORDER_ZERO,
  MARGIN_ZERO
} from '@constants/styles';
import { ICON_SIZE } from '@constants/sizes';

export const GenericIconSize = styled.generic({
  ...MARGIN_ZERO,
  width: asRem(ICON_SIZE),
  height: asRem(ICON_SIZE)
});

export const GenericButtonClears = styled.generic({
  ...BACKGROUND_TRANSPARENT,
  ...BORDER_ZERO,
  appearance: 'none',
  cursor: 'pointer'
});
