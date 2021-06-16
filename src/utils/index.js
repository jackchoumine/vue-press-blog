/*
 * @Description: 常用工具函数
 * @Date: 2021-06-03 17:46:35 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-04 00:21:28 +0800
 * @LastEditors: JackChou
 */

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
export const throttle = function(callback, wait = 300, immediate = false) {
  let timer = ''
  let last = Date.now()
  let callTimes = 0
  return function(...rest) {
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
      timer = setTimeout(function() {
        // 保证最后一次操作执行
        callTimes > 1 && callback.apply(that, rest)
        last = Date.now()
        timer = ''
      }, wait)
    }
  }
}
