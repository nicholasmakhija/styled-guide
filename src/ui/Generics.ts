import styled, { style } from '@styled';

import { asRem } from '@utils/as-rem';
import { CONTENT_SPACER, ICON_SIZE } from '@constants/sizes';

export const GenericIconSize = styled.generic({
  margin: 0,
  width: asRem(ICON_SIZE),
  height: asRem(ICON_SIZE)
});

export const GenericButtonClears = styled.generic({
  border: 0,
  appearance: 'none',
  background: 'transparent',
  cursor: 'pointer'
});

export const GenericParadigm = styled.generic({
  [style.selector('> *')]: {
    margin: `0 0 ${asRem(CONTENT_SPACER)}`,
    [style.lastChild]: {
      marginBottom: 0
    }
  }
});
