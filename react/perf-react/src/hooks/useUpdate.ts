/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 10:10:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:10:36
 * @Description :
 */
import { useCallback, useState } from 'react'

const useUpdate = () => {
  const [, setState] = useState({})

  return useCallback(() => setState({}), [])
}

export default useUpdate
