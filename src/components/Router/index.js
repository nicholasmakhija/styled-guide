import React, { useState, useRef, useEffect } from 'react';

import { Navigation } from '@components/Navigation';
import { Container, Main } from '@common/ui';
import {
  CONTENT_SPACER,
  HEADER_HEIGHT,
  NAV_LINK_PADDING
} from '@common/constants';

const offset = HEADER_HEIGHT + CONTENT_SPACER + NAV_LINK_PADDING;

/**
 * @param {string} id
 * @returns {void}
 */
const scrollToElement = (id) => {
  const y = id
    ? document
      .querySelector(id)
      .getBoundingClientRect()
      .top + window.scrollY - offset
    : 0;

  window.scrollTo(0, y);
};

/** 
 * @param {AppProps} props
 * @returns {JSX.Element}
 */
export const Router = ({
  currentPage,
  pages = {}
}) => {
  const [route, setRoute] = useState({
    hash: undefined,
    pathname: currentPage
  });

  /** @type {{ current: HTMLElement }} */
  const mainRef = useRef();

  /**
   * @param {Route} newRoute 
   * @returns {void}
   */
  const changeHandler = (newRoute) => {
    setRoute(newRoute);
  };

  useEffect(() => {
    const popstateHandler = () => {
      const pathName = window.location.pathname;
      const newPath = Object.keys(pages).find((path) => 
        path.includes(pathName)
        ||
        `${path}/`.includes(pathName)
      );

      if (newPath) {
        setRoute({
          hash: undefined,
          pathname: newPath
        });
      }
    };

    window.addEventListener('popstate', popstateHandler);
  }, [pages]);

  useEffect(() => {
    scrollToElement(route.hash);

    const mainElement = mainRef.current;

    if (!mainElement) {
      return;
    }

    mainElement
      .querySelectorAll('pre > code, [data-table] > div')
      .forEach((element) => element.setAttribute('tabindex', '-1'));

    /** @type {NodeListOf<HTMLAnchorElement>} */
    const anchors = mainElement.querySelectorAll('a:not([target])');

    /**
     * @param {('addEventListener' | 'removeEventListener')} method 
     */
    const toggleEventListener = (method) => {
      anchors.forEach((anchor) => {
        const { hash, pathname } = anchor;

        anchor[method]('click', (e) => {
          e.preventDefault();

          if (pathname !== route.pathname) {
            history.pushState({}, '', pathname);

            setRoute({
              hash,
              pathname
            });
          }
        });
      });
    };

    toggleEventListener('addEventListener');

    return () => {
      toggleEventListener('removeEventListener');
    };
  }, [route]);
  
  return (
    <Container isFluid flex='start'>
      <Navigation
        currentPath={route.pathname}
        pageList={Object.values(pages)}
        onChange={changeHandler}
      />

      <Main
        ref={mainRef}
        dangerouslySetInnerHTML={{
          __html: pages[route.pathname].content
        }}
      />
    </Container>
  );
};
