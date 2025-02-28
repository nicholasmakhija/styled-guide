import {
  existsSync,
  mkdirSync,
  writeFileSync
} from 'fs';
import { dirname } from 'path';

/**
 * @param {string} dir 
 * @returns {void}
 */
export const createFolder = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, {
      recursive: true
    });
  }
};

/**
 * @param {string} file 
 * @param {string} data 
 * @returns {void}
 */
export const createResource = (file, data) => {
  const dir = dirname(file);

  createFolder(dir);

  writeFileSync(file, data);
};
