# delightful vue3 vite project

使用 vite 创建 vue 应用，目录结构没给出推荐，那么如何安排目录结构呢？

目录结构没有对错的标准，关键是项目大了**方便管理**、新人来了能**快速找到**他想要修改的文件。

## 一些原则

### 导入方便

设置目录别名，导入模块更加方便：

```js
{
   resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src'),
      '@c' : path.resolve(__dirname, './src/components')
    },
  },
}
```

### 配置自动导入

`unplugin-auto-import/vite` 插件可帮助自动导入 vue 的很多 API,能帮助我们提升效率。

一些组件库也有自动按需导入组件的配置。

### index.js 只包含导入导出代码

index.js 用来负责多个导出，不包含业务代码。

如果包含业务代码，vscode 的上方导航，会同时存在多个 index.js，难以区分。

即使上级目录不同，index.js 包含业务代码，会增加导航成本。

### 以功能组织目录

需要`components`、`utils`、`helpers`、`hooks`、`tools`等目录组织功能。

复杂的组件可能被拆分成几个文件，把这些文件放在一个目录下管理。

比如一个`FileViewer`组件：

```bash
components
 FileViewer
  - FileViewer.vue
  - Sidebar.vue
  - FileContent.vue
  - Directory.vue
  - File.vue
  - helpers.js
  - hooks.js
  - index.js # 导出组件
```

放在一个目录的好处：**方便阅读**；当需要在另一个项目里使用时，能**整体复制**。

### modules 存放独立的功能模块

项目逐渐变大，变得复杂，可能需要分很多功能模块。

modules 里的目录还是按照项目目录组织，或者某些目录不要。

```bash
modules
 - query # 查询功能模块
    - components # 该模块下使用的组件
    - styles # 该模块下使用的样式
    - useQueryHooks.js # hook 不多，可直接写在文件里
    - hooks # hook 比较多时，放到单独的目录
    - type.ts # ts 项目里类型声明文件
    - utils
    index.vue # 该模块的入口组件
```

## hooks

如果 hook 仅限于一个组件使用，把这些 hook 就近写在该组件目录下`hooks.js`。

如果是比较通用的 hook，可能在多个组件中使用，放在 hooks 目录下。

最好一个文件一个 hook 函数，然后通过 index.js 导出，**文件名字**就用 hook 函数的名字命名，比如`useOnClickOutside.js`里的 hook 叫`useOnClickOutside`。

## utils -- 通过项目工具函数

这些工具函数可以在不同项目之间共享，比如 axios 的封装。

比较独立的且常用的功能函数，我写在特定的文件里，比如 axios 的二次封装，`http.js`

## helpers -- 特定项目的辅助函数

不能在项目之间共享的工具函数，放在这里，这些函数往往和特定的项目绑定。

可以没有这个目录。

## views

页面组件目录，不宜嵌套太深，最多嵌套一层，最好直接放页面组件。

页面组件的命名最好和路由的 path 属性强相关。

## router

路由目录，路径在命名时，和 views 下的组件名称保持一致，方便在浏览器查看页面，然后在 vscode 里寻找相应的页面组件。

> 虽然借助 chrome 开发者扩展，可以从浏览器页面导航到 vscode 的组件，但是这样做依然有意义，条理更加清晰，对新加入团队的成员更加友好。

比如

```js
const routes = [
  { path: '/about', component: () => import('../views/About.vue') }
  { path: '/hello-world', component: () => import('../views/HelloWorld.vue') }
]
```

> 多个单词的 path 使用羊肉串命名，可读性更高。

## store

应用状态

## 图片资源 样式的放置

图片资源放在 assets 目录下的`images`下，按照模块组织。

全局样式放在 `assets/styles` 下

```bash
assets
 - images
  - query # query 模块下的图片
```

> 模块里的样式就近放置。

```bash
modules
 - query
    - styles
```

## 这种目录组织方式有什么缺点？

重构代码或者需求改动，可能会涉及到文件的移动或者重命名，git 里的历史记录会丢失。

## 参考

受到[Delightful React File/Directory Structure](https://www.joshwcomeau.com/react/file-structure/) 的启发，总结了该文章。


![](https://komarev.com/ghpvc/?username=ankurk91) 
