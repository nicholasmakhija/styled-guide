import React from 'react';

import { LazyIcon } from '@components/LazyIcon';
import { Logo } from '@components/Logo';
import { Container } from '@ui/Container';
import { HeaderThemeSwitcher } from './HeaderThemeSwitcher';
import { HeaderHamburger } from './HeaderHamburger';
import {
  HeaderRoot,
  HeaderSticky,
  HeaderSymbol,
  HeaderPane,
  HeaderLink
} from './elements';

export const Header = ({
  isDark
}: IsDarkProp) => (
  <HeaderRoot>
    <HeaderSticky>
      <Container flex="space-between">
        <HeaderSymbol>
          <Logo />
        </HeaderSymbol>

        <HeaderPane>
          <HeaderThemeSwitcher isDark={isDark} />

          <HeaderLink
            aria-label="GitHub"
            href="https://github.com/nicholasmakhija/styled-js"
            target="_blank"
            rel="noopener noreferrer"
            canHover
            isRounded
          >
            <LazyIcon src="/assets/icons/github.svg" />
          </HeaderLink>

          <HeaderHamburger />
        </HeaderPane>
      </Container>
    </HeaderSticky>
  </HeaderRoot>
);
