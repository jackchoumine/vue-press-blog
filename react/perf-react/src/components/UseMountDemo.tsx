/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:02:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:03:37
 * @Description :
 */
import React, { useState } from 'react'
import { Button, Toast } from 'antd-mobile'
import { useMount, useUnmount } from '../hooks'

const Child = () => {
  useMount(() => {
    Toast.show('首次渲染')
  })

  useUnmount(() => {
    Toast.show('组件已卸载')
  })

  return <div>你好，我是小杜杜</div>
}

const UseMountDemo: React.FC<any> = () => {
  const [flag, setFlag] = useState<boolean>(false)

  return (
    <div style={{ padding: 50 }}>
      <Button
        color='primary'
        onClick={() => {
          setFlag(v => !v)
        }}
      >
        切换 {flag ? 'unmount' : 'mount'}
      </Button>
      {flag && <Child />}
    </div>
  )
}

export default UseMountDemo
