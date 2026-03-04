import { style } from '@styled';

import { asRem } from '@utils/as-rem';

import type { CSSProperties } from '@styled';

export const contentParadigm = (spacer: number): CSSProperties => ({
  margin: `0 0 ${asRem(spacer)}`,
  [style.lastChild]: {
    marginBottom: 0
  }
});
