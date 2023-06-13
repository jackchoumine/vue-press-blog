# 如何使用 gh-pages 部署 vue 应用？

使用 webpack5 实现了微前端，希望能把这些应用部署到 git-pages, 如何办呢？

[webpack5 模块联邦实现微前端](https://jackchoumine.github.io/webpack/%E6%A8%A1%E5%9D%97%E8%81%94%E9%82%A6%E5%AE%9E%E7%8E%B0%E5%BE%AE%E5%89%8D%E7%AB%AF.html)

## gh-pages 是什么？

gh-pages 是 github 提供给项目、组织等托管静态页面的服务，可使用这项服务托管项目介绍页面、使用文档和组织介绍、个人简历等。

## 如何部署到 gh-pages?

安装`gh-pages`

```bash
npm i -D gh-pages
```

添加脚本：

```js
{
  "deploy": "gh-pages -d dist"
}
```

`dist`是编译输出目录

> 更多参考

[如何部署 create-react-app 项目到 Github pages 步骤](https://github.com/vortesnail/blog/issues/8)

[How to deploy React App to GitHub Pages](https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f)

还可与 CI CD 工具结合，实现自动部署，相关操作可自行搜索。

[部署后的效果](https://jackchoumine.github.io/vue3-dashboard/)

## 如何解决切换路由后刷新浏览器 404 ？

设置两个地方

1. 把仓库名字作为基础路径

```js
const isProd = process.env.NODE_ENV === 'production'
const history = isMemoryHistory
  ? createMemoryHistory(basePath)
  : createWebHistory(isProd ? '/vue3-dashboard' : undefined) // 生产环境才设置基础路径
// vue3-dashboard 是项目名字
```

> 修改基础路径为你仓库名称。

2. 设置自定义错误页面

添加一个 `404.html`，内容和 `index.html`一样当找不到路径时，会渲染 404.html.

每次复制文件也麻烦，我是每次执行部署，脚本执行成功后复制 index.html 为 404.html

```bash
 "build": "webpack --config config/webpack.prod.js --progress",
 "postbuild": "cp dist/index.html dist/404.html",
 "predeploy": "npm run build",
 "deploy": "gh-pages -d dist"
```

其他解决办法：

使用 hash 模式，然后根据这个设置一下 [部署 vue 到 GitHub Pages：404 頁面](https://siddharam.com.tw/post/20190929/)

我没试过，不知道能否成功。

我还试了[单页应用在 gh-pages 动态路由刷新后 404 解决方案](https://segmentfault.com/a/1190000012951274)，没成功。

更多方法，参考
[How to fix HTTP 404 on Github Pages?](https://stackoverflow.com/questions/11577147/how-to-fix-http-404-on-github-pages)

## react 项目如何解决 404 问题？

尝试了 vue 类似的解决办法，没成功，要是你有个更好的办法，感谢告诉我。
