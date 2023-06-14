/*
 * @Description : axios bind 函数
 * @Date        : 2022-11-16 23:56:49 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-11-17 01:22:23 +0800
 * @LastEditors : JackChou
 */
export default function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments)
  }
}

function Person(name) {
  this.name = name
}

Person.prototype.SuperPerson = function (superName) {
  this.superName = superName
}

Person.prototype.say = function () {
  console.log(this.name)
  console.log(this.superNmae)
}

const person = new Person('axios')
// eslint-disable-next-line no-var
// window.age = 10
// const b = { age: 20 }
// function fn(name) {
//   console.log(name)
//   console.log(this.age)
// }

// fn()

// const newFn = bind(fn, b)
// newFn('hello')
// const instance = bind(Person.prototype.say, person)
const instance = Person.prototype.say.bind(person)

const hello = instance()
console.log(hello)
