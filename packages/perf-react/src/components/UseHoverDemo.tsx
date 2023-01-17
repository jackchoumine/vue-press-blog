/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:45:25
 * @LastEditors : JackChou
 * @LastEditTime: 2023-01-17 23:01:10 +0800
 * @Description :
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHover } from '../hooks'

function UseHoverDemo() {
  const divDom = useRef<HTMLDivElement | null>(null)
  const button = useRef<HTMLButtonElement | null>(null)
  const isHover = useHover(divDom)
  const [count, setCount] = useState<number>(0)
  // NOTE 教程 https://mp.weixin.qq.com/s/JyCqbbQaOHKXW4wIvAErag
  // const onClick = useCallback(() => {
  //   setCount(prevCount => prevCount + 1) // 将count在原来的基础上加1，触发组件渲染
  //   setTimeout(() => {
  //     // 始终是 0 // BUG 为何？？
  //     console.log('setTimeout', count)
  //   }, 1000)
  //   // 始终是 0
  //   console.log(count)
  // }, [])

  useEffect(() => {
    button.current?.addEventListener('click', onClick)
    return () => {
      console.log('cleanUp')
      button.current?.removeEventListener('click', onClick)
    }
    // NOTE依赖为 []，打印始终是初始值
    // 为了让 effect 拿到它所需 state 和 props 的最新值，effect 中所有要访问的外部变量都应该作为依赖项放在 useEffect 第二个参数中。
  }, [count])

  return (
    <>
      <div
        ref={divDom}
        style={{ height: '30px', lineHeight: '30px', backgroundColor: 'lightblue' }}
      >
        isHover？{isHover ? '是' : '否'}
      </div>
      <hr />
      {/* ref={button}  onClick={onClick}*/}
      <button ref={button}>打开开发者工具再点击{count}</button>
    </>
  )

  function onClick() {
    setCount(prevCount => prevCount + 1) // 将count在原来的基础上加1，触发组件渲染
    setTimeout(() => {
      // NOTE
      // count 是本次渲染的值，不是变化后的值
      // 即使它在 1 秒后打印
      console.log('setTimeout', count)
    }, 1000)
    // 在函数组件中取 state 和 props 拿到的都是本次渲染的值，在本次渲染范围内，props 和 state 始终不变。
    // NOTE 如何确定是否为本次渲染呢？
    console.log(count)
  }
}

export default UseHoverDemo
