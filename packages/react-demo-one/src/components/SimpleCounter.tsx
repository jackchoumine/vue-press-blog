/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 17:44:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-26 10:44:34
 * @Description :
 */
import { useCounter } from '../hooks'
export default function SimpleCounter() {
  const { count, add, reduce } = useCounter(10)
  return (
    <>
      <button onClick={() => reduce()}>-</button>
      {count}
      <button onClick={() => add()}>+</button>
    </>
  )
}
