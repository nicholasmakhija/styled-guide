import React, { useState, useRef, useEffect } from 'react';

import { Navigation } from '@components/Navigation';
import {
  Container,
  Main,
  Section,
  SectionHeading,
  SectionGroup,
  Title
} from '@ui';

const scrollToElement = (id?: string): void => {
  const target = id && document.querySelector(id);

  if (target) {
    target.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
};

export const Router = ({
  currentPage,
  pages = {}
}: AppProps) => {
  const [route, setRoute] = useState<Route>({
    hash: undefined,
    pathname: currentPage,
    canScroll: false
  });

  const mainRef = useRef<HTMLElement>();

  const updateRoute = (
    hash: string | undefined,
    pathname: string
  ) => {
    setRoute({
      hash,
      pathname,
      canScroll: true
    });
  };

  const clickHandler = (e: Event) => {
    e.preventDefault();

    const anchor = e.currentTarget as HTMLAnchorElement;
    const { pathname } = anchor;
    const hash = anchor.hash;

    history.pushState(hash, '', pathname + hash);
    updateRoute(hash, pathname);
  };

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      const pathName = window.location.pathname;
      const newPath = Object.keys(pages).find((path) =>
        path.includes(pathName)
      );

      if (newPath) {
        updateRoute(e.state as string, pathName);
      }
    });
  }, [pages]);

  useEffect(() => {
    if (route.canScroll) {
      scrollToElement(route.hash);
    }

    const mainElement = mainRef.current;

    if (!mainElement) {
      return;
    }

    mainElement
      .querySelectorAll('pre > code, [data-table] > div')
      .forEach((element) => element.setAttribute('tabindex', '-1'));

    const anchors: NodeListOf<HTMLAnchorElement> =
      mainElement.querySelectorAll('a:not([target])');

    anchors.forEach((a) => a.onclick = clickHandler);

    return () => {
      anchors.forEach((a) => a.removeAttribute('onclick'));
    };
  });

  const { title, sections } = pages[route.pathname];

  return (
    <Container isFluid flex="start">
      <Navigation
        currentPath={route.pathname}
        pageList={Object.entries(pages)}
        onClick={clickHandler}
      />

      <Main>
        <Title>{title}</Title>

        {sections.map(({ title, id, content }, index) => (
          <Section key={`${index}-${title}`}>
            {title && (
              <SectionHeading id={id}>{title}</SectionHeading>
            )}
            <SectionGroup
              dangerouslySetInnerHTML={{
                __html: content
              }}
            />
          </Section>
        ))}
      </Main>
    </Container>
  );
};
