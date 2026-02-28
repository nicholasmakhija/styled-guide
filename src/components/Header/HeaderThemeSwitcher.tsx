import React, { useState, useEffect } from 'react';

import { LazyIcon } from '@components/LazyIcon';
import { CLASS_NAME_IS_DARK_MODE, DOCS_IS_DARK_MODE } from '@constants';
import { HeaderButton } from './elements';

export const HeaderThemeSwitcher = ({
  isDark
}: IsDarkProp) => {
  const [isDarkMode, setIsDarkMode] = useState(isDark);

  const clickHandler = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    const html = document.documentElement;

    window.localStorage.setItem(DOCS_IS_DARK_MODE, `${isDarkMode}`);

    if (isDarkMode) {
      html.classList.add(CLASS_NAME_IS_DARK_MODE);
    } else {
      html.classList.remove(CLASS_NAME_IS_DARK_MODE);
    }
  }, [isDarkMode]);

  const icon = isDarkMode ? 'sun' : 'moon';

  return (
    <HeaderButton
      aria-label="Toggle dark mode"
      canHover
      isRounded
      onClick={clickHandler}
    >
      <LazyIcon src={`/assets/icons/${icon}.svg`} />
    </HeaderButton>
  );
};
