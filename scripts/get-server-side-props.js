import { readFileSync } from 'fs';
import minifier from 'html-minifier';

import { templateData } from './get-template-data';

/**
 * @param {string} str 
 * @param {RegExp} regex 
 * @returns {string}
 */
const getMatched = (str, regex) => {
  const matchedArray = str.match(regex);
  const cleaned = matchedArray || [];

  return cleaned.length ? cleaned[1] : '';
};

/**
 * @param {string} heading 
 * @returns {Section}
 */
const getSectionData = (heading) => ({
  id: getMatched(heading, /id="(.*?)"/),
  text: getMatched(heading, />(.*?)<\//)
});

/**
 * @returns {Record<string, Page>}
 */
export const getServerSideProps = () => templateData
  .map(({ file, path }) => {
    const raw = readFileSync(file, 'utf8');
    const order = +getMatched(raw, /<!--order:([^$]+?)-->/);
    
    const title = getMatched(raw, /<h1>([^$]+?)<\/h1>/);
    
    // for all h2 and h3 use /<h[2-3] id="(.*?)">([^$]+?)<\/h[2-3]>/g
    const headings = raw.match(/<h2 id="(.*?)">([^$]+?)<\/h2>/g) || [];
    const sections = headings.map(getSectionData);
  
    const content = minifier.minify(raw, {
      collapseWhitespace: true,
      removeComments: true
    });
  
    return {
      order: order,
      page: {
        [path]: {
          content,
          path,
          title,
          sections
        }
      }
    };
  })
  .sort((a, b) => a.order - b.order)
  .reduce((acc, { page }) => ({ ...acc, ...page }), {});
