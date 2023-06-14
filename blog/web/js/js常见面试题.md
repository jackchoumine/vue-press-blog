# js 常见面试题

1. typeof 能判断哪些类型？

2. 何时使用 `===`，何时使用`==`?

> 强制类型转换和隐式类型转换

强制：parseInt parseFloat toString 等
隐式： == + if 逻辑运算

3. `window.onload` 和 `DOMContentLoaded` 的区别？

4. JS 创建 10 个 `a` 标签，点击时弹出它的序号？

考察，事件代理。

5. 手写节流 `throttle` 和防抖 `debounce`?

考察闭包、定时器的使用，两者的区别以及使用场景。

```js
// 防抖：等用户动作停止一段时间，如输入停止一段时间，再执行定时器，回调fn的执行频率和用户行为相关
// 使用场景：关注结果，delay 是用户操作停止后延迟执行时间
function debounce(fn, delay) {
  let timer = null
  return (...args) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
// 节流：用户的动作快速连续触发，还一段时间内只执行一次
// 使用场景：降低函数执行频率，让执行频率更加稳定和刘畅，反应在动画上就是平滑稳定。
// delay 控制着函数执行频率，且和用户输入无关。
function throttle(fn, delay) {
  const now = Date.now()
  return (...args) => {
    const diff = Date.now() - now
    if (diff >= delay) fn(...args)
    else {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
}
```

6. Promise 解决什么问题？

JS 是单线程语言，即某一刻只能做一件事，只有一个调用栈。

异步是基于 callback 形式的。

```js
console.log(100)
setTimeout(() => {
  alert(200)
}, 0)
console.log(300)
alert(400)
console.log(500)
```

7. 手写深拷贝？

8. 如何准确判断一个变量是否是数组？

variable instanceof Array

原型链考察

9. 手写一个 jquery，考虑插件和扩展性？

使用 class 和继承

10. class 的原型本质，如何理解？

11. 作用域和闭包

12. this

> this 在函数执行时确定。

a. 单独调用，指向 window
b. 方法调用，指向该对象
c. 箭头函数的 this 由离其最近的非箭头函数确定
d. class 里的 this
e. call、bind、apply 手动指定 this
f. new 调用，创建的对象

```js
const jack = {
  name:'jack',
  sayHi(){
    console.log(this)
  }
  wait(){
    setTimeout(()=>{
      console.log(this)
    })
  }
}

const tom = {
  name:'tom',
  sayHi(){
    console.log(this)
  }
  wait(){
    setTimeout(function(){
      console.log(this)
    })
  }
}
```

13. 手写 bind

```js
Function.prototype.myBind = function () {
  // 通过 arguments 获取参数
  const argus = [].slice.call(arguments)

  // myBind 第一项是 this，删除第一项
  const _this = argus.shift()

  const that = this // this 是调用 myBind 的函数

  return function () {
    return that.apply(_this, argus)
  }
}
function fn(a, b, c) {
  console.log('this', this)
  console.log(a, b, c)
  return 'fn'
}
const fn2 = fn.myBind({ x: 100 }, 1, 2, 3)
fn2()
```

13. 手写 ajax

14. 常见的前端攻击方式有哪些？

① XSS -- 跨站请求攻击

预防：`<` 变成 `&lt`、`>` 变成`&gt`

使用 npm 包`xss`

② XSRF -- 跨站请求伪造

- 使用 post 接口

- 支付时添加二次验证，比如密码、短信等

15. 手写 lodash isEqual

```js
const isObject = value => {
  return typeof value === 'object' && value !== null
}
const isEqual = (obj1, obj2) => {
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  if (obj1 === obj2) return true
  // 比较 keys，数组和对象都有 key
  const objKey1 = Object.keys(obj1)
  const objKey2 = Object.keys(obj2)
  if (objKey1.length !== objKey2.length) return false
  // 递归比较
  const size = objKey1.length - 1
  let i = 0
  while (i <= size) {
    const key = objKey1[i]
    if (!isEqual(obj1[key], obj2[key])) {
      return false
    }
    ++i
  }
  // 到达这里 说明全等
  return true
}
```

16. new Object() 和 Object.create() 的区别？

`{}` 等同于`new Object()` 原型为`Object.prototype`。

`Object.create(null)` 没有原型。

17. requestAnimationFrame

18. 性能优化从哪些方面考虑

## 框架的考察

### vue

> vuex 的理解?

作用：集中管理应用的状态。

原理：
