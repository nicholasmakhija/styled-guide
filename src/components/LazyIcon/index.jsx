import React, { useEffect, useState } from 'react';

import { getResource, throwError } from '@common/utils';
import { Icon } from './elements';

const MIME_TYPE = 'image/svg+xml';

/**
 * @returns {(url: string) => Promise<IconState>}
 */
const createIconCache = () => {
  const cache = new Map();

  /**
   * @param {string} url
   * @returns {Promise<IconState>}
   */
  const getIcon = (url) => {
    /**
     * @param {string} message
     * @returns {void}
     */
    const showError = (message) => {
      cache.delete(url);

      throwError(message);
    };

    const makePromise = () => getResource(url, MIME_TYPE)
      .then((response) => response.text())
      .then((content) => {
        const parser = new DOMParser();
        const svg = parser
          .parseFromString(content, MIME_TYPE)
          .querySelector('svg');

        if (!svg) {
          showError('Error parsing input');
        }

        return {
          viewBox: svg.getAttribute('viewBox'),
          innerHTML: svg.innerHTML
        };
      })
      .catch(showError);

    if (!cache.has(url)) {
      cache.set(url, makePromise());
    }

    return cache.get(url);
  };

  return getIcon;
};

const fetchIcon = createIconCache();

/** 
 * @param {LazyIconProps} props
 * @returns {JSX.Element}
 */
export const LazyIcon = ({
  className = '',
  height = 24,
  src,
  width = 24
}) => {
  const [icon, setIcon] = useState(undefined);

  useEffect(() => {
    fetchIcon(src).then(setIcon);
  }, [src]);

  return (
    <Icon
      aria-hidden="true"
      role="img"
      tabIndex="-1"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...{
        width,
        height
      }}
      {...(icon && {
        viewBox: icon.viewBox,
        dangerouslySetInnerHTML: {
          __html: icon.innerHTML
        }
      })}
    />
  );
};

