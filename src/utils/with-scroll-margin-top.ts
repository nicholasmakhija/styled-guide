import type { CSSProperties } from '@n3e/styled';

import { asRem } from './as-rem';
import {
  CONTENT_SPACER,
  HEADER_HEIGHT,
  NAV_LINK_PADDING
} from '@constants/sizes';

const offsetY = HEADER_HEIGHT + CONTENT_SPACER + NAV_LINK_PADDING;

export const withScrollMarginTop = (styles: CSSProperties): CSSProperties => ({
  ...styles,
  scrollMarginTop: asRem(offsetY)
});
