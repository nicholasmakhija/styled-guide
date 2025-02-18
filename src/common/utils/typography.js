import { asRem } from './as-rem';

/**
 * @param {number} size 
 * @param {number} leading 
 * @returns {Typography}
 */
export const typography = (size, leading) => ({
  fontSize: asRem(size),
  lineHeight: asRem(leading)
});