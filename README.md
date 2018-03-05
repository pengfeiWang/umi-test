# umi

🍚 Blazing-fast next.js-like framework for React apps.

## 社区

扫码加钉钉群。

<img src="https://gw.alipayobjects.com/zos/rmsportal/JYGguxCbfjGAxQxNZQdD.jpg" width="200" />

或是微信群。（群满 100 人，加 `sorryccpro` 好友备注 `umi` 邀请加入）



# 可配置的路由路径


> 只作为测试用, 非 `umi` 官方程序


1. 目录可配置
2. 读取 `modules/**/config.js` 根据配置生成路由信息, 其中 `modules` 是可配置, 默认为 `pages`
3. `.umi` 默认在 `pages` 路径, 提取到 当前程序执行路径
4. 内置 `umi-plugin-dva`, 因为插件内部部分内容是写死的, 或者 不满足 提取 `.umi` 文件夹需求
5. 根据路由相关内容, 生成 `menu` 数据文件, 还未实现, 数据已经做过提取, 后续创建文件即可


# start



```
cd examples/directory-route-config

../../packages/umi/bin/umi.js dev
```



# 涉及文件

```
umi-build-dev
  ├── plugins
  │   └── plugin-dva.js // umi-plugin-dva 中的 `index.js`, 略作调整
  ├── getConfig
  │    └── configPlugins
  │      └── directoryConfigRoute.js // 新增
  ├── constants.js
  ├── FileGenerator.js
  ├── getPaths.js
  ├── getPluugin.js
  ├── getRouteConfig.js
  ├── Service.js
  ├── UserConfig.js
  ├── getDirectoryRouteConfig.js // 新增
  ├── template
      └── DvaContainer.js // umi-plugin-dva 中的文件提取到 dev中
```

# 配置文件

`.umirc.js`

```
export default {
  // plugins: [
  //   'umi-plugin-dva'
  // ],
  directoryConfigRoute: 'modules', // 如果 `string` 则会读取目录内容读取 `**/config.js`
};
```



