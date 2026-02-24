import { asRem } from './as-rem';

export const boxShadowBorder = (
  size: number,
  colour: string
): BoxShadow => ({
  boxShadow: `0 0 0 ${asRem(size)} ${colour}`
});

