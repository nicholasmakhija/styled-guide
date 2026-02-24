const {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} = require('node:fs');
const { dirname, resolve } = require('node:path');
const { sync } = require('glob');
const chalk = require('chalk');

// transpile imports on the fly
require('@babel/register')({
  configFile: resolve(__dirname, './.babelrc'),
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

const { getPages } = require('./server/get-pages.ts');
const { updateHTML } = require('./server/index.tsx');
const { templateData } = require('./server/template-data.ts');

const distFolder = 'dist';

/**
 * @param {string} file 
 * @returns {void}
 */
const log = (file) => {
  const outDir = `${distFolder}/`;
  const [, tail] = file.split(outDir);

  // eslint-disable-next-line no-console
  console.log(chalk.dim(`../${outDir}`) + chalk.green(tail));
};

/**
 * @param {string} file 
 * @returns {void}
 */
const makeFolder = (file) => {
  const dir = dirname(file);

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
const createFile = (file, data) => {
  makeFolder(file);
  writeFileSync(file, data);
  log(file);
};

const copyFile = (inFile, outFile) => {
  makeFolder(outFile);
  copyFileSync(inFile, outFile);
  log(outFile);
};

const srcFolder = 'src';
const assetsFolder = 'assets';

// eslint-disable-next-line no-console
console.log('copied:');

copyFile(`${srcFolder}/404.html`, `${distFolder}/404.html`);

sync(`${srcFolder}/${assetsFolder}/**/*.*`).map((file) => {
  const pathToReplace = file.includes('favicon-') || file.includes('og-')
    ? `${srcFolder}/${assetsFolder}`
    : srcFolder;
  const outFile = file.replace(pathToReplace, distFolder);

  copyFile(file, outFile);
});

const file = `./${distFolder}/index.html`;
const filePath = resolve(__dirname, file);
const pages = getPages();
const rawHTML = readFileSync(filePath, {
  encoding: 'utf8'
});

// eslint-disable-next-line no-console
console.log('created:');

createFile(`${distFolder}/assets/data/pages.json`, JSON.stringify(pages));

templateData.forEach(({ page, path }) => {
  const renderedHTML = updateHTML(rawHTML, {
    currentPage: path,
    isDark: false,
    pages
  });

  createFile('dist' + page, renderedHTML);
});
