/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 11:22:56
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-03 23:32:25
 * @Description :
 */
import { useState } from 'react'
import { useAdd } from '../hooks'
function UseAddDemo() {
  const a = 1
  const [b, setB] = useState(10)
  const c = useAdd(a, b)
  console.log('use add demo')
  return (
    <div>
      <p>c:{c}</p>
      <button
        type='button'
        onClick={() => {
          console.log('onClick')
          setB(oldValue => ++oldValue)
        }}>
        修改b
      </button>
    </div>
  )
}
export default UseAddDemo
