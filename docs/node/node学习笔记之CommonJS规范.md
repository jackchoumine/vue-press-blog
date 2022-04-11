# node 学习笔记 --- CommonJS 规范

## 概述

为了开发大型复杂应用、代码便于管理，制定了不同的 JS 代码模块化规范。

- CommonJS：node 的模块化实现了 CommonJS 规范，`同步加载`。
- AMD ：异步模块定义规范，`异步加载`，是 RequireJS 在推广过程中对模块定义的规范产出，推崇依赖前置；
- ES6：ES6 模块化的设计思想是尽量静态化，编译时就能确定模块依赖关系；
- CMD : 是 SeaJS 在推广时对模块定义的规范化产出，推崇依赖就近；
- UMD : 兼容 AMD 和 CommonJS 的规范化的同时，还兼容全局引用的方式。

CommonJS 规范希望 JS 代码能在任何地方运行，具备开发大型应用的能力，node 的模块化采用 CommonJS 规范实现。

**一个文件就是一个模块**，有自己的作用域。文件中的变量、函数、类都是私有的，其他文件不可见。

每个模块内部，`module`变量代表当前模块。这是一个对象，`exports` 属性是导入模块的接口，`require`一个模块，就是加载`exports`属性。

```js
// example.js
let x = 5
let addX = value => value + x
module.exports.x = x
module.exports.addX = addX
```

```js
//test.js
let example = require('./example')
console.log(example) //{}
console.log(example.x) //5
let result = example.addX(3)
console.log(result) //8
```

CommonJS 模块特点：

> 1. 所有代码都运行在模块的作用域内，不会污染全局作用域；
> 2. 模块可多次加载，但是只会在第一次加载时运行一次，以后加载从**缓存**中读取。不想要运行该模块，必须清除缓存；
> 3. 按照代码出现的顺序加载。

## module 对象

node 内部提供了 Module 构建函数。所有模块都是 Module 的实例。

```js
function Module(id, parent) {
  this.id = id
  this.exports = {}
  this.parent = parent
  // ...
}
```

`module` 的属性：

> id : 模块识别符，带有**绝对路径**的模块文件名；
> filename: 模块文件名，带有绝对路径；
> loaded : 布尔值，模块是否加载完成；
> parent ： module 对象，引用本模块的模块；
> children : module 数组， 本模块引用的其他模块；
> exports ：对象，本模块的导出值是其属性。

没被其他模块引用的模块通常是程序入口，此时 `parent` 属性是为 `null`，可根据该特性判断是否为程序入口。

```js
if (!module.parent) {
  // run with `node something.js`
  app.listen(8088, function () {
    console.log('app listening on port 8088')
  })
} else {
  // used with `require('/.something.js')`
  module.exports = app
}
```

## exports 变量

为了方便，node 为每个模块提供了 exports 变量，指向 `module.exports`，即

```js
let exports = module.exports
```

可向 `exports`对象加添加属性和方法。

```js
exports.area = function (r) {
  return Math.PI * r * r
}
```

> **不能直接将 exports 变量指向一个值，因为这样等于切断了 exports = module.exports 的联系**

一个模块的对外接口，是一个单一的值（**一个函数**或者**一个变量**），`不能使用` `exports` 输出，**只能使用`module.exports`输出**。
<br/>
**在`exports`上添加属性，再导出，导出的是一个对象。**
`exports.prop = value` 等同于 `module.exports = {prop:value}`

```js
//example.1.js 在exports添加属性
let print = value => console.log(value)
exports.print = print
```

```js
//example.2.js 将单一的值赋值给 module.exports
let print = value => console.log(value)
module.exports = print
```

```js
//example.3.js 将单一的值赋值给
let print = value => console.log(value)
exports = print
```

```js
//test.js
let example1 = require('./example.1')
let example2 = require('./example.2')
let example3 = require('./example.3')
console.log(example1) // { print: [Function: print] }
console.log(example2) // [Function:print]
console.log(example3) // {} 给 exports 赋值只能导出空对象
```

> 为了简化，只用 `module.exports`导出值。

> 全局模块

可将变量、函数等附加到全局变量`global`上，无需引入即可使用。

```js
global.name = 'I am node'
// 在项目里可全局使用 name
```

## require 命令

`require`的基本功能是：**读取**并**执行**一个模块，返回该模块的 `exports`对象，可用解构赋值的方式提取部分属性，没有发现模块，报错。

### 加载规则

1. 参数以 `/`开头，加载绝对路径下的模块；
2. 参数以 `./`开头，加载当前目录下的模块；
3. 不以 `./`或 `/`开头，加载核心模块或依次在各级 `node_modules`目录的查找；
4. 想得到包含文件名的完整路径，使用 `require.resolve()`。

### 目录的加载规则

通常把相关文件放在一个目录下，便于组织。这时最好为目录设置一个`入口文件`，`require`方法能根据这个文件，加载整个目录。

npm 包都有一个 `package.json`，写入`main`字段，这是 npm 包的入口。

package.json 文件由 `npm init`命令生成，`npm init -y` 可不用一一 回答询问，直接采用默认值，再手动修改。

```json
//package.json
{
  "name": "some-library",
  "main": "./lib/some-library.js"
}
```

`require`发现参数为一个目录，会先查找该目录下的 `package.json`文件，加载`main`字段指定的入口文件。没有`main`字段或者没有`package.json`文件，则加载该目录下的`index.js`文件或者`index.node`。

### node 模块分类

- 核心模块，内置在 node 内部的，直接引用即可。
- 第三方模块

  - 用 npm 下载，安装到程序目录的 `node_modules`文件夹中；
  - 模块加载时，会先在核心模块中搜索，再到程序的`node_modules`文件夹中搜索。

- 文件模块
- 文件夹模块
  按照目录加载机制加载。

### 模块的缓存

第一次加载，以后从缓存中读取`module.exports`属性。
所有模块的缓存都保存在 `require.cache`中。
删除模块缓存：

```js
// 删除指定模块缓存
delete require.cache(moduleName)
// 删除所有模块缓存
Object.keys(require.cache).forEach(key => {
  delete require.cache[key]
})
```

### require.main

`main`属性，可用来判断是直接执行还是调用执行。
直接执行：`node module.js`，require.main 属性指向模块本身。

```js
//直接执行 表达式为 true
require.main === module
```

通过`require`加载模块执行，上面的表达式为`false`

## 模块加载机制

模块一旦输出值，模块内部的变化，影响不到这个输出值。

```js
// lib.js
let counter = 3
let incCounter = () => {
  counter++
  console.log('模块内部', counter)
}
console.log('lib', require.main === module) // 被require 执行，输出 false
module.exports = {
  counter,
  incCounter,
}
```

```js
// test.1.js
let counter = require('./lib').counter
let incCounter = require('./lib').incCounter
console.log('模块外部', counter) //3
incCounter() // 模块内部的值改变为 4
console.log('模块外部', counter) //外部的值 还是为3
console.log('test', require.main === module)
// 直接执行，输出 true
```

最后输出：

```bash
lib false
模块外部 3
模块内部 4
模块外部 3
test true
```

## 参考文章

[CommonJS 规范](https://javascript.ruanyifeng.com/nodejs/module.html)

[前端模块化（一）nodeJS 中的 CommonJS 规范](https://juejin.im/entry/5b2afc3551882574e321dcf1)
