/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 09:59:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:07:09
 * @Description :
 */
import { useEffect, useRef } from 'react'

const useUnmount = (fn: () => void) => {
  // TODO 为何使用 useRef ？
  const ref = useRef(fn)
  ref.current = fn

  useEffect(() => {
    // do nothing when mounted
    return () => {
      ref.current()
      // fn?.()
    }
  }, [])
}

export default useUnmount
