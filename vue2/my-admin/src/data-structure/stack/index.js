/*
 * @Description: 栈
 * @Date: 2020-05-17 18:17:50
 * @Author: JackChouMine
 * @LastEditTime: 2021-06-04 20:23:20 +0800
 * @LastEditors: JackChou
 */

// export const Stack = function() {
//   // 基于数组封装栈
//   this.items = []
//   // 栈的操作

//   // this.push = function () {
//   // }
//   /**
//    * 入栈，返回入栈后的个数
//    */
//   Stack.prototype.push = function(...elements) {
//     return this.items.push(...elements)
//   }
//   /**
//    * 出栈
//    */
//   Stack.prototype.pop = function() {
//     return this.items.pop()
//   }
//   /**
//    * 获取栈顶元素
//    */
//   Stack.prototype.peek = function() {
//     return this.isEmpty() ? null : this.items[this.items.length - 1]
//   }
//   /**
//    * 栈是否为空
//    */
//   Stack.prototype.size = function() {
//     return this.items.length
//   }
//   /**
//    * 栈是否为空
//    */
//   Stack.prototype.isEmpty = function() {
//     return !this.items.length
//   }
//   Stack.prototype.toString = function(separator = ',') {
//     let result = ''
//     for (const item of this.items) {
//       result += separator + JSON.stringify(item)
//     }
//     return result.substring(1)
//   }
// }
export const Stack = class Stack {
  constructor(length = 0) {
    this.items = []
  }

  // 入栈
  push(item) {
    this.items.push(item)
  }

  // 出栈 会删除元素
  pop() {
    return this.items.pop()
  }

  // 查看栈顶元素
  peek() {
    const lastItem = this.items.length > 0 ? this.items[this.items.length - 1] : null
    return lastItem
  }

  // 是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 元素个数
  size() {
    return this.items.length
  }

  toString(separator = ',') {
    let str = ''
    this.items.forEach(item => {
      str += separator + JSON.stringify(item)
    })
    return str.slice(1)
  }
}
