/*
 * @Description: 算法测试
 * @Date: 2021-06-20 09:55:52 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-20 11:54:46 +0800
 * @LastEditors: JackChou
 */
import { twoSum, threeSum } from '@/leetcode'
describe('twoSum', () => {
  const test = [1, 2, 3, 7, 8, 9]
  const sum = 15
  it('twoSum1', () => {
    expect(twoSum.twoSum1(test, sum)).toEqual([3, 4])
  })
  it('twoSum1', () => {
    const test = [-3, 4, 3, 90]
    const sum = 0
    expect(twoSum.twoSum2(test, sum)).toEqual([2, 0])
  })
  it('threeSum', () => {
    const test = [-1, 0, 1, 2, -1, -4]
    expect(threeSum.threeSum(test)).toEqual([
      [-1, 0, 1],
      [-1, -1, 2],
    ])
    // [-4, 2, 2],
  })
})
