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
  const target = document.querySelector(id);
  
  if (target) {
    const scrollY = window.scrollY;
    const y = target.getBoundingClientRect().top + scrollY - offset;
    
    window.scrollTo(0, y);
  }
};


/** 
 * @param {AppProps} props
 * @returns {JSX.Element}
 */
export const Router = ({
  currentPage,
  pages = []
}) => {
  const [route, setRoute] = useState({
    hash: undefined,
    pathname: currentPage
  });

  /** @type {{ current: HTMLElement }} */
  const mainRef = useRef();

  const content = pages.find(({ path }) => path === route.pathname).content;

  /**
   * @param {Route} newRoute 
   * @returns {void}
   */
  const changeHandler = (newRoute) => {
    setTimeout(() => {
      setRoute(newRoute);
    }, 0);
  };

  
  /**
   * @param {string} newPathname 
   * @param {string} newHash 
   * @returns {(e: Event) => void}
   */
  const clickHandler = (newPathname, newHash) => (e) => {
    e.preventDefault();

    if (newPathname !== currentPage) {
      history.pushState({}, '', newPathname);
    }

    if (!newHash) {
      window.scrollTo(0, 0);
    }

    setRoute({
      hash: newHash,
      pathname: newPathname
    });
  };

  /**
   * @param {NodeListOf<HTMLAnchorElement>} nodeList 
   * @param {('addEventListener' | 'removeEventListener')} method 
   */
  const toggleEventListener = (nodeList, method) => {
    nodeList.forEach((anchor) => {
      const { hash, pathname } = anchor;

      anchor[method]('click', clickHandler(pathname, hash));
    });
  };

  useEffect(() => {
    if (route.hash) {
      scrollToElement(route.hash);
    }

    /** @type {NodeListOf<HTMLAnchorElement>} */
    const anchors = mainRef.current.querySelectorAll('a:not([target])');

    toggleEventListener(anchors, 'addEventListener');

    return () => {
      toggleEventListener(anchors, 'removeEventListener');
    };
  }, [route]);
  
  return (
    <Container isFluid flex='start'>
      <Navigation
        currentPath={route.pathname}
        pages={pages}
        onChange={changeHandler}
      />

      <Main
        ref={mainRef}
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    </Container>
  );
};