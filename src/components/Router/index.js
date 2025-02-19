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
    setRoute(newRoute);
  };
  
  /**
   * @param {string} newPathname 
   * @param {string} newHash 
   * @returns {(e: Event) => void}
   */
  const clickHandler = (newPathname, newHash) => (e) => {
    e.preventDefault();

    if (newPathname !== route.pathname) {
      history.pushState({}, '', newPathname);

      setRoute({
        hash: newHash,
        pathname: newPathname
      });
    }

    if (!newHash) {
      window.scrollTo(0, 0);
    }
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
    const popstateHandler = () => {
      const pathName = window.location.pathname;
      const page = pages.find(({ path }) => 
        path.includes(pathName)
        ||
        `${path}/`.includes(pathName)
      );

      if (page) {
        setRoute({
          hash: undefined,
          pathname: page.path
        });
      }
    };

    window.addEventListener('popstate', popstateHandler);
  // FIXME: ??
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FIXME: prevent this effect from firing twice in `StrictMode`
  useEffect(() => {
    if (route.hash) {
      scrollToElement(route.hash);
    }

    const mainElement = mainRef.current;

    /** @type {NodeListOf<HTMLElement>} */
    const overflowXElements = mainElement.querySelectorAll('pre > code, [data-table] > div');

    overflowXElements.forEach((element) => element.setAttribute('tabindex', '-1'));

    /** @type {NodeListOf<HTMLAnchorElement>} */
    const anchors = mainElement.querySelectorAll('a:not([target])');

    toggleEventListener(anchors, 'addEventListener');

    return () => {
      toggleEventListener(anchors, 'removeEventListener');
    };
  // FIXME: ??
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, mainRef]);
  
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
