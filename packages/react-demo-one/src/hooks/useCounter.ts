/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 17:39:41
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-15 11:30:59
 * @Description :
 */
import { useState } from 'react'

function useCounter(initCount = 1) {
  const [count, setCount] = useState(initCount)
  function add(step = 1) {
    setCount(preCount => preCount + step)
  }
  function reduce(step = 1) {
    setCount(count - step)
  }
  return { count, add, reduce }
}

export default useCounter
