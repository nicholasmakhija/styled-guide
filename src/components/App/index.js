import React from 'react';
import { AppRoot } from './elements';

/** 
 * @param {{
 *  active?: string
 *  pages?: {
 *    content: string,
 *    path: string,
 *    title: string,
 *    sections: number
 *  }[];
 * }} props
 * @returns {JSX.Element}
 */
export const App = ({
  active,
  pages = []
}) => {
  return (
    <AppRoot data-current-page={active}>
      {pages.map((page, index) => page.path === active && (
        <div 
          key={`${index}-${page.title}-${page.sections}`}
          dangerouslySetInnerHTML={{
            __html: page.content
          }}
        />
      ))}
    </AppRoot>
  );
}