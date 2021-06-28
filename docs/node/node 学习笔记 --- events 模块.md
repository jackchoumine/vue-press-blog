# node 学习笔记 --- events 模块

events 模块只提供了一个对象：events.EventEmitter，是事件发射和事件监听器的封装。`EventEmitter` 的每个事件由一个事件名和若干**参数**组成。每个事件可用若干监听器，发射事件后，监听器依次调用，事件参数作为回调函数的参数传递。

## 例子

```js
// test.1.js
let events = require('events')
//声明一个事件发生器
let emitter = new events.EventEmitter()
// 为 someEvent 事件注册监听器
emitter.on('someEvent', function (parm1, parm2) {
  console.log('listener1', parm1, parm2)
})
// 触发事件 第一个参数是事件名，第二个之后的参数是监听器参数
emitter.emit('someEvent', 'jack', 1994)
```

## EventEmitter 常用 API

- `on(eventName,listener)`，为 `eventName`事件绑定一个监听器；
- `emit(eventName[,arg1,arg2])` 触发 `eventName`事件，arg1,arg2 作为监听器的参数；
- `once(eventName,listener)`,单次绑定监听器；
- `removeListener(eventName,listener)`，移除绑定事件；
- `removeAllListener([eventName])`，移除所有监听器。

我们不会直接用 EventEmitter，而是用它的继承对象。比如 fs、net、http 等，只要支持事件响应的核心模块，都是 `EventEmitter`的子类。

### 这么设计的原因

- `具体功能的对象`实现事件，更符合语义，事件的监听和发射，应该是是一个对象的方法；
- JS 继承机制基于原型，支持多重继承，不会打乱对象原有的继承关系。
