import { style } from '@styled';

import { asRem } from '@utils/as-rem';
import { boxShadowBorder } from '@utils/box-shadow-border';
import { contentParadigm } from '@utils/content-paradigm';
import { focusVisible } from '@utils/focus-visible';
import { CONTENT_SPACER } from './sizes';
import { CSS_VARS } from './tokens';

export const BACKGROUND_TRANSPARENT = {
  background: 'transparent'
};

type Zero = 0;

export const BORDER_ZERO = {
  border: 0 as Zero
};

export const DISPLAY_BLOCK = {
  display: 'block'
};

export const DISPLAY_INLINE_BLOCK = {
  display: 'inline-block'
};

export const LEFT_ZERO = {
  left: 0 as Zero
};

export const MARGIN_ZERO = {
  margin: 0 as Zero
};

export const OVERFLOW_HIDDEN = {
  overflow: 'hidden'
};

type Absolute = 'absolute';

export const POSITION_ABSOLUTE = {
  position: 'absolute' as Absolute
};

type Relative = 'relative';

export const POSITION_RELATIVE = {
  position: 'relative' as Relative
};

export const TEXT_DECORATION_NONE = {
  textDecoration: 'none'
};

export const TOP_ZERO = {
  top: 0 as Zero
};

export const TRANSITION_CUBIC_BEZIER = {
  transition: '0.3s cubic-bezier(0.2, 0, 0, 1)'
};

export const VERTICAL_ALIGN_TOP = {
  verticalAlign: 'top'
};

type Hidden = 'hidden';

export const VISIBILITY_HIDDEN = {
  visibility: 'hidden' as Hidden
};

export const VISIBILITY_VISIBLE = {
  visibility: 'visible'
};

// COMPOSED STYLES BELOW:

export const ANCHOR = {
  color: CSS_VARS.ACCENT,
  textDecoration: 'underline',
  [style.or(
    style.hover,
    style.focusVisible
  )]: TEXT_DECORATION_NONE,
  ...focusVisible({
    ...boxShadowBorder(4, CSS_VARS.ACCENT),
    background: CSS_VARS.ACCENT,
    color: CSS_VARS.COLOUR.CONTENT
  })
};

export const BOX = {
  padding: `0 ${asRem(4)}`,
  borderRadius: asRem(4)
};

export const CHILD_PARADIGM = {
  [style.selector('> *')]: contentParadigm(CONTENT_SPACER)
};
