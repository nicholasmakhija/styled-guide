import { mq } from '@styled';
import * as BREAKPOINTS from '@constants/breakpoints';

/**
 * Helper for commonly used range based media queries, ie: width
 *
 * @example
 * createMediaQueries({
 *  xs: 0,
 *  sm: 576,
 *  md: 768,
 *  lg: 992,
 *  xl: 1200
 * });
 *
 * @example
 * createMediaQueries({
 *  SMALL: 0,
 *  MEDIUM: 640,
 *  LARGE: 1024
 * });
 */
export const createMediaQueries = <
  T extends Record<string, number>
>(breakpoints: T) => {
  const transform = (
    range: 'from' | 'to',
    delta: number
  ) => Object.entries(breakpoints).reduce((mapped, [bp, vw]) => ({
    ...mapped,
    // eslint-disable-next-line @stylistic/newline-per-chained-call
    [bp.toLowerCase()]: mq().screen()[range](vw - delta).toString()
  }), {} as {
    [K in keyof T as Lowercase<string & K>]: string;
  });

  return {
    up: transform('from', 0),
    down: transform('to', 1)
  };
};

export const breakpoints = createMediaQueries(BREAKPOINTS);
