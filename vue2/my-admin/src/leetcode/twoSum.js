/*
 * @Description: 两数之和
 * @Date: 2021-06-20 09:53:00 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-20 10:37:40 +0800
 * @LastEditors: JackChou
 */
// 双重循环 O(n^2)
const twoSum1 = (arr, sum) => {
  const size = arr.length
  for (let i = 0; i < size; i++) {
    const target = sum - arr[i]
    //  NOTE  从 i + 1 开始比较，避免重复
    for (let j = i + 1; j < size; j++) {
      if (target === arr[j]) {
        return [i, j]
      }
    }
  }
}
const twoSum2 = (arr, sum) => {
  const size = arr.length
  const map = new Map()
  map.set(arr[0], 0)
  // NOTE 从 1 开始
  for (let i = 1; i < size; i++) {
    const target = sum - arr[i]
    if (map.get(target) !== void 0) {
      return [i, map.get(target)]
    }
    // NOTE value - key
    map.set(arr[i], i)
  }
}

export default { twoSum1, twoSum2 }
