/*
 * @Description: 十进制转二进制
 * @Date: 2021-06-04 22:57:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-04 22:58:33 +0800
 * @LastEditors: JackChou
 */
import { Stack } from '../index.js'
export const dec2bin = decNumber => {
  if (decNumber === 0) return '0'
  const stack = new Stack()
  while (decNumber > 0) {
    stack.push(decNumber % 2)
    decNumber = Math.floor(decNumber / 2)
  }
  let binStr = ''
  while (!stack.isEmpty()) {
    binStr += stack.pop()
  }
  return binStr
}
