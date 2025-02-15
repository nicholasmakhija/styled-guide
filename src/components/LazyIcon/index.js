import React, { useEffect, useState } from 'react';

import { SkeletonSvg } from './elements';

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

      throw new Error(message);
    };

    const makePromise = () => fetch(url, {
      method: 'GET',
      mode: 'same-origin',
      headers: new Headers({
        'Accept': MIME_TYPE,
        'Content-Type': MIME_TYPE,
        'X-Content-Type-Options': 'nosniff'
      })
    }).then((response) => {
      if (!response.ok) {
        showError(`${response.status}`);
      }

      const contentType = response.headers.get('content-type');

      if (contentType !== MIME_TYPE) {
        showError(
          `MIME Type "${contentType}" not allowed, expected "${MIME_TYPE}"`
        );
      }

      return response.text();
    }).then((content) => {
      const parser = new DOMParser();
      const svg = /** @type {SVGElement} */(
        parser.parseFromString(content, MIME_TYPE).firstChild
      );

      return {
        viewBox: svg.getAttribute('viewBox'),
        innerHTML: svg.innerHTML
      };
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
  cursor,
  fill,
  hasLoader = true,
  height = 24,
  src,
  stroke,
  width = 24
}) => {
  const [icon, setIcon] = useState(undefined);

  useEffect(() => {
    fetchIcon(src).then(setIcon);
  }, [src]);

  return (
    <SkeletonSvg
      aria-hidden='true'
      role='img'
      tabIndex='-1'
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      hasLoader={hasLoader && !icon}
      {...(icon && {
        viewBox: icon.viewBox
      })}
      {...{
        cursor,
        fill,
        height,
        width,
        stroke
      }}
      {...(icon && {
        dangerouslySetInnerHTML: {
          __html: icon.innerHTML
        }
      })}
    />
  );
};

