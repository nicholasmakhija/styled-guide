/* eslint-disable @typescript-eslint/naming-convention */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  writeFileSync
} from 'node:fs';
import { dirname, parse } from 'node:path';

const dim = (text: string) => `\x1b[37;2m${text}\x1b[0m`;
const green = (text: string) => `\x1b[32m${text}\x1b[0m`;

const log = (file: string) => {
  const { base, dir } = parse(file);

  // eslint-disable-next-line no-console
  console.log(dim(`../${dir}/`) + green(base));
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
  content: string
) => {
  makeFolder(file);
  writeFileSync(file, content);
  log(file);
};

export const copyFile = (
  input: string,
  output: string
) => {
  makeFolder(output);
  copyFileSync(input, output);
  log(output);
};
