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
 * @template T
 * @param {T} value 
 * @returns {T | undefined}
 */
const orUndefined = (value) => value || undefined;

/**
 * @param {string} id
 * @returns {void}
 */
const scrollToElement = (id) => {
  const target = document.querySelector(id);
  const y = target
    ? target.getBoundingClientRect().top + window.scrollY - offset
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
   * @param {Event} e 
   * @returns {void}
   */
  const clickHandler = (e) => {
    e.preventDefault();

    const anchor = /** @type {HTMLAnchorElement} */(e.currentTarget);
    const { pathname } = anchor;
    const hash = orUndefined(anchor.hash);

    history.pushState(hash, '', pathname);

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
      );

      if (newPath) {
        setRoute({
          hash: orUndefined(e.state),
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
  
    anchors.forEach((a) => a.onclick = clickHandler);
  
    return () => {
      anchors.forEach((a) => a.removeAttribute('onclick'));
    };
  }, [route]);
  
  return (
    <Container isFluid flex="start">
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
