/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 20:02:57
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 20:07:24
 * @Description :
 */
import { useState } from 'react'

function getItem(key, storage) {
  const value = storage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

function useStorage(key, type = 'session') {
  let storage = null
  switch (type) {
    case 'session':
      storage = sessionStorage
      break
    case 'local':
      storage = localStorage
    default:
      break
  }

  const [value, setValue] = useState(getItem(key, storage))
  function setItem(storage) {
    return newValue => {
      setValue(newValue)
      storage.setItem(key, JSON.stringify(newValue))
    }
  }
  // NOTE 返回数组，可像 react 中的 useState 一样解构
  return [value, setItem(storage)]
}

export default useStorage
