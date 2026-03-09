import { asRem } from '@utils/as-rem';

const typography = (
  size: number,
  leading: number
): Typography => ({
  fontSize: asRem(size),
  lineHeight: asRem(leading)
});

const fontSize = (size: string): Pick<Typography, 'fontSize'> => ({
  fontSize: size
});

export const H1 = typography(32, 40);
export const H2 = typography(24, 32);
export const H3 = typography(18, 32);
export const CODE = typography(14, 20);
export const SMALL = fontSize(CODE.fontSize);
export const TINY = fontSize(asRem(12));
