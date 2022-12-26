/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 18:06:03
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 18:24:14
 * @Description :
 */
import { useState } from 'react'
import useOn from './useOn'

function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  function update(event: MouseEvent) {
    const { pageX, pageY } = event
    setPosition({ x: pageX, y: pageY })
  }
  useOn('mousemove', update, window)

  return position
}
export default useMouse
