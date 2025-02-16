import React from 'react';

import {
  FooterRoot,
  FooterContainer,
  FooterContent,
  FooterHighlight
} from './elements';

export const Footer = () => (
  <FooterRoot>
    <FooterContainer>
      <FooterContent>
        Built using <FooterHighlight>Styled</FooterHighlight>.
      </FooterContent>
    </FooterContainer>
  </FooterRoot>
);