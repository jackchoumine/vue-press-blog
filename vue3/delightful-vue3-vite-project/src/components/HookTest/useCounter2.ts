/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-03-10 12:12:08
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-10 12:25:31
 * @Description :
 */
export default function useCounter2(initCount: number = 0) {
  // const obj = shallowReactive({ count: initCount, jack: { age: 10 } })
  // const obj = reactive({ count: initCount, jack: { age: 10 } })
  // const obj = shallowRef({ count: initCount, jack: { age: 10 } })
  const obj = ref({ count: initCount, jack: { age: 10 } })
  function addAge(step = 1) {
    // count.value += step
    console.log('addAge')
    obj.value.jack.age += step
  }
  function reduce(step = 1) {
    // count.value -= step
  }
  return {
    obj,
    addAge,
    reduce,
  }
}
