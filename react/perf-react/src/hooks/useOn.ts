/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:33:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:42:32
 * @Description :
 */
import { useEffect } from 'react'

const useOn = (event: string, handler: (...e: any) => void, target: any = window) => {
  useEffect(() => {
    const targetElement = 'current' in target ? target.current : window
    const fn = (event: Event) => {
      return handler(event)
    }
    targetElement.addEventListener(event, fn)
    return () => {
      targetElement.removeEventListener(event, fn)
    }
  }, [event])
}

export default useOn
