/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;
/* eslint-enable @typescript-eslint/no-redundant-type-constituents */
