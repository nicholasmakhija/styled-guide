import { style } from '@styled';

import type { CSSProperties } from '@styled';

import { asRem } from '@utils/as-rem';
import { boxShadowBorder } from '@utils/box-shadow-border';
import { contentParadigm } from '@utils/content-paradigm';
import { focusVisible } from '@utils/focus-visible';
import { CONTENT_SPACER } from './sizes';
import { CSS_VARS } from './tokens';

export const ANCHOR: CSSProperties = {
  ...focusVisible({
    ...boxShadowBorder(4, CSS_VARS.ACCENT),
    background: CSS_VARS.ACCENT,
    color: CSS_VARS.COLOUR.CONTENT
  }),
  textDecoration: 'underline',
  color: CSS_VARS.ACCENT,
  [style.or(
    style.hover,
    style.focusVisible
  )]: {
    textDecoration: 'none'
  }
};

export const BOX = {
  borderRadius: asRem(4),
  padding: `0 ${asRem(4)}`
};

export const CHILD_PARADIGM = {
  [style.selector('> *')]: contentParadigm(CONTENT_SPACER)
};
