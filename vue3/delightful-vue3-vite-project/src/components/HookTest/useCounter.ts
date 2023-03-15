/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-13 09:04:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-15 11:02:34
 * @Description : Counter hook
 */
export default function useCounter(initCount: number = 0) {
  const count = ref(initCount)
  function add(step = 1) {
    count.value += step
  }
  function reduce(step = 1) {
    // onMounted 不会执行
    // onMounted(() => {
    //   debugger
    //   console.log('onMounted')
    // })
    count.value -= step
  }
  return {
    count,
    add,
    reduce,
  }
}
