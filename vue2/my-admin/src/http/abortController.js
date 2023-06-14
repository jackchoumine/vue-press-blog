/*
 * @Description : abortController 学习
 * @Date        : 2022-11-19 12:29:26 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-11-19 12:31:42 +0800
 * @LastEditors : JackChou
 */
function timeout(duration, signal) {
  return new Promise((resolve, reject) => {
    const handle = setTimeout(resolve, duration)
    // eslint-disable-next-line no-unused-expressions
    signal?.addEventListener('abort', e => {
      clearTimeout(handle)
      reject(new Error('aborted'))
    })
  })
}

// Usage
const controller = new AbortController()
const promise = timeout(10000, controller.signal).catch(error => {
  console.log(error)
})
controller.abort()
console.log(promise) // => Promise(rejected): "Error: aborted"
