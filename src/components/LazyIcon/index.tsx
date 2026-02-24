import React, { useEffect, useState } from 'react';

import { getResource, throwError } from '@utils/index';
import { Icon } from './elements';

const MIME_TYPE = 'image/svg+xml';

const createIconCache = () => {
  const cache = new Map();
  const getIcon = (url: string): Promise<IconState> => {
    const showError = (message: string): void => {
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

        if (svg) {
          return {
            viewBox: svg.getAttribute('viewBox'),
            innerHTML: svg.innerHTML
          };
        }

        showError('Error parsing input');
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

export const LazyIcon = ({
  className = '',
  height = 24,
  src,
  width = 24
}: LazyIconProps) => {
  const [icon, setIcon] = useState<IconState | undefined>(undefined);

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

