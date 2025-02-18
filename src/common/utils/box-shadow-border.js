import { asRem } from './as-rem';

/**
 * @param {number} size 
 * @param {string} colour 
 * @param {string} [inset=''] 
 * @returns {{
 *  boxShadow: string
 * }}
 */
export const boxShadowBorder = (
  size,
  colour,
  inset = ''
) => ({
  boxShadow: inset + `0 0 0 ${asRem(size)} ${colour}`
});

