import type { CSSProperties } from '@n3e/styled';

export const cssOrder: CSSProperties = {
  // SPREADS

  // POSITION & LAYOUT:
  position: undefined,
  zIndex: undefined,
  top: undefined,
  right: undefined,
  bottom: undefined,
  left: undefined,
  float: undefined,
  clear: undefined,
  // flexbox ordered alphabetically
  tableLayout: undefined,

  // DISPLAY & VISIBILITY:
  display: undefined,
  verticalAlign: undefined,
  opacity: undefined,
  transform: undefined,
  visibility: undefined,
  WebkitTapHighlightColor: undefined,

  // CLIPPING:
  overflow: undefined,
  // clip ordered alphabetically

  // ANIMATION:
  animation: undefined,
  transition: undefined,

  // BOX MODEL: (from outside in)
  margin: undefined,
  boxShadow: undefined,
  border: undefined,
  borderRadius: undefined,
  width: undefined,
  height: undefined,
  padding: undefined,

  // BACKGROUND:
  appearance: undefined,
  background: undefined,
  backdropFilter: undefined,
  cursor: undefined,
  pointerEvents: undefined,
  stroke: undefined,
  fill: undefined,

  // TYPOGRAPHY:
  fontFamily: undefined,
  fontSize: undefined,
  lineHeight: undefined,
  fontWeight: undefined,
  fontStyle: undefined,
  textAlign: undefined,
  textDecoration: undefined,
  textSizeAdjust: undefined,
  textTransform: undefined,
  whiteSpace: undefined,
  wordBreak: undefined,
  wordSpacing: undefined,
  color: undefined,
  listStyle: undefined,

  // PSEUDO ELEMENTS:
  ':hover': undefined,
  ':focus': undefined,
  ':focusActive': undefined, // preferred
  ':active': undefined,
  ':before': {
    content: undefined
    // cssOrder
  },
  ':after': {
    content: undefined
    // cssOrder
  },
  ':first-child': undefined,
  ':last-child': undefined,
  'not(...)': undefined,

  // AT-RULES:
  '@media ...': {}

  // PROP BASE STYLES:
};
