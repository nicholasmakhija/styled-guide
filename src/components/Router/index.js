import React, {
  useState,
  useRef,
  useEffect
} from 'react';

import { Navigation } from '@components/Navigation';
import { Container, Main } from '@common/ui';

/**
 * @param {string} id
 * @returns {void}
 */
const scrollToElement = (id) => {
  // + 60 (Header height)
  // + 24 (NavContent padding-top)
  // + 4 (NavLink padding-top)
  // = 88
  const headerOffsetWithBuffer = 88;
  const target = document.querySelector(id);
  
  if (target) {
    const scrollY = window.scrollY;
    const y = target.getBoundingClientRect().top + scrollY - headerOffsetWithBuffer;
    
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
      setRoute(newRoute)
    });
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

    setRoute({
      hash: newHash,
      pathname: newPathname
    });
  }

  useEffect(() => {
    if (route.hash) {
      scrollToElement(route.hash);
    }

    /** @type {NodeListOf<HTMLAnchorElement>} */
    const anchors = mainRef.current.querySelectorAll('a:not([target])');

    anchors.forEach((anchor) => {
      const { hash, pathname } = anchor;

      anchor.addEventListener('click', clickHandler(pathname, hash));
    });

    return () => {
      anchors.forEach((anchor) => {
        const { hash, pathname } = anchor;
  
        anchor.removeEventListener('click', clickHandler(pathname, hash));
      });
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