/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-05 23:27:57
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-05 23:31:13
 * @Description :
 */
import { useRef } from 'react'

// NOTE 在 render 之前执行，且只执行一次
// 创建一个自定义 Hook 用于执行一次性代码
function useSingleton(callback) {
  // 用一个 called ref 标记 callback 是否执行过
  const called = useRef(false)
  // 如果已经执行过，则直接返回
  if (called.current) return
  // 第一次调用时直接执行
  callback()
  // 设置标记为已执行过
  called.current = true
}

export { useSingleton }
