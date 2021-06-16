/*
 * @Description:
 * @Date: 2021-06-17 05:23:19 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-17 05:43:37 +0800
 * @LastEditors: JackChou
 */
function factorial(n) {
  if (n === 0) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}

const memorized = fn => {
  const factorialObj = {}
  return n => (factorialObj[n] ? factorial[n] : (factorialObj[n] = fn(n)))
}

const fastFactorial = memorized(factorial)
console.time('cache')
console.log(fastFactorial(40))
console.timeEnd('cache') // 8.113ms
console.log('**************')
console.time('no cache')
console.log(factorial(40))
console.timeEnd('no cache') // 0.061ms
