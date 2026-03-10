import { asRem } from '@utils/as-rem';

import type { CSSProperties } from '@n3e/styled';

const typography = (
  size: number,
  leading: number
): CSSProperties => ({
  fontSize: asRem(size),
  lineHeight: asRem(leading)
});

export const H1 = typography(32, 40);
export const H2 = typography(24, 32);
export const H3 = typography(18, 32);
export const CODE = typography(14, 20);
export const SMALL = typography(14, 24);
export const TINY = typography(12, 24);
