import React from 'react';
import { AppRoot } from './elements';

/** 
 * @param {{
 *  innerHTML?: unknown;
 * }} props
 * @returns {JSX.Element}
 */
export const App = ({
  innerHTML
}) => {
  return (
    <AppRoot dangerouslySetInnerHTML={{
      __html: innerHTML
    }} />
  );
}