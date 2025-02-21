import React, { useState, useEffect } from 'react';

import { LazyIcon } from '@components/LazyIcon';
import { isDarkModeSet, setDarkMode } from '@common/utils';
import { HeaderButton } from './elements';

export const HeaderThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeSet());

  const clickHandler = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    setDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <HeaderButton
      aria-label='Toggle dark mode'
      canHover
      isRounded
      onClick={clickHandler}
    >
      {isDarkMode ? (
        <LazyIcon src='/icons/sun.svg' />
      ) : (
        <LazyIcon src='/icons/moon.svg' />
      )}
    </HeaderButton>
  );
};
