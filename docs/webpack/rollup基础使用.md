# rollup 基础使用

[rollup](https://rollupjs.org/) 号称是下一代模块打包器，由 [Svelte](https://svelte.dev/) 的作者在 2015 年开发，专注于 JS 打包，通过其插件，也能处理其他文件。

相比 webpack 复杂的配置，其配置简单，打包后的代码体积很小，因此生态系统迅速发展壮大。vue、react 等知名 JS 库，都是用它打包。

## rollup 的优势

1. 配置简单

2. 可将 JS 或者 html 作为入口

3. tree-shaking 优化

4. 多入口，多格式输出

5. 打包输出的代码可读性高

6. 天然支持 ESM

7. ……

通过插件系统，可处理其他文件。

## 基础配置

### 使用命令打包

```json
{
  "scripts": {
    "iife": "rollup ./src/main.js --file ./dist/bundle.js --format iife"
  }
}
```

`--file` 指定输出文件，`--format`指定输出格式，`./src/main.js` 是输入文件。

`src/main.js`

```js
import * as dom from './lib/dom.js'
import { formatHMS } from './lib/time.js'

// get clock element
const clock = dom.get('.clock')

if (clock) {
  console.log('initializing clock')

  // update clock every second
  setInterval(() => {
    clock.textContent = formatHMS()
  }, 1000)
}
```

`src/lib/dom.js`

```js
// fetch first node from selector
export function get(selector, doc = document) {
  return doc.querySelector(selector)
}

// fetch all nodes from selector
export function getAll(selector, doc = document) {
  return doc.querySelectorAll(selector)
}
```

`src/lib/time.js`

```js
// time formatting

// return 2-digit value
function timePad(n) {
  return String(n).padStart(2, '0')
}

// return time in HH:MM format
export function formatHM(d = new Date()) {
  return timePad(d.getHours()) + ':' + timePad(d.getMinutes())
}

// return time in HH:MM:SS format
export function formatHMS(d = new Date()) {
  return formatHM(d) + ':' + timePad(d.getSeconds())
}
```

打包输出`dist/bundle.js`

```js
;(function () {
  'use strict'

  function get(selector, doc = document) {
    return doc.querySelector(selector)
  }

  function timePad(n) {
    return ('' + n).padStart(2, '0')
  }

  function formatHM(d = new Date()) {
    return timePad(d.getHours() + ':' + timePad(d.getMinutes()))
  }

  function formatHMS(d = new Date()) {
    return formatHM(d) + ':' + timePad(d.getSeconds())
  }

  // get clock element
  const clock = get('.clock')

  if (clock) {
    console.log('initializing clock')
    // update clock every second
    setInterval(() => {
      clock.textContent = formatHMS()
    }, 1000)
  }
})()
```

输出代码可读性非常高。

> 其他一些命令

输出 sourceMap，便于调试：

`rollup ./src/main.js --file ./build/bundle.js --format iife --sourcemap`

`--sourcemap inline` 生成行内 sourceMap

监听文件变化，然后打包：

`rollup ./src/main.js --file ./build/bundle.js --format iife --watch --no-watch.clearScreen`

`--no-watch.clearScreen`不会清除控制台。

`--watch`可简写为`-w`。

[更多命令行配置](https://rollupjs.org/guide/en/#command-line-flags)

### 配置文件

默认名字：`rollup.config.js`

常用的核心配置：

```js
export default {
  // 核心选项
  input,     // 必须
  external,
  plugins,

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file,    // 必须
    format,  // 必须
    name,
    globals,

    // 额外选项
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 高危选项
    exports,
    amd,
    indent
    strict
  },

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy
};
```

```js
export default {
  input: './src/main.js',
  output: {
    file: './build/bundle.js',
    format: 'iife',
    sourcemap: true, // 独立的sourcemap,
    // sourcemap: 'inline', // 行内sourcemap,
  },

  // 监听配置
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
    skipWrite: false, // Do not write files to disk when watching, 可提供打包速度
    clearScreen: false, // 不清除控制台打包输出信息
  },
}
```

打包命令：
`rollup -c -w` 或者`rollup --config -w`

可指定其他配置文件：

`rollup -c rollup.example.js`

> 指定构建环境

rollup 允许临时指定运行环境：

`npx rollup --config --environment VAR1,VAR2:value2,VAR3:x`

在配置文件中，可获取这些环境变量：

```bash
process.env.VAR1---true
process.env.VAR2---value2
process.env.VAR3---x
```

在配置文件中获取环境变量：

script：

`"iifeb": "rollup -c --environment production"`

```js
const isProduction = process.env.production

console.log(`running in ${isProduction ? 'production' : 'development'} mode`)

const sourcemap = isProduction ? false : true
```

## 插件

rollup 提供了插件配置，帮助增强功能：编译 TS、压缩代码、处理 scss 等，都可通过插件实现。

插件按照来源分为官方插件，以`@rollup/plugins-x`命名，社区插件，以`rollup-plugin-`命名，可在[Awesome Rollup](https://github.com/rollup/awesome) 找到大家推荐的插件，也可在 npm 上搜索。

### 转换 cjs

很多 npm 包使用的是 node 模块(cjs 格式)，rollup 可以使用插件来转化为 ES 模块。

[plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)--在 es 模块中从 node_modules 导入 cjs 的 npm。

[plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)-- 转 cjs 模块为 es。

以上两个插件配合使用，即可在 es 中是 cjs 的 npm。

`src/main.js` 引入 dayjs

```js
import * as dom from './lib/dom.js'
import dayjs from 'dayjs'

// get clock element
const clock = dom.get('.clock')

if (clock) {
  console.log('initializing clock...')

  // update clock every second
  setInterval(() => {
    clock.textContent = dayjs().format('HH:mm:ss')
  }, 1000)
}
```

打包报警告，且页面报错：

`main.js:14 Uncaught ReferenceError: dayjs is not defined`

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h2wqs7ty9wj20r60c8gnn.jpg)

使用上述插件处理：
修改配置：

```js
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  //** 保持不变
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
  ],
}
```

不再报错。

### 替换 token --- 在代码中注入变量

在代码中注入变量，比如版本好，是一个检查的需求，可使用[@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace) 实现。

```js
import replace from '@rollup/plugin-replace'
// web design token replacements
const tokens = {
  __isProduction: isProduction,
  __time_format: 'HH:mm:ss',
  __clock_selector: '.clock',
  __clock_interval: 1000,
  aB_e: 'hello',
}
export default {
  plugins: [
    // replace({
    //   include: ['src/**/*.js'],
    //   preventAssignment: true,
    //   values: tokens,
    // }),
    replace(tokens),
  ],
}
```

> 在 js 中如何使用 tokens?

```js
const clock = dom.get('__clock_selector')

console.log('aB_e')

if (clock) {
  console.log('initializing clock...')

  // update clock every second
  setInterval(() => {
    clock.textContent = dayjs().format('__time_format')
  }, __clock_interval)
}
```

> 字符串变量，使用`'`包裹

> @rollup/plugin-replace 3.1 以上版本，有更新，提供了更多选项，但是不生效，教程里使用的版本是`3.0.0`

### babel 转化

[@rollup/plugin-babel](https://github.com/rollup/plugins/tree/master/packages/babel)

### 代码压缩

[rollup-plugin-terser](https://github.com/TrySound/
rollup-plugin-terser)

### ts 转化

[rollup/plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript)

### 编写插件

## 目标

1. 打包一个多版本的 js 库
2. 打包一个 vue 按需导入的组件库
3. 打包一个 vue 项目
4. 打包一个 ts 库

## 打包输出的格式

`--format`简写`-f`

| option |            描述             |        其他        |
| :----: | :-------------------------: | :----------------: |
|  iife  | 打包成立即执行函数 -browser |    可提供`name`    |
| esm/es |   esm --nodejs & browser    |
|  cjs   |      commonJS - nodejs      | 需要提供名字`name` |
|  umd   |  通用模块 browser & nodejs  |
|  amd   |        异步模块加载         |
| system |       systemJS module       |

`"rollup ./src/main.js -o ./dist/bundle.js --format es"`

## 参考

[An Introduction to the Rollup.js JavaScript Bundler](https://www.sitepoint.com/rollup-javascript-bundler-introduction/)

[Rollup 的基本使用](https://touchczy.blog.csdn.net/article/details/113892622)

[Rollup 打包工具的使用（超详细，超基础，附代码截图超简单）](https://juejin.cn/post/6844904058394771470)

[Building and publishing a module with TypeScript and Rollup.js](https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396)

[The Ultimate Guide to Getting Started with the Rollup.js JavaScript Bundler](https://blog.openreplay.com/the-ultimate-guide-to-getting-started-with-the-rollup-js-javascript-bundler)

[How to Setup a TypeScript project using Rollup.js](https://www.thisdot.co/blog/how-to-setup-a-typescript-project-using-rollup-js)
