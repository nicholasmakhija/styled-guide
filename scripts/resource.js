import {
  copyFileSync,
  existsSync,
  mkdirSync,
  writeFileSync
} from 'fs';
import { dirname } from 'path';

/**
 * @param {string} dir 
 * @returns {void}
 */
export const makeFolder = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, {
      recursive: true
    });
  }
};

/**
 * @param {string} input
 * @param {string} output
 * @returns {void}
 */
export const copy = (input, output) => {
  const dir = dirname(output);

  makeFolder(dir);
  
  copyFileSync(input, output);
};

/**
 * @param {string} file 
 * @param {string} data 
 * @returns {void}
 */
export const create = (file, data) => {
  const dir = dirname(file);

  makeFolder(dir);

  writeFileSync(file, data);
};
