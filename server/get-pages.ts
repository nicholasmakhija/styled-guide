import { readFileSync } from 'node:fs';
import minifier from 'html-minifier';

import { pipe } from './pipe';

const readFile = (file: string) =>
  readFileSync(`src/content/${file}`, 'utf8');

const getHTML = (file: string) => {
  const raw = readFile(file);
  /* eslint-disable @typescript-eslint/naming-convention */
  const htmlContent = minifier.minify(raw, {
    collapseWhitespace: true,
    removeComments: true
  });
  /* eslint-enable @typescript-eslint/naming-convention */

  return htmlContent;
};

type Manifest = {
  [key: string]: {
    title: string;
    sections: {
      title: string;
      id: string;
      content: string;
    }[];
  };
};

const createContentTree = (data: Manifest) => Object
  .entries(data)
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

export const compose = pipe<string>()
  .then(readFile)
  .then((file) => file
    .replace('<script>const manifest = ', '')
    .replace(';</script>', '')
  )
  .then(JSON.parse)
  .then(createContentTree);

export const getPages = () => compose('manifest.html');

