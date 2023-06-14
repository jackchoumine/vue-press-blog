/*
 * @Description:
 * @Date: 2021-06-17 05:23:19 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-25 08:55:28 +0800
 * @LastEditors: JackChou
 */
const splitSentence = str => str.split(' ')
const count = array => array.length

const oddOrEven = count => (count % 2 === 0 ? 'even' : 'odd')
const pipe = (...fns) => {
  // 存在一个不是函数 立即返回
  if (fns.some(fn => typeof fn !== 'function')) return
  return value => fns.reduce((acc, fn) => fn(acc), value)
}
const isOdd = str => str === 'odd'
const isOddWords = pipe(splitSentence, pipe(count, oddOrEven), isOdd)
const str = `hello function programming react`
console.log(isOddWords(str)) // false
