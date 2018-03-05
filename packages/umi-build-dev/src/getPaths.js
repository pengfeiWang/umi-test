import { join } from 'path';
import { existsSync, statSync } from 'fs';
import { PAGES_FILE_NAME } from './constants';
function test(path) {
  return existsSync(path) && statSync(path).isDirectory();
}

function template(path) {
  return join(__dirname, '../template', path);
}

export default function(service) {
  const { cwd, tmpDirectory, outputPath, libraryName } = service;
  console.log('getPath.js::--14', service);

  let pagesPath = PAGES_FILE_NAME;
  if (process.env.PAGES_PATH) {
    pagesPath = process.env.PAGES_PATH;
  }
  if (test(join(cwd, `src/${PAGES_FILE_NAME}`))) {
    pagesPath = `src/${PAGES_FILE_NAME}`;
  }
  // if (test(join(cwd, 'src/pages'))) {
  //   pagesPath = 'src/pages';
  // }
  const absPagesPath = join(cwd, pagesPath);
  const absSrcPath = join(absPagesPath, '../');

  const envAffix = process.env.NODE_ENV === 'development' ? '' : `-production`;
  // const tmpDirPath = `${pagesPath}/${tmpDirectory}${envAffix}`;
  const tmpDirPath = `${tmpDirectory}${envAffix}`;
  const absTmpDirPath = join(cwd, tmpDirPath);

  return {
    cwd,
    outputPath,
    absOutputPath: join(cwd, outputPath),
    pagesPath,
    absPagesPath,
    absSrcPath,
    tmpDirPath,
    absTmpDirPath,
    absRouterJSPath: join(absTmpDirPath, 'router.js'),
    absLibraryJSPath: join(absTmpDirPath, `${libraryName}.js`),
    absRegisterSWJSPath: join(absTmpDirPath, 'registerServiceWorker.js'),
    absPageDocumentPath: join(absPagesPath, 'document.ejs'),
    defaultEntryTplPath: template('entry.js.tpl'),
    defaultRouterTplPath: template('router.js.tpl'),
    defaultRegisterSWTplPath: template('registerServiceWorker.js'),
    defaultDocumentPath: template('document.ejs'),
  };
}
