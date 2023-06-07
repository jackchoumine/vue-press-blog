/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-05 22:19:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-05 23:16:16
 * @Description :
 */
import { useCallback, useState } from 'react'
import { SonDemo } from './SonDemo'
function UseCallbackDemo() {
  const [count, setCount] = useState(0)
  const [age, setAge] = useState(0)
  //   function onClick() {
  //     setCount(count + 1)
  //   }
  const onClick = useCallback(() => {
    console.log('useCallback')
    setCount(count + 1)
  }, [count])

  return (
    <div style={{ backgroundColor: '#' + Math.random().toString(16).slice(2, 8) }}>
      <h2>UseCallbackDemo</h2>
      <p>count：{count}</p>
      <p>年纪：{age}</p>
      <button onClick={onClick}>count +</button>
      <button onClick={() => setAge(age + 1)}>年纪 +</button>
      <SonDemo callback={onClick} />
      {/* 
      <SonDemo
        callback={() => {
          onClick()
        }}
      /> */}
    </div>
  )
}

export default UseCallbackDemo
