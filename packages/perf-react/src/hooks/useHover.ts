/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:43:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 12:00:36
 * @Description :
 */
import { useState } from 'react'
// import useOn from './useOn'
import useMount from './useMount'
import hoverintent from 'hoverintent'

interface Options {
  onEnter: () => void
  onLeave: () => void
}

const useHover = (target: any, options?: Options, opts: Record<string, any>): boolean => {
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
          }
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
          }
        )
      }
    }
  })

  return flag
}

export default useHover
