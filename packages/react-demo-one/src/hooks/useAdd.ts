/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 11:20:49
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-01 17:02:13
 * @Description :
 */
import { useMemo } from 'react'
function useAdd(a: number, b: number) {
  console.log('useAdd')
  return useMemo(() => {
    console.log('useMemo')
    return a + b
  }, [a, b])
}
// function log() {}
export default useAdd
