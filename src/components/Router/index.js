import React, {
  useState,
  useEffect
} from 'react';

import { Navigation } from '@components/Navigation';
import { Container, Main } from '@common/ui';

/**
 * @param {string} id
 * @returns {void}
 */
const scrollToElement = (id) => {
  const headerOffsetWithBuffer = 72; // FIXME: get actual header height
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

  /**
   * @param {Route} newRoute 
   * @returns {void}
   */
  const changeHandler = (newRoute) => {
    setTimeout(() => {
      setRoute(newRoute)
    });
  };

  useEffect(() => {
    if (route.hash) {
      scrollToElement(route.hash);
    }
  }, [route]);
  
  return (
    <Container isFluid flex='start'>
      <Navigation
        currentPage={route.pathname}
        pages={pages}
        onChange={changeHandler}
      />

      {pages.map(({
        content,
        path,
        title
      }, index) => path === route.pathname && (
        <Main 
          key={`${index}-${title}`}
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      ))}
    </Container>
  );
};