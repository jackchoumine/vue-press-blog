/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:11:44
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:14:44
 * @Description :
 */
import { Button } from 'antd-mobile'
import React from 'react'
import { useUpdate } from '../hooks'

const UseUpdateDemo: React.FC<any> = () => {
  const update = useUpdate()

  return (
    <div style={{ padding: 50 }}>
      <div>时间：{Date.now()}</div>
      <Button color='primary' onClick={update}>
        更新时间
      </Button>
    </div>
  )
}

export default UseUpdateDemo
