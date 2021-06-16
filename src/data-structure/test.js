/*
 * @Description: 数据结构测试
 * @Date: 2021-06-04 20:24:22 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-04 20:30:29 +0800
 * @LastEditors: JackChou
 */
import { Stack } from './index.js'
const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push({ name: 'jack' })
console.log(stack + '')
console.log(stack.peek())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.toString())
console.log(stack.size())
