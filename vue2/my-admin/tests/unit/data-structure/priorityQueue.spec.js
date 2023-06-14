/*
 * @Description: 优先级队列测试
 * @Date: 2021-06-05 05:47:26 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-05 06:03:42 +0800
 * @LastEditors: JackChou
 */
import { PriorityQueue } from '@ds/index.js'

describe('PriorityQueue', () => {
  const priorityQueue = new PriorityQueue()
  priorityQueue.enqueue('jack', 3)
  it('test1', () => {
    priorityQueue.enqueue('tom', 5)
    // expect(priorityQueue.front()).toBe({ element: 'jack', priority: 3 })
    expect(priorityQueue.front()).toEqual({ element: 'jack', priority: 3 }) // 深度比较
  })
  it('test2', () => {
    priorityQueue.enqueue('小名', 1)
    expect(priorityQueue.front()).toEqual({ element: '小名', priority: 1 })
  })
})
