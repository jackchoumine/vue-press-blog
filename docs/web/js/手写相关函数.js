/*
 * @Description:
 * @Date: 2021-06-23 14:53:51 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-29 22:07:28 +0800
 * @LastEditors: JackChou
 */
function throttle(callback, wait) {
  let timer = ''
  const startTime = new Date()
  return (...args) => {
    const now = new Date()
    if (now - startTime >= wait) {
      callback(args[0])
    } else {
      clearTimeout(timer)
      timer = setTimeout(callback, wait)
    }
  }
}

const debounce = (fn, delay) => {
  let timer = null
  return (...rest) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...rest)
    }, delay)
  }
}
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
const a = {
  a: 100,
  b: 200,
  c: {
    name: 'jack'
  },
  d: '33'
}
const b = {
  a: 100,
  b: 200,
  c: {
    name: 'jack22'
  }
}

console.log(isEqual(a, b))
