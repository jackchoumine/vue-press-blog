/*
 * @Description: 击鼓传花
 * @Date: 2021-06-05 03:08:28 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-05 04:20:55 +0800
 * @LastEditors: JackChou
 */
import { Queue } from '../index'
/**
 * 击鼓传花
 * @param {array} nameList 人名
 * @param {number} number 数
 * @returns
 */
export const passFlower = ({ nameList = [], number = 0 } = {}) => {
  const queue = new Queue()
  nameList.forEach(item => {
    queue.enqueue(item)
  })
  if ([0, 1].includes(number)) {
    return queue.front()
  }
  // 数数，数到 number，出列，否则入列，直到只剩下一个元素
  // (nameList.length - 1) * (number - 1)
  while (queue.size() >= 2) {
    Array.from({ length: number - 1 }).forEach(_ => {
      queue.enqueue(queue.dequeue())
    })
    queue.dequeue()
  }
  return queue.front()
}
