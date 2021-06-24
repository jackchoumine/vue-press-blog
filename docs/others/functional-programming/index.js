/*
 * @Description:
 * @Date: 2021-06-17 05:23:19 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-24 17:51:12 +0800
 * @LastEditors: JackChou
 */
const curry = (fn, argsSize = fn.length) => {
  if (typeof fn !== 'function') {
    throw new Error('no function provided!')
  }
  return function curriedFn(...args) {
    if (args.length === argsSize) {
      return fn(...args)
    }
    return (...params) => {
      return curriedFn(...args.concat(params))
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}
const curriedSum = curry(sum)
// 100 0000 0000
// 100 差不多
// 1000 sum 快一个数量级
// 10000 sum 快2个数量级
// 100000 sum 快2个数量级
// 1000000 sum 快2个数量级
// 10000000 sum 快2个数量级
const bigNumber = 1000000

let sumCount = 0
console.time('sum')
while (sumCount++ <= bigNumber) {
  sum(sumCount, sumCount - 1, sumCount - 2)
}
console.timeEnd('sum')
console.time('curriedSum')
let sumCount2 = 0
while (sumCount2++ <= bigNumber) {
  curriedSum(sumCount2)(sumCount2 - 1)(sumCount2 - 2)
}
console.timeEnd('curriedSum')
