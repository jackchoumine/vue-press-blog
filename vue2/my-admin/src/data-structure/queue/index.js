/*
 * @Description: 队列
 * @Date: 2020-05-17 21:23:31
 * @Author: JackChouMine
 * @LastEditTime: 2021-06-05 02:55:39 +0800
 * @LastEditors: JackChou
 */
/**
 * 队列：一种受限的线性表，只能先进先出（FIFO First In First Out）
 * 只能在前端（front）进行删除，末尾（rear）进行插入
 * 比如 打印队列、排队进电影院、线程队列、事件队列
 */

// 队列的实现

/**
 *基于数组实现队列
 *
export const Queue = function() {
  this.items = []
  /**
   * 队列是否为空
   *
  Queue.prototype.isEmpty = function() {
    return !this.items.length
  }
  /**
   * 获取队列元素个数
   *
  Queue.prototype.size = function() {
    return this.items.length
  }
  /**
   * 进入队列,返回新的元素个数
   *
  Queue.prototype.enqueue = function(...elements) {
    return this.items.push(...elements)
  }
  /**
   * 删除元素，返回被删除元素
   *
  Queue.prototype.dequeue = function() {
    return this.items.length ? this.items.shift() : null
  }
  /**
   * 查看前端元素
   *
  Queue.prototype.front = function() {
    return this.items.length ? this.items[0] : null
  }
  Queue.prototype.toString = function(separator = ',') {
    let str = ''
    for (const item of this.items) {
      str += separator + JSON.stringify(item)
    }
    return str.substring(1)
  }
}
*/

export const Queue = class Queue {
  constructor() {
    this.items = []
  }

  // 入队
  enqueue(item) {
    this.items.push(item)
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
