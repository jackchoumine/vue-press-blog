/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 20:29:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 20:41:38
 * @Description :
 */
import { useState } from 'react'
import { useHttpGet } from '../hooks'
function UseHttpGetDemo() {
  const [input, setInput] = useState('')
  const { list } = useHttpGet(input)
  return (
    <div>
      <input type='text' value={input} onInput={event => setInput(event.target.value)} />
      <ul>
        {list.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <p>{input}</p>
    </div>
  )
}

export default UseHttpGetDemo
