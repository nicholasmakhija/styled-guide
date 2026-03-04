import { style } from '@styled';

import { boxShadowBorder } from '@utils/box-shadow-border';
import { contentParadigm } from '@utils/content-paradigm';
import { CONTENT_SPACER } from './sizes';
import { CSS_VARS } from './tokens';

export const CUBIC_BEZIER_TRANSITION = {
  transition: '0.3s cubic-bezier(0.2, 0, 0, 1)'
};

export const ANCHOR = {
  color: CSS_VARS.ACCENT,
  textDecoration: 'underline',
  [style.or(
    style.hover,
    style.focus
  )]: {
    textDecoration: 'none'
  },
  [style.focus]: {
    ...boxShadowBorder(4, CSS_VARS.ACCENT),
    outline: 0,
    background: CSS_VARS.ACCENT,
    color: CSS_VARS.COLOUR.CONTENT
  }
};

export const CHILD_PARADIGM = {
  [style.selector('> *')]: contentParadigm(CONTENT_SPACER)
};
