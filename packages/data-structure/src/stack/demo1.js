/*
 * @Description :
 * @Date        : 2023-01-16 00:37:51 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-16 00:52:36 +0800
 * @LastEditors : JackChou
 */
import { Stack } from './StackBaseArray'

export function des2(n = 2, convertNumber = 0) {
  const stack = new Stack()
  while (convertNumber > 0) {
    stack.push(convertNumber % n)
    convertNumber = Math.floor(convertNumber / 2)
  }

  let bin = ''
  while (!stack.isEmpty()) {
    bin += stack.peek()
    stack.pop()
  }
  return bin
}
