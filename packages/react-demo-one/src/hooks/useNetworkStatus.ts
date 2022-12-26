/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 18:00:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 19:09:04
 * @Description :
 */
import { useState } from 'react'
import useOn from './useOn'

function useNetworkStatus(callback = (isOnline = false) => undefined) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  function updateNetworkStatus() {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine)
    }
    callback(navigator.onLine)
  }

  useOn('online', updateNetworkStatus, window)
  useOn('offline', updateNetworkStatus, window)

  return isOnline
}
export default useNetworkStatus
