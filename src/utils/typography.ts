import { asRem } from './as-rem';

export const typography = (
  size: number,
  leading: number
): Typography => ({
  fontSize: asRem(size),
  lineHeight: asRem(leading)
});
