# node 中的 ES6

ES6 模块的设计思想是尽量静态化，在编译时就能确定依赖关系，以及输入和输出变量，是编译时加载。编译时加载可实现静态优化，类型检查等都在静态分析实现。CommonJS 是运行时加载，加载的是对象，不能静态优化。ES6 模块不是对象，而是通过 **export** 命令显示输出代码，再通过**import**导出。

目前 node 对 ES6 的支持尚处在实验阶段，可编写`.mjs` 和给 node 命令增加`--experimental-modules` 使用 ES6 模块。

## ES6 自动启用严格模式

有以下限制：

- 变量必须先声明再使用；
- 不能删除变量`delete prop`,只能删除属性`delete global[prop]`;
- `arguments`不随函数参数变化；
- 禁止 `this`指向全局对象，顶层 this 指向 `undefined`；
- 增加保留字`protected`、`static`、`interface`等。

## 导出接口

导出接口使用 export 命令。一个模块就是一个独立的文件，文件内部的变量，外部王无法获取。

### export 命令

逐个导出接口：

```js
// name.mjs
export let firstName = 'JACK'
export let lastName = 'Zhou'
export let myFun = () => {
  console.log(`${firstName} ${lastName}`)
}
```

引入接口：
大括号里面的接口名，必须和导出的相同。

```js
//app.mjs
import { firstName, lastName, myFun } from './name'
console.log(firstName + ' ' + lastName)
myFun()
```

统一导出：
如果不想暴露内部变量的名字，可用`as`指定**导出名**

```js
let firstName = 'JACK'
let lastName = 'Zhou'
let myFun = () => {
  console.log(`${firstName} ${lastName}`)
}
setTimeout(() => (firstName = 'HaHa'), 10) //在10毫秒后改变导出接口的值
export { firstName as name, lastName, myFun }
```

引入：
可用`as`给导出的接口取一个别名。

```js
import { name as firstName, lastName, myFun } from './name'
console.log(firstName + ' ' + lastName)
myFun()
// 2秒后输出新的值 HaHa
setTimeout(() => {
  console.log(firstName)
}, 2000)
```

输出：

```js
JACK ZHOU
JACK ZHOU
Haha
```

**setTimeout(() => (firstName = 'HAHHAH'), 10);**在 10 毫秒后改变导出接口的值。`export` 导出的接口和值是动态绑定的。即可通过接口获取模块内部实时的值。这和 CommonJS 规范完全不同，其保存的是模块内的缓存。

导出的接口是**常量**，不可修改，否则报`TypeError:Assingment to constant variable.`。但是可修改**对象**，包括数组、包装对象等。
**但是不推荐这么做，，容易出错，还难以调试**

```js
//my.mjs
let firstName = 'JACK'
let lastName = 'Zhou'
let myFun = () => {
  console.log(`${firstName} ${lastName}`)
}
let obj = {
  age: 10,
  ID: '1313134'
}
let arr = ['1', '2']
let oNum = new Number(12)
export { arr, obj, myFun, oNum }
```

引入：

```js
import { arr, obj, myFun, oNum } from './name';
console.log(obj);
obj.age++; #修改对象
console.log(obj);
arr.push('你好'); # 修改数组 数组是特殊的对象
console.log(arr);
myFun();
// myFun=()=>'周杰' 这里报错
console.log(oNum.valueOf());
oNum.age = 20;
console.log(oNum);
console.log(oNum.age);
```

整体引入,修改上述引入方法：

```js
import * as OBJ from './name'
console.log(OBJ.obj)
```

用**\***指定一个对象，将接口都加载到好对象上。

import 提升效果：

```js
console.log(OBJ.obj)
import * as OBJ from './name'
```

这种效果的本质是模块在**编译时加载，而非运行时**。
加载时可不暴露任何接口。那这样有和作用呢？如何调用接口？？

```js
import './name'
import './name' //多次加载，只会执行一次
```

比如 vue 自定义指令，已经在指令定义文件中使用 `Vue.directive`函数定义指令了，就可以不导出接口，引入时也不需要导入任何接口。

```js
import json from './json'
import Vue from 'vue'
const directives = {
  json
}
for (const [key, value] of Object.entries(directives)) {
  Vue.directive(key, value)
}
// export {json}
```

在 main.js 引入：

```js
// 自定义指令 这里不需要导入任何接口
import './directives'
```

### export default 命令

上面接口的导出方式，在引入时都需要先知道接口名字，否则无法加载。但是用户往往不想要先阅读文档，了解接口。`export default`就是为模块指定默认接口的，引入时接口名可随意命名。

```js
//my.mjs
let firstName = 'JACK'
let lastName = 'Zhou'
let myFun = () => {
  console.log(`${firstName} ${lastName}`)
}
let obj = {
  age: 10,
  ID: '1313134'
}
let arr = ['1', '2']
let oNum = new Number(12)
export { obj, myFun, oNum }
export default arr //默认接口 一个模块只能有一个
```

引入；

```js
import Obj from './name' //将默认接口加载到 Obj 上
console.log(Obj)
import { obj, myFun, oNum } from './name' //引入命名接口
console.log(obj)
console.log(myFun)
console.log(oNum)
```

**export default Interface** 的实质是将接口命名为 **default**。
`export default arr` 和 `export {arr as default}`相同。

`export default` 导出匿名函数都是可以的，还可用来导出类。

```js
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return `(${this.x},${this.y})`
  }
}
let greeting = 'hello class'
export { greeting } // export default 可和多个export 混用
export default Point
```

引入接口:

```js
import Point, { greeting } from './Point'
console.log(greeting)
let point = new Point(3, 4)
console.log(point.toString())
console.log(point instanceof Point)
```

## 引入接口

总结

- import 命令经静态分析后先于其他语句执行；
- import from ,from 指定模块位置，可以是相对路径或者绝对路径，不带路径，就需要用配置文件告诉 JS 引擎。
- 静态加载是 import 有提升效果，多次加载只执行一次；
- 引入接口时可不输出接口；
- `as` 可改写接口名字；
- 编译时加载可实时获取模块内部的变量。
- 关于是否使用大括号引入：
  - 引入`export default`导出的接口，不使用大括号；
  - 引入`export`导出的接口，一般使用大括号，用`as`整体引入就不使用大括号。

## export 和 import 复合使用

## import 动态引入模块

前面的加载无法实现按需加载或者动态加载，因此引入`import()`指令，不是函数，因此不具备函数的特性，比如调用`apply`、`bind`、从`Function.prototype`获得继承，返回`Promise`对象，模块会作为`then`方法的参数。import 能接受的参数，import()都能接受。
**require**是异步动态记载，import() 是动态同步加载。

import() 适用场景

- 按需加载和条件加载；
- 路径动态改变的模块；

例子：

```js
//dynam.mjs
let n = 10
let sayHello = name => {
  console.log('hello', name)
}
export { n }
export default sayHello
```

引入模块：

```js
if (true) {
	import('./dynamic.mjs').then(module => {
    console.log(module)
    console.table(module)
    console.log(module.n);
	sayHello('JACK'); # 用 export default 导出的模块，直接在then方法里调用
	});
}
```

用 export default 导出的模块，直接在 then 方法里直接使用接口，但是有会感觉这个接口来的太突然，推荐动态加载的模块都用 export 导出，然后在引入时解构赋值提取接口。

```js
//dynamic.mjs
let n = 10
let sayHello = name => {
  console.log('hello', name)
}
export { n, sayHello }
```

引入

```js
if (true) {
  import('./dynamic.mjs').then(({ sayHello, n }) => {
    console.log(n)
    sayHello('JACK')
  })
}
```

使用 async 函数加载：

```js
if (true) {
  dynamicLoad()
}
async function dynamicLoad() {
  let { sayHello, n } = await import('./dynamic.mjs')
  console.log(n)
  sayHello('JACK')
}
```

## 模块继承

待完成

## 跨模块常量

待完成

## 参考

[ES6 Module 的语法][1]

[1]: https://es6.ruanyifeng.com/#docs/module
