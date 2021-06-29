# js 常见面试题

1. typeof 能判断哪些类型？

2. 何时使用 `===`，何时使用`==`?

3. `window.onload` 和 `DOMContentLoaded` 的区别？

4. JS 创建 10 个 `a` 标签，点击时弹窗它的序号？

5. 手写节流 `throttle` 和防抖 `debounce`?

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
