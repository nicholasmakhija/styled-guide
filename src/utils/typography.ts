import { asRem } from './as-rem';
import {
  CONTENT_SPACER,
  HEADER_HEIGHT,
  NAV_LINK_PADDING
} from '@constants';

import type { CSSProperties } from '@styled';

export const typography = (
  size: number,
  leading: number
): Typography => ({
  fontSize: asRem(size),
  lineHeight: asRem(leading)
});

const offset = HEADER_HEIGHT + CONTENT_SPACER + NAV_LINK_PADDING;

export const headingWithScrollMargin = (
  size: number,
  leading: number
): CSSProperties => ({
  ...typography(size, leading),
  scrollMarginTop: asRem(offset)
});
