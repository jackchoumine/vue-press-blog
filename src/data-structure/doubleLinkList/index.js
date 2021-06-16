/*
 * @Description: 双向链表
 * @Date: 2021-06-07 18:58:08 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-08 00:26:16 +0800
 * @LastEditors: JackChou
 */
class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}
export class DoubleLinkList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  // 添加
  append(element) {
    const node = new Node(element)
    if (this.length === 0) {
      this.head = node
    } else {
      let current = this.head
      // 查找末尾 node
      while (current.next) {
        current = current.next
      }
      current.next = node
      node.prev = current
    }
    this.tail = node
    this.length += 1
    return true
  }

  insert(element, position = this.length) {
    if (position < 0 || position > this.length) {
      return false
    }
    const node = new Node(element)
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      if (position === 0) {
        // node 作为第一个节点 将其 next 指向原来的第一个节点
        node.next = this.head
        // 原来第一个节点的 pre 执行 node
        this.head.prev = node
        // node 作为第一个节点
        this.head = node
      } else if (position === this.length) {
        // 在末尾位置追加
        return this.append(element)
      } else {
        let current = this.head
        let index = 0
        // NOTE 下标从 0 开始
        while (index < position) {
          current = current.next
          index += 1
        }
        node.next = current
        current.prev.next = node
      }
    }
    this.length += 1
    return true
  }

  // 删除
  remove(element) {
    return this.removeAt(this.indexOf(element))
  }

  removeAt(position) {
    if (typeof position !== 'number' || position < 0 || position >= this.length || this.length === 0) return false

    if (position === 0) {
      this.head = this.head.next
      this.length -= 1
      return true
    } else if (position > 0 && position === this.length - 1) {
      // 释放末尾节点
      this.tail.prev.next = null
      // 尾指针指向前一个节点
      this.tail = this.tail.prev
      this.length -= 1
      return true
    } else {
      let index = 0
      let current = this.head
      while (index < position) {
        current = current.next
        index += 1
      }
      const nextNode = current.next
      current.prev.next = nextNode
      // 释放内存
      current = null
      this.length -= 1
      return true
    }
  }

  clear() {
    this.head = null
    this.length = 0
  }

  // 改
  update(position, element) {
    if (typeof position !== 'number' || position < 0 || position >= this.length) return false
    if (position <= this.length / 2) {
      let current = this.head
      let index = 0
      while (index < position) {
        current = current.next
        index += 1
      }
      current.data = element
    } else {
      let current = this.tail
      let index = this.length - 1
      while (index > position) {
        current = current.prev
        index -= 1
      }
      current.data = element
    }
    return true
  }

  // 查
  get(position) {
    if (typeof position !== 'number' || position < 0 || position >= this.length) return null
    let data = null
    if (position <= this.length / 2) {
      let current = this.head
      let index = 0
      while (index < position) {
        current = current.next
        index += 1
      }
      data = current.data
    } else {
      let current = this.tail
      let index = this.length - 1
      while (index > position) {
        current = current.prev
        index -= 1
      }
      data = current.data
    }
    return data
  }

  indexOf(element) {
    let index = 0
    let current = this.head
    let find = false
    while (current && !find) {
      if (JSON.stringify(current.data) === JSON.stringify(element)) {
        find = true
        break
      }
      current = current.next
      index++
    }
    return find ? index : -1
  }

  findIndex(element) {
    return this.indexOf(element)
  }

  findAllIndex(...elements) {
    const indexMap = {}
    let index = 0
    let current = this.head
    while (current) {
      elements.forEach(ele => {
        if (JSON.stringify(ele) === JSON.stringify(current.data)) {
          !indexMap[ele] && (indexMap[ele] = new Set([index]))
          indexMap[ele].size && indexMap[ele].add(index)
        }
      })
      current = current.next
      index++
    }

    elements.forEach(el => {
      if (indexMap[el] && indexMap[el].size) {
        indexMap[el] = [...indexMap[el]]
      } else {
        indexMap[el] = false
      }
    })
    return Object.keys(indexMap).length ? indexMap : -1
  }

  getHead() {
    return this.head.data
  }

  getTail() {
    return this.tail.data
  }

  /**
   * 向前遍历
   */
  forward() {}
  /**
   * 向后遍历
   */
  backward() {}

  isEmpty() {
    return this.length === 0
  }

  size() {
    return this.length
  }

  /**
   * 向前遍历,输出字符串
   */
  forwardString(separator = ',') {
    let str = ''
    let current = this.tail
    while (current) {
      str += separator + JSON.stringify(current.data)
      current = current.prev
    }
    return str === '' ? str : str.slice(1)
  }

  /**
   * 向后遍历,输出字符串
   */
  backwardSting(separator = ',') {
    let str = ''
    let current = this.head
    while (current) {
      str += separator + JSON.stringify(current.data)
      current = current.next
    }
    return str === '' ? str : str.slice(1)
  }

  toString(separator = ',') {
    return this.backwardSting(separator)
  }
}
