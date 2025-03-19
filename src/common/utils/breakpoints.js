import { mq } from '@styled';
import { BREAKPOINTS } from '@common/constants';

/**
 * @typedef {{
 *  [K in keyof typeof BREAKPOINTS as Lowercase<string & K>]: string;
 * }} Breakpoints
 */

/**
 * @template T
 * @param {T} map 
 */
const createBreakpoints = (map) => {
  /**
   * @param {('from'|'to')} range 
   * @param {number} delta 
   * @returns 
   */
  const transform = (
    range,
    delta
  ) => Object.entries(map).reduce((assigned, [bp, vw]) => ({
    ...assigned,
    [bp.toLowerCase()]: mq().screen()[range](vw - delta).toString()
  }), /** @type {{ [K in keyof T as Lowercase<string & K>]: string }} */({}));

  return {
    up: transform('from', 0),
    down: transform('to', 1)
  };
};

export const breakpoints = createBreakpoints(BREAKPOINTS);

