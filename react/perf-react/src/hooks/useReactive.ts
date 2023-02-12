/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:16:08
 * @LastEditors : JackChou
 * @LastEditTime: 2023-01-17 22:59:03 +0800
 * @Description :
 */
import { useRef } from 'react'
import { useUpdate, useCreation } from './index'
// https:/ / juejin.cn / post / 7101486767336849421
function observer<T extends Record<string, unknown>>(initialVal: T, cb: () => void): T {
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      return typeof res === 'object' ? observer(res, cb) : Reflect.get(target, key)
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val)
      cb()
      return ret
    },
  })

  return proxy
}

function useReactive<T extends Record<string, unknown>>(initialState: T): T {
  const ref = useRef<T>(initialState)
  const update = useUpdate()

  const state = useCreation(() => {
    return observer(ref.current, () => {
      update()
    })
  }, [])

  return state
}

export default useReactive
