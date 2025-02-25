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
  let y = 0;

  if (id) {
    const target = document.querySelector(id);

    if (target) {
      y = target.getBoundingClientRect().top + window.scrollY - offset;
    }
  }

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
   * @param {string} pathname 
   * @returns {(e: Event) => void}
   */
  const clickHandler = (pathname) => (e) => {
    e.preventDefault();

    const {
      hash
    } = /** @type {HTMLAnchorElement} */(e.currentTarget);

    if (pathname !== route.pathname) {
      history.pushState({
        hash
      }, '', pathname);
    }

    setRoute({
      hash,
      pathname
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      const pathName = window.location.pathname;
      const newPath = Object.keys(pages).find((path) => 
        path.includes(pathName)
        ||
        `${path}/`.includes(pathName)
      );

      if (newPath) {
        setRoute({
          hash: (e.state || {}).hash,
          pathname: newPath
        });
      }
    });
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
  
    anchors.forEach(
      (a) => a.addEventListener('click', clickHandler(a.pathname))
    );
  
    return () => {
      anchors.forEach(
        (a) => a.removeEventListener('click', clickHandler(a.pathname))
      );
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
  
  return (
    <Container isFluid flex='start'>
      <Navigation
        currentPath={route.pathname}
        pageList={Object.values(pages)}
        onClick={clickHandler}
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
