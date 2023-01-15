/*
 * @Description : 基于数组实现栈
 * @Date        : 2023-01-15 23:50:19 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-16 00:09:32 +0800
 * @LastEditors : JackChou
 */
export const Stack = class Stack {
  constructor(length = 0) {
    this.items = []
    this.size = 0
  }

  // 入栈
  push(item) {
    this.items.push(item)
    this.size++
    return this
  }

  // 出栈 会删除元素
  pop() {
    this.items.pop()
    this.size--
    return this
  }

  // 查看栈顶元素
  peek() {
    const lastItem = this.items.length > 0 ? this.items.at(-1) : null
    return lastItem
  }

  // 是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 元素个数
  // size() {
  //   return this.items.length
  // }

  toString(separator = ',') {
    let str = ''
    this.items.forEach(item => {
      str += separator + JSON.stringify(item)
    })
    return str.slice(1)
  }
}
