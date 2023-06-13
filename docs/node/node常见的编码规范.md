# node 常见的编码规范

## 总是使用`异步函数`

node 最大的两个优势是非阻塞和异步运行。异步函数能充分发挥 node 的优势，而同步函数会阻塞主线程。

## 使用 CommonJS 模块规范

JS 的模块规范在 node 还在试验阶段，node 模块规范使用 CommonJS。 ##不在函数内部 `require`模块

CommonJS 规范加载模块是`同步`的，在函数内部加载模块，先加载再使用，只加载一次，下次使用缓存。在函数内部加载模块可能会阻塞函数执行，另一个问题，加载模块错误，不容易发现错误。
解决办法是在**文件顶部**加载要使用的模块。

## 使用 `module.exports`导出模块,不用 exports

## 记得保存 `this`的引用

当上下文改变时，this 值会改变，在函数内部使用 this 时，需要事先保存 this。
使用 `self`、`_this`、`that`保存 this。

另一个不需要事先保存 this 的方法是使用箭头函数。

## 使用严格模式 （_use strict_）

## 检查回调函数是不是一个函数

```js
if (typeof callback === 'function') {
  callback()
}
```

## error 作为回调函数的第一个参数

## 总是在回调函数中检查 error

```js
if (error) {
  //do something
  return 0
}
//no error
//do something
```

## 记得处理可能的异常

```js
let parsedJSON = ''
try {
  parsedJSON = JSON.parse('json')
} catch (err) {
  // handle err
}
if (parsedJSON) {
  // use parsedJSON
}
```

## 使用 JSDoc 注释函数

parma
author
example
returns

如何描述参数是一个回调和返回值是一个函数呢？

## 使用进程管理器，如`pm2`、`forever`、`upstart`
