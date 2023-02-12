/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 17:51:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 18:25:19
 * @Description :
 */
import { useState } from 'react'
import { useOn } from './index'

function useWindowResize() {
  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }
  useOn('resize', handleResize, window)
  return { width, height }
}

export default useWindowResize
