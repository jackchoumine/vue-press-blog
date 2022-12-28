/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:43:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:43:41
 * @Description :
 */
import { useState } from 'react'
import useOn from './useOn'

interface Options {
  onEnter?: () => void
  onLeave?: () => void
}

const useHover = (target: any, options?: Options): boolean => {
  const [flag, setFlag] = useState<boolean>(false)
  const { onEnter, onLeave } = options || {}

  useOn(
    'mouseenter',
    () => {
      onEnter?.()
      setFlag(true)
    },
    target
  )

  useOn(
    'mouseleave',
    () => {
      onLeave?.()
      setFlag(false)
    },
    target
  )

  return flag
}

export default useHover
