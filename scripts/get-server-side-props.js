import { readFileSync } from 'fs';
import minifier from 'html-minifier';

import { getTemplateData } from './get-template-data';

/**
 * @param {string} str 
 * @param {RegExp} regex 
 * @returns {{
 *  list: (RegExpMatchArray|string)[],
 *  matched: string
 * }}
 */
const execData = (str, regex) => {
  const matchedArray = str.match(regex);
  const cleaned = matchedArray || [];

  return {
    list: cleaned,
    matched: cleaned.length ? cleaned[1] : ''
  };
};

/**
 * @param {string} heading 
 * @returns {Section}
 */
const getSectionData = (heading) => ({
  id: execData(heading, /id="(.*?)"/).matched,
  text: execData(heading, />(.*?)<\//).matched
});

/**
 * @returns {Record<string, Page>}
 */
export const getServerSideProps = () => getTemplateData()
  .map(({ file, path }) => {
    const raw = readFileSync(file, 'utf8');
    const order = +execData(raw, /<!--order:([^$]+?)-->/).matched;
    
    const title = execData(raw, /<h1>([^$]+?)<\/h1>/).matched;
    
    // for all h2 and h3 use /<h[2-3] id="(.*?)">([^$]+?)<\/h[2-3]>/g
    const headings = execData(raw, /<h2 id="(.*?)">([^$]+?)<\/h2>/g).list;
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
