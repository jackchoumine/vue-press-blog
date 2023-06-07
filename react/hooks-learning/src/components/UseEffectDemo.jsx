/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-06 15:45:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-06 15:52:14
 * @Description :
 */
import { useEffect, useState } from 'react'

export function UseEffectDemo() {
  const [count, setCount] = useState(10)
  console.log('render')
  useEffect(() => {
    console.log('useEffect []')
  }, [])
  useEffect(() => {
    console.log(`useEffect [${count}]`)
  }, [count])
  return <button onClick={() => setCount(pre => pre + 1)}>+ {count}</button>
}

// NOTE 副作用一定是和当前 render 的结果没关系的，而只是 render 完之后做的一些额外的事情。
