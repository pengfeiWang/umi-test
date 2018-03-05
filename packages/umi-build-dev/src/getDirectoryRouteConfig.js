import { readdirSync, /* readFileSync, */ statSync, existsSync } from 'fs';
import { join, /* extname, */ /* basename, */ relative } from 'path';
// import jsonfile from 'jsonfile';
// import assert from 'assert';
// import { unwatch, watch } from './getConfig/watch';
// import { PAGES_FILE_NAME } from './constants';
import winPath from './winPath';
export default function(paths, config = {}) {
  // let routes = [];
  const routes = getRoutesByPagesDir(paths);
  if (config.exportStatic) {
    routes.forEach(route => {
      if (route.path.indexOf(':') > -1) {
        throw new Error(
          `Variable path ${route.path} don\'t work with exportStatic`,
        );
      }
      if (
        typeof config.exportStatic === 'object' &&
        config.exportStatic.htmlSuffix
      ) {
        route.path = addHtmlSuffix(route.path);
      }
    });
  }
  return routes;
}

function addHtmlSuffix(path) {
  return path.slice(-1) === '/' ? path : `${path}.html`;
}

function replacePath(path) {
  return winPath(path.replace(/\/+/g, '/'));
}
function renderPath (modulePath) {
  if (modulePath === '') {
    return '';
  }

  if (modulePath === 'index' || /index\.jsx?$/.test(modulePath)) {
    return '/';
  }
  if (/^\.\/[\w]+/.test(modulePath) || /\/$/.test(modulePath) || /\./.test(modulePath)) {
    if (/\.jsx?$/.test(modulePath)) {
      return modulePath;
    }
    return `${modulePath}/`;
  } else {
    return `${modulePath}.js`;
  }
}
// 目录型
function getRoutesByPagesDir(paths, dirPath = '') {

  const { cwd, absPagesPath } = paths;
  let ret = []; // eslint-disable-line
  // 保存1级 routePath
  const routeJsonInfo = {
    cwd,
    routeJSON: {},
  }; // eslint-disable-line
  const path = join(absPagesPath, dirPath);
  if (existsSync(path)) {
    const files = readdirSync(path);
    files.forEach(file => {
      if (file.charAt(0) === '.') return;
      const moduleRoot = join(path, file);
      const stats = statSync(moduleRoot);
      if (stats.isDirectory()) {
        const filePath = join(path, file, './config.js');
        if (existsSync(filePath)) {
          const stats = statSync(filePath);
          if (stats.isFile()) {
            try {
              delete require.cache[filePath];
              const config = require(filePath) || {}; // eslint-disable-line
              if (!config.routePath) {
                return [];
              }
              routeJsonInfo.routeJSON[config.routePath] = { ...config, moduleRoot };

              // const tmpObj = {
              //   config,
              //   cwd,
              //   moduleRoot,
              // };
              // ret = getChildRouteByPagesDir(tmpObj, ret, routeJSON);
            } catch (e) {
              console.error(e);
              console.log('');
              console.log('错误');
            }
          }
        }
      }
    });
  }

  return [...getChildRouteByPagesDir(routeJsonInfo)];
}

function getChildRouteByPagesDir(routeJsonInfo) {
  let ret = [];
  const {
    routeJSON,
    cwd,
  } = routeJsonInfo;
  const routeArr = Object.keys(routeJSON);
  routeArr.forEach((it) => { // 通过 key 取 值
    ret = ret.concat(getRouteJsonToArray(routeJSON[it], cwd));
  });
  return ret;
}

function getRouteJsonToArray(routeItem, cwd) {
  const ret = [];
  const {
    routePath,
    children,
    modulePath,
    title,
    icon,
    layout,
    moduleRoot,
  } = routeItem;
  let componentPath = modulePath;
  const filePath = relative(cwd, moduleRoot);

  componentPath = `${filePath}/${renderPath(modulePath, relative(cwd, moduleRoot))}`;
  const currentRoot = routePath;
  function getChild (childrenItem, patentPath = '') {
    if (!childrenItem.modulePath) return;
    const patentPathLast = patentPath ? `${patentPath}/` : '/';
    const childModPath = `${filePath}/${renderPath(childrenItem.modulePath, relative(cwd, moduleRoot))}`;

    if (childModPath === moduleRoot) return;
    ret.push({
      path: replacePath(`${currentRoot}/${patentPathLast}${childrenItem.routePath}`),
      exact: true,
      component: childModPath,
    });
  }
  if (children && children.length) {
    ret.push({
      path: replacePath(routePath),
      exact: true,
      title,
      icon,
      component: componentPath,
    });
    children.forEach(it => {
      if (it.children && it.children.length) {
        getChild(it, it.routePath);
      } else {
        getChild(it);
      }
    });
  } else {
    ret.push({
      path: replacePath(routePath),
      exact: true,
      title,
      icon,
      component: componentPath,
    });
  }

  return ret;
}
