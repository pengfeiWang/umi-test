module.exports = {
  // url 访问路径
  routePath: '/',
  // 导航菜单名称, 页面 title 也会用到
  title: '首页',
  // 指向组件路径, 对应路径为: modules/当前目录/filename.js
  // 如果为空 系统则匹配 modules/当前目录/index.js
  // 默认为空即可
  modulePath: '',
  children: [
    {
      routePath: '/query',

      /*
        匹配规则, 子路由 modulePath 不能为 `空` `./` `/`;
        modulePath: 'query-code' = query-code.js
        modulePath: 'query-code.js' = query-code.js
        modulePath: 'query-code/' = query-code/
        modulePath: './query-code' = query-code/
      */
      modulePath: 'query-code.js',
    },
  ],
};
