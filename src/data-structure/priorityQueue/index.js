/*
 * @Description: 优先级队列
 * @Date: 2020-05-17 21:23:31
 * @Author: JackChouMine
 * @LastEditTime: 2021-06-05 05:57:41 +0800
 * @LastEditors: JackChou
 */
/**
 * 优先级队列：在插入元素时会考虑优先级，根据优先级确定插入位置
 */

import { Queue } from '../index.js'

/**
 *基于数组实现优先级队列
 *
export const PriorityQueue = function() {
  this.items = []
  function QueueElement(value, priority) {
    this.value = value
    this.priority = priority
  }
  /**
   * 队列是否为空
   *
  PriorityQueue.prototype.isEmpty = function() {
    return !this.items.length
  }
  /**
   * 获取队列元素个数
   *
  PriorityQueue.prototype.size = function() {
    return this.items.length
  }
  /**
   * 进入队列,返回新的元素个数
   *
  PriorityQueue.prototype.enqueue = function({ value, priority } = {}) {
    const element = new QueueElement(value, priority)
    if (this.isEmpty()) {
      // 队列为空，直接插入
      this.items.push(element)
    } else {
      let added = false
      // 比较优先级，确定位置再插入
      for (let i = 0; i < Math.ceil(this.items.length / 2); i++) {
        if (element.priority < this.items[i].priority) {
          this.items.splice(i, 0, element)
          added = true
          break
        }
      }
      if (!added) {
        this.items.push(element)
      }
    }
  }
  /**
   * 删除元素，返回被删除元素
   *
  PriorityQueue.prototype.dequeue = function() {
    return this.items.length ? this.items.shift() : null
  }
  /**
   * 查看前端元素
   *
  PriorityQueue.prototype.front = function() {
    return this.items.length ? this.items[0] : null
  }
  PriorityQueue.prototype.toString = function(separator = ',') {
    let str = ''
    for (const item of this.items) {
      str += separator + JSON.stringify(item)
    }
    return str.substring(1)
  }
}
*/

class QueueElement {
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}

// extends Queue
export class PriorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(item, priority) {
    const element = new QueueElement(item, priority)
    if (this.items.length === 0) this.items.push(element)
    else {
      let n = this.items.length - 1
      // [2] 1
      // [2,8,10] 100
      let added = false
      while (n--) {
        if (this.items[n].priority > priority) {
          this.items.splice(n, 0, element)
          added = true
          break
        }
      }
      if (!added) {
        this.items.push(element)
      }
    }
  }

  // 出队
  dequeue() {
    return this.items.shift()
  }

  // 查看前端元素
  front() {
    return this.items.length > 0 ? this.items[0] : null
  }

  size() {
    return this.items.length
  }

  isEmpty() {
    return this.items.length === 0
  }

  toString(separator = ',') {
    let str = ''
    this.items.forEach(item => {
      str += separator + JSON.stringify(item)
    })
    return str === '' ? str : str.slice(1)
  }
}
