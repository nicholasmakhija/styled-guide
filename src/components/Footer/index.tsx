import React from 'react';

import {
  FooterRoot,
  FooterContainer,
  FooterContent,
  FooterLink
} from './elements';

export const Footer = () => (
  <FooterRoot>
    <FooterContainer>
      <FooterContent>
        Built using <FooterLink
          href="https://www.npmjs.com/package/@n3e/styled"
          target="_blank"
          rel="noopener noreferrer"
        >Styled</FooterLink>.
      </FooterContent>
    </FooterContainer>
  </FooterRoot>
);
