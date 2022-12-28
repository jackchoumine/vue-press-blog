/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:45:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:50:19
 * @Description :
 */
import { useRef } from 'react'
import { useHover } from '../hooks'

function UseHoverDemo() {
  const divDom = useRef(null)
  const isHover = useHover(divDom)
  return (
    <div
      ref={divDom}
      style={{ height: '30px', lineHeight: '30px', backgroundColor: 'lightblue' }}
    >
      isHover？{isHover ? '是' : '否'}
    </div>
  )
}

export default UseHoverDemo
