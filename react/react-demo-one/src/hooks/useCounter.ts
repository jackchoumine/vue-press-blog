/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 17:39:41
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-05 23:46:06
 * @Description :
 */
import { useState } from 'react'

function useCounter(initCount = 1) {
  const [count, setCount] = useState(initCount)
  let a = 1
  function add(step = 1) {
    a += 1
    console.log(a, 'a')
    setCount(preCount => preCount + step)
  }
  function reduce(step = 1) {
    setCount(count - step)
  }
  return { count, add, reduce }
}

export default useCounter
