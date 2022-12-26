/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 10:36:02
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-26 10:56:35
 * @Description :
 */
import type { ChangeEvent } from 'react'
import { useState } from 'react'

function useInput(initialValue = '') {
  const [value, setState] = useState(initialValue)
  function onChange(event) {
    setState(event.target?.value)
  }
  return [value, onChange]
}

export default useInput
