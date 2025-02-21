import React, { useState, useEffect } from 'react';

import { LazyIcon } from '@components/LazyIcon';
import {
  CLASS_NAME_IS_DARK_MODE,
  KEY_IS_DARK_MODE
} from '@common/constants';
import { HeaderButton } from './elements';

/**
 * @param {boolean} isDark 
 * @returns {void}
 */
export const setDarkMode = (isDark) => {
  const html = document.documentElement;

  window.localStorage.setItem(KEY_IS_DARK_MODE, `${isDark}`);

  if (isDark) {
    html.classList.add(CLASS_NAME_IS_DARK_MODE);
  } else {
    html.classList.remove(CLASS_NAME_IS_DARK_MODE);
  }
};

/** 
 * @param {IsDarkProp} props
 * @returns {JSX.Element}
 */
export const HeaderThemeSwitcher = ({
  isDark
}) => {
  const [isDarkMode, setIsDarkMode] = useState(isDark);

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
