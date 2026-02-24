const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');

// @ts-ignore
require('@babel/register')({
  configFile: path.resolve(__dirname, './.babelrc'),
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});

const { copyFile, createFile } = require('./server/utils.ts');
const { getPages } = require('./server/get-pages.ts');
const { updateHTML } = require('./server/index.tsx');
const { templateData } = require('./server/template-data.ts');

const assetsFolder = 'assets';
const distFolder = 'dist';
const srcFolder = 'src';
const pageNotFount = '404.html';

// eslint-disable-next-line no-console
console.log('copied:');

copyFile(
  `${srcFolder}/${pageNotFount}`,
  `${distFolder}/${pageNotFount}`
);

glob.sync(`${srcFolder}/${assetsFolder}/**/*.*`).map((file) => {
  // test if file is assets root
  const pathToReplace = /assets\/([A-Za-z0-9-])+\.(pn|jp)g$/.test(file)
    ? `${srcFolder}/${assetsFolder}`
    : srcFolder;
  const output = file.replace(pathToReplace, distFolder);

  copyFile(file, output);
});

const file = `./${distFolder}/index.html`;
const filePath = path.resolve(__dirname, file);
const pages = getPages();
const rawHTML = fs.readFileSync(filePath, {
  encoding: 'utf8'
});

// eslint-disable-next-line no-console
console.log('created:');

createFile(
  `${distFolder}/${assetsFolder}/data/pages.json`,
  JSON.stringify(pages)
);

templateData.forEach(({ page, path }) => {
  const renderedHTML = updateHTML(rawHTML, {
    currentPage: path,
    isDark: false,
    pages
  });

  createFile(distFolder + page, renderedHTML);
});
