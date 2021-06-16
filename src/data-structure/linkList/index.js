/*
 * @Description: 链表
 * @Date: 2021-06-06 17:45:18 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-06 22:33:32 +0800
 * @LastEditors: JackChou
 */
/**
数组的缺点：
1. 创建时需要申请一段连续的内存空间，大多数编程语言都是固定的，需要扩容时，扩容困难。（扩容一般申请原来的2倍空间，新建一个数组，把原来的元素复制到新数组里）
2. 插入和删除成本高，需要移动大量元素 O(N)
优点：访问方便 O(1)

链表的内存空间不必连续，存储一个元素和指向下一个元素的指针（引用）
优点：扩容方便，插入和删除操作方便 O(1)
缺点：访问不方便，从头找 O(N)
head --> node1 --> node2 ---> node3 --> null
根节点 --->[data,next] ---> [data,next] ---> [data,next] --> null
 */

class Node {
  constructor(data, next = null) {
    this.data = data
    this.next = next
  }
}
export const LinkList = class {
  constructor() {
    // this.items = []// NOTE 不使用数组封装链表
    this.head = null // 头部节点
    // this.currentNode = new Node(null, null) // 末尾节点
    this.length = 0 // 链表长度
  }

  /**
   * 末尾插入元素
   */
  append(element) {
    const node = new Node(element, null)
    if (this.length === 0) {
      this.head = node
    } else {
      let currentNode = this.head
      // 找末尾节点
      while (currentNode?.next) {
        currentNode = currentNode.next
      }
      currentNode.next = node
    }
    this.length += 1
    return true
  }

  /**
   * 插入
   * @param {any} element 插入的元素
   * @param {Number}  position 插入的位置
   */
  insert(element, position = 0) {
    // 对位置进行越界判断
    if (position < 0 || position > this.length) return false
    const node = new Node(element)
    if (position === 0) {
      node.next = this.head
      this.head = node
      this.length += 1
      return true
    }
    /**
   * const test = {
      data: 'data',
      next: { data: 'data', next: { data: 'data', next: null } },
    }
   */
    let preNode = this.head
    let nextNode = this.head
    let i = 0
    // position === this.length
    while (i < position - 1) {
      preNode = preNode.next
      nextNode = preNode.next
      i += 1
    }
    node.next = nextNode
    preNode.next = node
    this.length += 1
    return true
  }

  /**
   *
   * @param {any} element 移出某个数据
   */
  remove(element) {
    return this.removeAt(this.indexOf(element))
  }

  /**
   * 移出某个位置的数据
   * @param {number} position 位置
   */
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return false
    }
    if (position === 0) {
      this.head = this.head.next
      this.length = this.length - 1
      return true
    }
    let preNode = null
    let current = this.head
    let i = 0
    while (i <= position) {
      if (i === position - 1) {
        preNode = current
      }
      current = current.next
      i += 1
    }
    preNode.next = current
    this.length = this.length - 1
    return true
  }

  clear() {
    this.head = null
    this.length = 0
    return false
  }

  update(position, element = null) {
    if (this.length === 0) return false
    if (position < 0 || position > this.length - 1) {
      return false
    }
    let current = this.head
    let i = 0
    while (i < position) {
      current = current?.next
      i += 1
    }
    current.data = element

    return true
  }

  get(position) {
    if (this.length === 0 || position >= this.length) return null
    if (position === 0) return this.head.data
    let data = null
    let currentNode = this.head
    let i = 0
    while (i <= position) {
      data = currentNode?.data ?? null
      currentNode = currentNode?.next
      i += 1
    }
    return data
  }

  indexOf(element) {
    if (this.length === 0) return -1
    let data = null
    let find = false
    let i = 0
    let currentNode = this.head
    while (i <= this.length - 1) {
      data = currentNode?.data ?? null
      // 深度比较
      if (JSON.stringify(data) === JSON.stringify(element)) {
        find = true
        break
      }
      currentNode = currentNode?.next ?? null
      i += 1
    }
    return find ? i : -1
  }

  isEmpty() {
    return this.length === 0
  }

  size() {
    return this.length
  }

  toString(separator = ',') {
    let str = ''
    let currentNode = this.head
    // 找末尾节点
    while (![null, void 0].includes(currentNode)) {
      str += separator + JSON.stringify(currentNode?.data)
      currentNode = currentNode?.next
    }
    return str === '' ? str : str.slice(1)
  }
}
