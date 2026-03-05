import { style } from '@styled';

import type { CSSProperties } from '@styled';

export const focusVisible = (styles?: CSSProperties): CSSProperties => ({
  [style.focusVisible]: {
    ...styles,
    outline: 0
  }
});
