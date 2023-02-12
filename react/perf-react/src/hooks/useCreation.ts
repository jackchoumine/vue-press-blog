/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 09:42:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 09:43:33
 * @Description :
 */
import type { DependencyList } from 'react'
import { useRef } from 'react'

const depsAreSame = (oldDeps: DependencyList, deps: DependencyList): boolean => {
  if (oldDeps === deps) return true

  for (let i = 0; i < oldDeps.length; i++) {
    // 判断两个值是否是同一个值
    if (!Object.is(oldDeps[i], deps[i])) return false
  }

  return true
}

function useCreation<T>(fn: () => T, deps: DependencyList) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  })

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps
    current.obj = fn()
    current.initialized = true
  }

  return current.obj as T
}

export default useCreation
