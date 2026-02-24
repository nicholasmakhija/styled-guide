/* eslint-disable @typescript-eslint/naming-convention */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  writeFileSync
} from 'node:fs';
import { dirname } from 'node:path';

const dim = (text: string) => `\x1b[37;2m${text}\x1b[0m`;
const green = (text: string) => `\x1b[32m${text}\x1b[0m`;

const log = (
  file: string,
  outDir: string
) => {
  const dir = `${outDir}/`;
  const [, tail] = file.split(dir);

  // eslint-disable-next-line no-console
  console.log(dim(`../${dir}`) + green(tail));
};

const makeFolder = (file: string) => {
  const dir = dirname(file);

  if (!existsSync(dir)) {
    mkdirSync(dir, {
      recursive: true
    });
  }
};

export const createFile = (
  file: string,
  content: string,
  outDir: string
) => {
  makeFolder(file);
  writeFileSync(file, content);
  log(file, outDir);
};

export const copyFile = (
  input: string,
  output: string,
  outDir: string
) => {
  makeFolder(output);
  copyFileSync(input, output);
  log(output, outDir);
};
