/*
 * @Date        : 2022-10-20 09:04:37
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-11-02 11:09:39
 * @Description : 理解 useRef
 */

import React, { useRef, useState, useEffect } from 'react'

export default function Counter() {
  const countRef = useRef(0)
  const [count, setCount] = useState(0)

  function handleRefClick() {
    countRef.current = countRef.current + 1
    console.log('useRef: Button is clicked ' + countRef.current + ' times')
  }

  function handleStateClick() {
    setCount(count + 1)
    console.log('useState: Button is clicked ' + count + ' times')
  }

  console.log('rendering triggered')

  return (
    <>
      <div>
        <button onClick={handleRefClick}>Click me: useRef</button>
        <p>countRef value: {countRef.current}</p>
      </div>
      <br />
      <div>
        <button onClick={handleStateClick}>Click me: useState</button>
        <p>count state value: {count}</p>
      </div>
    </>
  )
}

export function TimeInterval() {
  const intervalRef = useRef(null)

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      console.log('interval start')
    }, 100)
  }

  const handleStop = () => {
    clearInterval(intervalRef.current)
    console.log('interval stop')
  }

  return (
    <div className='App'>
      <h2>记住定时器</h2>
      <button onClick={handleStart}>Start Interval</button>
      <button onClick={handleStop}>Stop Interval</button>
    </div>
  )
}

function usePrevious(count) {
  const previous = useRef(null)
  React.useEffect(() => {
    // NOTE 在赋值之前还是上次的值，就可在赋值之前做一些逻辑
    console.log('set before', previous.current)
    previous.current = count
    // 在赋值之后是当前值
    console.log('set after', previous.current)
  }, [count])
  return previous.current
}

export function RememberLastState() {
  const [count, setCount] = useState(0)

  const previous = usePrevious(count)

  function add() {
    console.log('****************************')
    console.log('setCount before previous', previous)
    console.log('setCount before', count)
    setCount(count + 1)
    console.log('setCount after', count)
    console.log('setCount after previous', previous)
    console.log('****************************')
  }

  return (
    <div>
      <h2>记录上一次的 state</h2>
      <div>previous: {previous}</div>
      <button onClick={add}>{count}</button>
    </div>
  )
}
