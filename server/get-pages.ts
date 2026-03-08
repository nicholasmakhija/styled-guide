import { readFileSync } from 'node:fs';
import minifier from 'html-minifier';

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

export const getPages = () => {
  const jsonString = readFile('manifest.html')
    .replace('<script>const manifest = ', '')
    .replace(';</script>', '');

  const manifest = JSON.parse(jsonString) as PageManifest;

  return Object
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
};
