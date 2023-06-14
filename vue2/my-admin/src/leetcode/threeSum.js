/*
 * @Description:
 * @Date: 2021-06-20 11:20:05 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-20 12:22:20 +0800
 * @LastEditors: JackChou
 */
const threeSum = function (nums) {
  if (nums.length < 3) return []
  const size = nums.length
  const map = { [nums[0]]: 1 }
  const obj = {}
  const result = []
  for (let i = 0; i < size; i++) {
    const target = 0 - nums[i]
    for (let j = i + 1; j < size; j++) {
      const other = target - nums[j]
      if (map[other] !== void 0) {
        const items = [nums[i], nums[j], other].sort()
        // 统计出现的次数
        const times = {}
        items.forEach(n => {
          if (!times[n]) {
            times[n] = 1
          } else {
            times[n] = ++times[n]
          }
        })
        const itemStr = items.join()
        // NOTE 不存在且没有重复使用元素的才加入数组
        if (!obj[itemStr] && items.every(el => times[el] <= map[el])) {
          obj[itemStr] = itemStr
          result.push(items)
        }
      }
      // 统计出现的次数
      if (i === 0) {
        if (map[[nums[j]]] === void 0) {
          map[[nums[j]]] = 1
        } else {
          map[[nums[j]]] = ++map[[nums[j]]]
        }
      }
    }
  }
  return result
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum2 = function (nums) {
  const ans = []
  const len = nums.length
  if (nums == null || len < 3) return ans
  nums.sort((a, b) => a - b) // 排序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] === nums[i - 1]) continue // 去重
    let L = i + 1
    let R = len - 1
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R]
      if (sum === 0) {
        ans.push([nums[i], nums[L], nums[R]])
        while (L < R && nums[L] === nums[L + 1]) L++ // 去重
        while (L < R && nums[R] === nums[R - 1]) R-- // 去重
        L++
        R--
      } else if (sum < 0) L++
      else if (sum > 0) R--
    }
  }
  return ans
}
export default {
  threeSum,
  threeSum2,
}
