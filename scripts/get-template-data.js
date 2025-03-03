import { sync } from 'glob';
import { dirname } from 'path';

/**
 * @returns {{
 *  file: string,
 *  page: string,
 *  path: string,
 * }[]}
 */
export const getTemplateData = () => {
  const templates = 'src/pages';
  const base = '/';

  return sync(`${templates}/**/index.html`).map((file) => {
    const page = file.replace(templates, '');
    const dir = dirname(page);
    const path = dir === base ? base : `${dir}/`;

    return {
      file,
      page,
      path
    };
  });
};
