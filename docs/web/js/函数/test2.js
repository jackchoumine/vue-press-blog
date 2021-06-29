/* eslint-disable no-extend-native */
/* eslint-disable no-proto */
/*
 * @Description:
 * @Date: 2021-06-29 03:25:34 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-29 13:26:54 +0800
 * @LastEditors: JackChou
 */
class Person {
  constructor(name) {
    this.name = name
  }

  eat() {
    console.log(`${this.name} eat something`)
  }
}
class Student extends Person {
  constructor(name, no) {
    super(name)
    this.no = no
  }

  sayHi() {
    console.log(`${this.name}'s no is ${this.no}`)
  }
}
const tom = new Student('tom', 122)
console.log(tom)
console.log(tom instanceof Student)
console.log(tom instanceof Person)
console.log(tom instanceof Array)
console.log([] instanceof Array)
console.log(tom.sayHi())
console.log('__proto__ 是什么？')
console.log(tom.__proto__)
console.log(typeof Student.__proto__)
console.log(typeof Student.prototype)
console.log(typeof Student.prototype.__proto__)
console.log('__proto__*******')
console.log(Student.prototype.__proto__)
console.log(Student.prototype === tom.__proto__)
console.log(Object.__proto__)
console.log(Object.prototype.__proto__)
// 手写 this

Function.prototype.myBind = function () {
  // 通过 arguments 获取参数
  const argus = [].slice.call(arguments)

  // myBind 第一项是 this，删除第一项
  const _this = argus.shift()

  const that = this

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
console.log('start', Date.now())

console.log('end', Date.now())
