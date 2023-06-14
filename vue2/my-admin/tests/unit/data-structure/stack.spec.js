/*
 * @Description: stack 测试
 * @Date: 2021-06-04 22:41:48 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-04 23:19:03 +0800
 * @LastEditors: JackChou
 */
import { Stack } from '@ds/index.js'
import { dec2bin } from '@qs/dec2bin.js'
describe('Stack', () => {
  const stack = new Stack()
  stack.push(1)
  stack.push(2)
  stack.push(3)
  it('peek', () => {
    expect(stack.peek()).toBe(3)
  })
  it('pop', () => {
    expect(stack.pop()).toBe(3)
  })
  it('dec2bin', () => {
    expect(dec2bin(1)).toBe('1')
    expect(dec2bin(2)).toBe('10')
    expect(dec2bin(3)).toBe('11')
    expect(dec2bin(4)).toBe('100')
    expect(dec2bin(5)).toBe('101')
    expect(dec2bin(100)).toBe('1100100')
    expect(dec2bin(1000)).toBe('1111101000')
  })
})
