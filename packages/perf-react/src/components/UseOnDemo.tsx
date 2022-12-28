/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:35:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:35:53
 * @Description :
 */
import React, { useState, useRef } from 'react'
import { useOn } from '../hooks'
import { Button } from 'antd-mobile'

const UseOnDemo: React.FC<any> = props => {
  const [count, setCount] = useState<number>(0)
  const [flag, setFlag] = useState<boolean>(true)
  const [key, setKey] = useState<string>('')
  const ref = useRef(null)

  useOn('click', () => setCount(v => v + 1), ref)
  useOn('keydown', ev => setKey(ev.key))

  return (
    <div style={{ padding: 20 }}>
      <Button
        color='primary'
        onClick={() => {
          setFlag(v => !v)
        }}
      >
        切换 {flag ? 'unmount' : 'mount'}
      </Button>
      {flag && (
        <div>
          <div>数字：{count}</div>
          <button ref={ref}>加1</button>
          <div>监听键盘事件：{key}</div>
        </div>
      )}
    </div>
  )
}

export default UseOnDemo
