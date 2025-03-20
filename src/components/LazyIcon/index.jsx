import React, { useEffect, useState } from 'react';

import { getResource } from '@common/utils';
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
    const makePromise = () => getResource(url, MIME_TYPE)
      .then((response) => response.text())
      .then((content) => {
        const parser = new DOMParser();
        const svg = /** @type {SVGElement} */(
          parser.parseFromString(content, MIME_TYPE).firstChild
        );

        return {
          viewBox: svg.getAttribute('viewBox'),
          innerHTML: svg.innerHTML
        };
      })
      .catch((error) => {
        cache.delete(url);

        throw new Error(error);
      });

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
      aria-hidden='true'
      role='img'
      tabIndex='-1'
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...(icon && {
        viewBox: icon.viewBox
      })}
      {...{
        width,
        height
      }}
      {...(icon && {
        dangerouslySetInnerHTML: {
          __html: icon.innerHTML
        }
      })}
    />
  );
};

