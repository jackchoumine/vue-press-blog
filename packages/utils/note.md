# 如何编写一个库

## 编写库流程有哪些？

想法（需求） -> 目标 -> 设计 -> 实现 -> 发布

更加规范的流程

想法（需求） -> 目标 -> 设计 -> 实现 -> 测试 -> 发布 -> 维护

## 库的需求来自哪儿？

从哪儿获得灵感或需求？

- 从自己的项目中获得

平时在开发公司业务项目时，会遇到一些问题，这些问题可能是一些通用的问题，可以抽象出来，形成一个库。方便管理和使用，同时减少重复开发和重复代码。

- 从开源社区中获得

在开发过程中，会遇到一些优秀的库，但是这些库可能并不能完全满足我们的需求或者使用不方便，这时候我们可以在这些库的基础上进行**二次开发**，形成一个新的库。

有时候可能我们会突然有个想法，由于没时间立即去实现或者想法不够完善，就会先记录下来，等有时间了再来完善想法。

> 深复制使项目常见的操作，现在把这个需要抽象出来，形成一个库，方便使用。

## 库的目标是什么？

- 为什么要编写这个库？

> 学习编写 JS 库。

- 这个库的目标是什么？

> 实现一个深复制库，能满足不同的使用方式：script 引入、npm 下载和 ESM 引入。

> 提供 ESM，是希望能按需加载。

## 库的设计是什么？

- 库的名称 `@jack/utils`

使用 ESM 模块编写，再使用`rollup`打包，打包成 `umd` 模块和 `CJS`模块。

## 如何实现这个库？

### js 的模块化方案有哪些？

模块的特点

- 独立性 -- 能独立完成某个功能，不受外部环境影响

- 完整性 -- 能完整的完成某个功能

- 可复用性 -- 能在不同的项目中使用

- 可依赖 -- 能依赖其他模块

- 被依赖 -- 能被其他模块依赖

> 模块是一个独立的空间，模块内部的变量、函数、类等都是私有的，不会污染全局作用域，同时模块内部的变量、函数、类等可以通过导出的方式暴露给外部使用。能引用其他模块，也能被其他模块引用。

js 常用得模块化方案，根据**使用方式**看，主要有三种

1. script 标签引入 -- IIFE 模块

```html
<script src="xxx.js"></script>
<script src="yyy.js"></script>
```

使用`IIFE`模块，即立即调用函数表达式，把库的接口挂载到全局对象上，供外部使用

```js
;(function (window) {
  function xxx() {
    // ...
  }
  window.xxx = xxx
})(window)
```

[mdn 更多信息](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)

这种使用方式，依赖关系和引入顺序相关，使用者需要手动管理依赖关系，不方便。再者，这些库往往把**它的依赖**也打包到一起，导致打包体积过大。

> UMD 模块，是一种兼容 AMD 、 CommonJS 和 IIFE 模块的规范，这种规范的库可以在浏览器和 node 环境中使用。

2. npm 安装 -- cmj 模块

开发者使用`npm`等包管理工具安装库，`package.json`对库的依赖和版本进行说明，然后使用`require`引入，这种方式不需要手动管理依赖关系，但是需要使用`commonjs`或者`cmj`规范编写库，这种规范的库不能直接在浏览器中使用，需要使用`rollup`、`webpack`等工具打包成浏览器可用的代码。

导出：

```js
function xxx() {
  // ...
}
module.exports = xxx
```

引入

```js
const xxx = require('xxx')
```

cjs 的定义如下:

```js
define(function (require, exports, module) {
  // 模块代码
})
```

define 包裹函数系统自动生成的，不需要我们手动添加，但是我们需要手动添加`module.exports`，这样才能导出模块。

3. rollup、webpack 等工具打包 -- ESM 模块

ESM 是 ES6 的模块化规范，使用`import`和`export`导入导出模块，这种规范的库可以直接在浏览器中使用。

```html
<script type="module" src="xxx.js"></script>
```

使用`ESM`规范

导出

```js
export default {
  // ...
}
export function xxx() {
  // ...
}
```

引入

```js
import xxx from 'xxx'
// 或者
import { xxx } from 'xxx'
```

打包工具目还是前端开发中必不可少的，使用 ESM，能充分使用这些工具的功能，比如摇树优化、代码压缩等，从而减少打包体积。

加载一个库时，这些工具会自动解析`package.json`中的`module`字段，然后加载对应的文件，这个文件就是`ESM`规范的库。

> 由于历史原因，早些时候一些库使用`jsnext`指定`ESM`规范的库的入口文件，这个字段已经被`module`字段取代。

> [mdn 上关系 ESM 的更多信息](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)

为了满足不同的使用方式，需要借助一些工具，把库打包成不同的模块化规范，比如`rollup`、`webpack`等。

> 总结如下：

- IIFE 模块 -- 适用于浏览器环境，需要手动管理依赖关系，不推荐使用。

- cjs 模块 -- 适用于 node 环境，需要使用`rollup`、`webpack`等工具打包成浏览器可用的代码。

- ESM 模块 -- 适用于浏览器环境，可以直接使用，也可以使用`rollup`、`webpack`等工具打包成浏览器可用的代码。

> 库需要提供不同的模块化规范，才能满足不同的使用场景。

| 使用方式 | 入口文件     | 模块规范 | 内部依赖 | 外部依赖 |
| -------- | ------------ | -------- | -------- | -------- |
| script   | index.umd.js | UMD      | 打包     | 打包     |
| node     | index.cjs.js | CJS      | 打包     | 不打包   |
| 打包工具 | index.js     | ESM      | 打包     | 不打包   |

### 实现代码

目录结构

```bash
├── README.md # 说明文档
├── build  # 打包配置
│   ├── rollup.config.es.js
│   ├── rollup.config.js
│   └── rollup.config.umd.js
├── dist # 打包输出
│   ├── index.cjs.js
│   ├── index.js
│   └── index.umd.js
├── clone.js
├── index.js  # 入口文件 从这里导出 API
├── index.html  # 用来测试 umd 模块的
└── package.json
```

`clone.js`

```js
/**
 * 获取类型
 * @param {any} value 需要检查类型的值
 * @returns {string} 返回类型
 */
export function type(value) {
  const typeStr = Object.prototype.toString.call(value)
  return typeStr.slice(8, -1).toLowerCase()
}
/**
 * 深度复制
 * @param {any} source
 * @returns
 */
export function clone(source) {
  const t = type(source)
  if (!['object', 'array'].includes(t)) return source
  let target
  if (t === 'array') {
    target = []
    const len = source.length
    let i = 0
    while (i < len) {
      target[i] = clone(source[i])
      i++
    }
  } else if (t === 'object') {
    target = {}
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = clone(source[key])
      }
    }
  }
  return target
}
```

`index.js`

```js
export * from './clone'
```

`build/rollup.config.js`

```js
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
  },
  plugins: [terser()], // 压缩代码
}
```

`build/rollup.config.es.js`

```js
export default {
  input: 'index.js',
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
}
```

`build/rollup.config.umd.js`

```js
export default {
  input: 'index.js',
  output: {
    file: 'dist/index.es.js',
    format: 'umd',
    name: 'jackUtils', // 指定全局变量的名字，浏览器环境下会挂载到 window 上，node 环境下会挂载到 global 上
    // 所有导出的函数、变化都会挂载到都是这个全局变量的属性
  },
}
```

`package.json`

```json
{
  "name": "@jack/utils",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.cjs.js",
  "module": "dist/index.js",
  "files": ["dist"],
  "scripts": {
    "build:cjs": "rollup -c build/rollup.config.js",
    "build:umd": "rollup -c build/rollup.config.umd.js",
    "build:es": "rollup -c build/rollup.config.es.js",
    "build": "npm run build:cjs && npm run build:umd && npm run build:es"
  },
  "devDependencies": {
    "rollup": "3.5.1",
    "rollup-plugin-terser": "~7.0.2"
  },
  "keywords": ["clone", "deep clone", "deep copy"],
  "author": "jackchoumine <jackzhoumine@gmail.com;jackchou4job@163.com>",
  "license": "MIT"
}
```

> type 字段的产生用于定义 package.json 文件和该文件所在目录根目录中.js 文件和无拓展名文件的处理方式。

> 值为'module'则当作 es 模块处理；值为'commonjs'或者没有，则被当作 cjs 模块处理。

> 无论 package.json 中的 type 字段为何值，`.mjs` 的文件都按照 es 模块来处理，`.cjs` 的文件都按照 cjs 模块来处理。

> node 官方建议包的开发者明确指定 package.json 中 type 字段的值。

[why-is-type-module-in-package-json-file](https://stackoverflow.com/questions/61401475/why-is-type-module-in-package-json-file)

[How to Use ES Modules in Node.js](https://dmitripavlutin.com/ecmascript-modules-nodejs/)

[参考信息](https://github.com/SunshowerC/blog/issues/8)

以上就是打包一个 js 库的基本配置了。

- 选择合适的工具链

- 选择合适的语言

- 选择合适的工具

- 选择合适的框架

- 选择合适的依赖

- 选择合适的测试工具

## 如何发布这个库？

```

```
