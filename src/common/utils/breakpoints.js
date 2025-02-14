import { mq } from '@styled';
import { BREAKPOINTS } from '@common/constants';

/**
 * @typedef {{
 *  [K in keyof typeof BREAKPOINTS as Lowercase<string & K>]: string;
 * }} Breakpoints
 */

/**
 * Helper for writing media queries
 *
 * @param {('from'|'to')} range
 * @param {number} delta
 * @returns {Breakpoints}
 */
const createMediaFeature = (range, delta) =>
  Object.keys(BREAKPOINTS).reduce((collected, BP) => ({
    ...collected,
    [BP.toLowerCase()]:
      mq().screen()[range](BREAKPOINTS[BP] - delta).toString()
  }), /** @type {Breakpoints} */({}));

export const breakpoints = {
  up: createMediaFeature('from', 0),
  down: createMediaFeature('to', 1)
};
