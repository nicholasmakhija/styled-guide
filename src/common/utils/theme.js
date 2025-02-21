import { isBrowser } from './is';

export const CLASS_NAME_IS_DARK_MODE = 'isDarkMode';
export const KEY_IS_DARK_MODE = 'styled.docs.isDarkMode';

/**
 * @returns {boolean}
 */
export const isDarkModeSet = () => isBrowser
  ? window.localStorage.getItem(KEY_IS_DARK_MODE) === 'true'
  : false;

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
