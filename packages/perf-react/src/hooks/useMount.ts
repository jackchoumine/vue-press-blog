/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 09:58:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 09:58:48
 * @Description :
 */
import { useEffect } from 'react'

const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.()
  }, [])
}

export default useMount
