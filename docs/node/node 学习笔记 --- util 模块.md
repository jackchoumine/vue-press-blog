# node 学习笔记 --- util 模块

util 是 node 的核心模块，提供一些常用的工具函数，弥补 JS 过于精简的不足。

## inherits(constructor,baseConstructor)

实现原型继承，JS 通过复制原型实现继承。

```js
// test.1.js
let util = require('util')
function Base() {
  this.name = 'base'
  this.birth = 1994
  this.sayHello = function () {
    console.log('hello', this.name)
  }
}
Base.prototype.showName = function () {
  console.log(this.name)
}
function Sub() {
  this.name = 'sub'
}
util.inherits(Sub, Base)
let oBase = new Base()
console.log(oBase)
oBase.showName()
oBase.sayHello() //Base 构造函数上的函数
let oSub = new Sub()
oSub.showName() // Base 原型上的函数
//console.log(oSub); // 报错，没继承构造函数上的函数
oSub.sayHello()
```

```bash
Base { name: 'base', birth: 1994, sayHello: [Function] }
base
hello base
sub
Sub { name: 'sub' }
```

## inspect(object,[showHidden],[depth],[colors]) 输出对象的字符串格式，常用于调试错误

- object 需要转换成字符串的对象；
- showHidden 为`true`,输出更多隐藏信息；
- depth 最大的递归层数；
- colors,为 `true`,带颜色输出。

```js
// test.1.js
let util = require('util')
function Base() {
  this.name = 'base'
  this.birth = 1994
  this.inObj = {
    location: '成都',
    books: ['JS入门'],
  }
  this.sayHello = function () {
    console.log('hello', this.name)
  }
}
Base.prototype.showName = function () {
  console.log(this.name)
}
let oBase = new Base()
console.log(util.inspect(oBase, true, 2, true))
```

运行结果：

```bash
Base {
  name: 'base',
  birth: 1994,
  inObj: { location: '成都', books: [ 'JS入门', [length]: 1 ] },
  sayHello:
   { [Function]
     [length]: 0,
     [name]: '',
     [arguments]: null,
     [caller]: null,
     [prototype]: { [constructor]: [Circular] } } }
```

## format(format[,...args]) 格式化字符串

```js
// test.1.js
let util = require('util')
function Base() {
  this.name = 'base'
  this.birth = 1994
  this.inObj = {
    location: '成都',
    books: ['JS入门'],
  }
  this.sayHello = function () {
    console.log('hello', this.name)
  }
}
Base.prototype.showName = function () {
  console.log(this.name)
}
let oBase = new Base()
let formateBase = util.format('%s %d ---- %j%%一个百分号', 'hello', 991, oBase)
console.log(formateBase)
```

```bash
hello 991 ---- {"name":"base","birth":1994,"inObj":{"location":"成都","books":["JS入门"]}}%一个百分号
```

## 其他工具函数

- isArray()
- isRegExp()
- isDate()
- isError()
- debug()
