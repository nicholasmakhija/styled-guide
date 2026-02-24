import React from 'react';

import { LazyIcon } from '@components/LazyIcon';
import { Container } from '@ui/Container';
import { HeaderThemeSwitcher } from './HeaderThemeSwitcher';
import { HeaderHamburger } from './HeaderHamburger';
import { Logo } from './Logo';
import {
  HeaderRoot,
  HeaderSticky,
  HeaderBrand,
  HeaderActions,
  HeaderLink
} from './elements';

export const Header = ({
  isDark
}: IsDarkProp) => (
  <HeaderRoot>
    <HeaderSticky>
      <Container flex="space-between">
        <HeaderBrand>
          <Logo />
        </HeaderBrand>

        <HeaderActions>
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
        </HeaderActions>
      </Container>
    </HeaderSticky>
  </HeaderRoot>
);
