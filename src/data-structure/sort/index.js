/*
 * @Description: 排序
 * @Date: 2020-07-30 00:22:07
 * @Author: JackChouMine
 * @LastEditTime: 2021-06-04 13:44:18 +0800
 * @LastEditors: JackChou
 */

/**
 * 选择排序：以第一个元素为参照，在其他元素中找到比它更小的元素，和它交换位置；
 *         以第二个元素为参照，在其他元素中找到比它更小的元素，和它交换位置；
 *         重复以上步骤，直到最后一个元素
 */
function selectSort(array = []) {
  if (array.length === 0) return
  const size = array.length
  for (let i = 0; i < size; i++) {
    const min = array[i]
    let minIndex = i
    for (let j = i + 1; j < size; j++) {
      if (min > array[j]) {
        minIndex = j
      }
    }
    // NOTE 交换元素位置: 顺序很关键
    const temp = array[minIndex]
    array[minIndex] = array[i]
    array[i] = temp
  }
  return array
}
console.log(selectSort([5, 4, 3, 2, 1]))
console.log(selectSort([5, 5, 3, 2, 1]))

/**
 * 冒泡排序：
 *
 */
/*
 [5, 4, 3, 2, 1]
 [5, 4, 3, 2, 1] 5 4
*/
function bubbleSort(array = []) {
  const size = array.length - 1
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - i; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}
console.log(bubbleSort([5, 4, 3, 2, 1]))
console.log(bubbleSort([5, 4, 3, 2, 1]))

/**
 * 插入排序：把数组分成已经排序和未排序两部分，【打牌取牌】
 *         依次拿未排序中的元素，从后往前拿已经排序的与之比较
 *            已经排序的大，向后移动
 *            未排序的大，插入到已排序的元素的后面
 */
function insertionSort(array) {
  const size = array.length
  for (let i = 1; i < size; i++) {
    const current = array[i]
    let preIndex = i - 1
    while (preIndex >= 0 && array[preIndex] > current) {
      // 往后移动元素
      array[preIndex + 1] = array[preIndex]
      --preIndex
    }
    array[preIndex + 1] = current
  }
  return array
}
console.log(insertionSort([5, 4, 3, 2, 1]))
console.log(insertionSort([5, 4, 3, 2, 1]))

/**
 * 递归求和
 */
function sum(n) {
  if (n < 1) {
    return 0
  }
  return n + sum(n - 1)
}
console.log(sum(100))

// 1 1 2 3 5 8 13 21 34
function listSum(n) {
  if (n === 1 || n === 2) return 1
  return listSum(n - 1) + listSum(n - 2)
}
console.log('s', +new Date())
const sum1 = listSum(30) // TODO 如何优化递归
console.log('s', +new Date())
console.log(sum1)

// 尾递归
const fibonacci = (n, sum1 = 1, sum2 = 1) => {
  if (n <= 1) return sum2
  return fibonacci(n - 1, sum2, sum1 + sum2)
}
console.log(new Date())
const sum2 = fibonacci(100)
console.log(new Date())
console.log(sum2)
const fibonacci2 = n => {
  let a = 0
  let b = 1
  let i = 1
  while (i++ <= n) {
    ;[a, b] = [b, a + b]
  }
  return a
}
console.log(fibonacci2(100))
