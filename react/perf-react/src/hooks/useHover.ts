/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:43:36
 * @LastEditors : JackChou
 * @LastEditTime: 2023-01-17 22:00:01 +0800
 * @Description :
 */
import { useState } from 'react'
// import useOn from './useOn'
import useMount from './useMount'
// @ts-ignore
import hoverintent from 'hoverintent'

interface Options {
  onEnter: () => void
  onLeave: () => void
}

const useHover = (target: any, opts?: Record<string, any>, options?: Options): boolean => {
  const [flag, setFlag] = useState<boolean>(false)
  const { onEnter, onLeave } = options || {}
  useMount(() => {
    const _target = target?.current ? target.current : target
    if (_target) {
      if (opts)
        hoverintent(
          _target,
          () => {
            onEnter?.()
            setFlag(true)
          },
          () => {
            onLeave?.()
            setFlag(false)
          },
        ).options(opts)
      else {
        hoverintent(
          _target,
          () => {
            onEnter?.()
            setFlag(true)
          },
          () => {
            onLeave?.()
            setFlag(false)
          },
        )
      }
    }
  })

  return flag
}

export default useHover
