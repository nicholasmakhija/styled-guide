import { readFileSync } from 'node:fs';
import minifier from 'html-minifier';
import { manifest } from '../src/content/manifest';

const getHTML = (file: string) => {
  const raw = readFileSync(`src/content/${file}`, 'utf8');
  /* eslint-disable @typescript-eslint/naming-convention */
  const htmlContent = minifier.minify(raw, {
    collapseWhitespace: true,
    removeComments: true
  });
  /* eslint-enable @typescript-eslint/naming-convention */

  return htmlContent;
};

export const getPages = () => Object
  .entries(manifest)
  .reduce((acc, [path, { title, sections }]) => ({
    ...acc,
    [path]: {
      title,
      sections: sections.map(({ title, id, content }) => ({
        title,
        id,
        content: getHTML(content)
      }))
    }
  }), {});

