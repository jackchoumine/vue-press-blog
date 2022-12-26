/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 11:20:49
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-26 11:47:34
 * @Description :
 */
import { useMemo } from 'react'
function useAdd(a: number, b: number) {
  log()
  return useMemo(() => {
    console.log('useMemo')
    return a + b
  }, [a, b])
}
function log() {
  console.log('useAdd')
}
export default useAdd
