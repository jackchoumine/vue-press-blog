import { isRef, unref } from 'vue'

import { LazyOrRef, MaybeLazyRef } from '../hooks/types'

// https://logaretm.com/blog/juggling-refs-around
export function isWatchable<T>(value: MaybeLazyRef<T>): value is LazyOrRef<T> {
  return isRef(value) || typeof value === 'function'
}

export function unravel<T>(value: MaybeLazyRef<T>): T {
  if (typeof value === 'function') {
    // casting because there is  a typescript bug
    // https://github.com/microsoft/TypeScript/issues/37663
    return (value as () => T)()
  }

  return unref(value)
}

// 并发控制函数
// function concurrencyControl(tasks, limit, callback) {
//   const queue = tasks.slice() // 当前执行的任务队列
//   let count = 0 // 已完成的任务数量

//   const runTask = () => {
//     while (limit) {
//       limit--

//       if (queue.length) {
//         const task = queue.shift() // 取出当前队头任务

//         task().then(res => {
//           console.log(res)
//           limit++
//           count++

//           if (count === tasks.length) {
//             // 最后一个任务
//             callback(res) // 执行回调函数
//           } else {
//             runTask() // 继续执行下一个任务
//           }
//         })
//       }
//     }
//   }

//   return runTask
// }
class ConcurrencyControl {
  maxConcurrencyLimit: number
  taskQueue: any[]
  callback: any
  constructor({ maxConcurrencyLimit = 3, callback = void 0 } = {}) {
    this.maxConcurrencyLimit = maxConcurrencyLimit
    this.taskQueue = []
    this.callback = callback
    setTimeout(() => {
      this._runTask()
    })
  }

  push(task: any) {
    this.taskQueue.push(task)
    // this.runTask()
  }

  _runTask() {
    // console.log(this.taskQueue.length)
    if (!this.taskQueue.length) return // 任务队列为空，直接返回
    // const task = this.taskQueue.shift() // 取出当前队头任务
    const needRunTaskCount = Math.min(this.taskQueue.length, this.maxConcurrencyLimit) // 需要执行的任务数量
    const tasks = this.taskQueue.splice(0, needRunTaskCount) // 取出需要执行的任务
    // const taskPromises = tasks.map(task => task()) // 执行任务
    // console.log(tasks)
    Promise.all(tasks).then(res => {
      this._finishTask(res)
      this._runTask()
    })
  }

  _finishTask(res) {
    this.callback(res) // 执行回调函数
  }
}
export { ConcurrencyControl }
