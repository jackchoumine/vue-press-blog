/*
 * @Description :
 * @Date        : 2023-01-15 23:13:00 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-15 23:19:10 +0800
 * @LastEditors : JackChou
 */
import { sum } from './sum'
test('可用性测试', () => {
  expect(sum(1, 1)).toBe(2)
})
