import styled from '@styled';

import { asRem } from '@utils/as-rem';
import { ICON_SIZE } from '@constants/sizes';

export const GenericIconSize = styled.generic({
  margin: 0,
  width: asRem(ICON_SIZE),
  height: asRem(ICON_SIZE)
});

export const GenericButtonClears = styled.generic({
  border: 'none',
  backgroundColor: 'transparent',
  appearance: 'none',
  cursor: 'pointer'
});
