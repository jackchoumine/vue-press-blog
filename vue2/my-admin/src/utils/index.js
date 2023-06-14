/*
 * @Description: 常用工具函数
 * @Date: 2021-06-03 17:46:35 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-09-25 01:02:37 +0800
 * @LastEditors : JackChou
 */
/**
 * 柯里化
 * @param {Fn} fn 需要柯里化的函数
 * @returns Fn
 */
export const curry = fn => {
  if (typeof fn !== 'function') {
    throw new Error('no function provided!')
  }
  // 因为要递归，使用箭头函数会不方便
  return function curriedFn(...args) {
    // 递归出口放在前面，更加好理解
    if (args.length === fn.length) {
      return fn(...args)
    }
    // 箭头函数没有 arguments 需要显示给出参数
    return (...params) => {
      return curriedFn(...args.concat(params))
    }
  }
}
const log = (size, color, info) => {
  console.log(`%c${info}`, `color:${color};font-size:${size}px`)
}
export const blueLog = curry(log)(20)('#44cef6')
export const redLog = curry(log)(20)('red')
export const blackLog = curry(log)(18)('#161823')

export const logInfo = ({ status, statusText, config }) => {
  redLog(`${status}，${statusText}：参数错误`)
  blackLog(`url：`)
  blueLog(config.url)
  blackLog('请求参数：')
  blueLog(config.data)
}

/**
 * 防抖函数
 * @param {Function} callback 目标函数
 * @param {Number} wait 延迟时长，默认 300 毫秒
 * @param {Boolean} [immediate=false] 是否立即执行 默认 false
 * @returns {Function} 函数
 */
export const debounce = (callback, wait = 300, immediate = false) => {
  let timer = ''
  let callTimes = 0
  return (...rest) => {
    timer && clearTimeout(timer)
    if (immediate) {
      const callNow = !callTimes
      callTimes += 1
      timer = setTimeout(() => {
        callTimes > 1 && callback(rest) // NOTE 计时器的作用：记录用户的操作次数，如果立即执行后的还进行多次操作，就合并执行目标函数
        // 比如 300毫秒内用户连续点击三下，第一次点击执行一次目标函数 后两次点击合并执行一次
        // NOTE 如果没有计数器直接调用目标函数，会出现操作一次，目标函数执行两次的情况
        // NOTE 如果不调用目标函数，那么第一次执行后，用户操作多次，不再执行目标函数
        timer = ''
        callTimes = 0 // NOTE 重置计时器
      }, wait)
      if (callNow) {
        callback(rest)
        callTimes = 1
      }
    } else {
      timer = setTimeout(() => {
        callback(rest)
        timer = ''
      }, wait)
    }
  }
}
/**
 * 节流函数
 * @param {Function} callback 目标函数
 * @param {Number} wait 延迟时间 毫秒，默认300
 * @param {Boolean} [immediate=false] 是否立即执行 默认 false
 * @returns {Function} 函数
 */
export const throttle = function (callback, wait = 300, immediate = false) {
  let timer = ''
  let last = Date.now()
  let callTimes = 0
  return function (...rest) {
    const that = this
    timer && clearTimeout(timer)
    const now = Date.now()

    // 立即调用
    if (callTimes === 0 && immediate) {
      callback.apply(that, rest)
      last = Date.now()
      callTimes = 1
    }

    // 延迟调用
    if (now - last >= wait) {
      console.log(now - last)
      callback.apply(that, rest)
      last = Date.now()
      callTimes += 1
      timer = ''
    } else {
      timer = setTimeout(function () {
        // 保证最后一次操作执行
        callTimes > 1 && callback.apply(that, rest)
        last = Date.now()
        timer = ''
      }, wait)
    }
  }
}

export function windowSize() {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  return { width: viewportWidth, height: viewportHeight }
}

export function isElementVisible(element) {
  const _window = windowSize()
  const rect = element.getBoundingClientRect()
  return rect.top < _window.height && rect.top > -rect.height && rect.left < _window.width && rect.left > -rect.width
}
