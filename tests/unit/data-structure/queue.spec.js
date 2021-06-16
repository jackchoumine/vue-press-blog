/*
 * @Description: 队列测试
 * @Date: 2021-06-05 02:56:19 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-05 04:15:36 +0800
 * @LastEditors: JackChou
 */
import { Queue } from '@ds/index.js'
import { passFlower } from '@qs/flowerGame.js'

describe('Queue', () => {
  const queue = new Queue()
  queue.enqueue('JackChou')
  queue.enqueue('1')
  queue.enqueue('2')
  queue.enqueue('3')
  queue.enqueue('4')
  it('dequeue', () => {
    expect(queue.dequeue()).toBe('JackChou')
  })
  it('front', () => {
    expect(queue.front()).toBe('1')
  })
  it('isEmpty', () => {
    expect(queue.isEmpty()).toBe(false)
  })
  it('toString', () => {
    expect(queue + '').toBe('"1","2","3","4"')
  })
})
describe('passFlower', () => {
  // const test1 = { nameList: ['jack', 'Tom'], number: 2 }
  it('test1', () => {
    const test1 = { nameList: ['A', 'B', 'C', 'D', 'E'], number: 3 }
    // ['A', 'B', 'C', 'D', 'E'] --> ['D', 'E', 'A', 'B'] --> ['B','D','E'] --> ['B','D'] --> ['D']
    expect(passFlower(test1)).toBe('D')
  })
  it('test2', () => {
    const test2 = { nameList: ['jack', 'Tom', '小胡'], number: 2 }
    // 0 ['jack','tom','小胡'] --> 1 ['小胡','jack'] --> 2 ['小胡']
    expect(passFlower(test2)).toBe('小胡')
  })
})
