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

  return sync(`${templates}/**/index.html`).map((file) => {
    const page = file.replace(templates, '');
    const path = dirname(page);

    return {
      file,
      page,
      path
    };
  });
};
