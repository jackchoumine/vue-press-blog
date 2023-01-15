/*
 * @Description : 测试栈
 * @Date        : 2023-01-15 23:55:57 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-16 00:17:52 +0800
 * @LastEditors : JackChou
 */
import { Stack } from './StackBaseArray'
describe('栈结构测试', () => {
  let stack
  beforeEach(() => {
    console.log('beforeEach')
    stack = new Stack()
    stack.push('1')
    stack.push('2')
    stack.push('3')
    stack.push('4')
  })
  test('测试栈长度和入栈', () => {
    expect(stack.isEmpty()).toBe(false)
    expect(stack.size).toBe(4)
  })
  test('出栈', () => {
    const res = stack.pop()
    console.log(res)
    expect(stack.size).toBe(3)
  })
  test('查看栈顶元素', () => {
    const last = stack.peek()
    expect(last).toBe('4')
  })
  test('toString', () => {
    expect(stack + '').toBe('"1","2","3","4"')
    // expect(stack.toString()).toBe('"1","2","3","4"')
  })
})
