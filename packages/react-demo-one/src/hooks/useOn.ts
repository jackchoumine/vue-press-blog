/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 17:54:58
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 18:23:15
 * @Description :
 */
import { useEffect } from 'react'

type Handler = (event: any) => void

function useOn(eventName: string, handler: Handler, target: HTMLElement | Window) {
  useEffect(() => {
    target.addEventListener(eventName, handler)
    return () => target.removeEventListener(eventName, handler)
  }, [])
}

export default useOn
