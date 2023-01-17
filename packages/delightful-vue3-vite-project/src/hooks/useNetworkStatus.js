/*
 * @Date        : 2022-08-09 10:17:04
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQijun
 * @LastEditTime: 2022-10-14 16:56:45
 * @Description : 测试网络是否在线
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useNetworkStatus(callback = (isOnline = false) => {}) {
  const isOnline = ref(navigator.onLine)
  function updateNetworkStatus() {
    if (typeof window !== 'undefined') {
      isOnline.value = navigator.onLine
    }
    callback(isOnline.value)
  }
  onMounted(() => {
    console.log('updateNetworkStatus')
    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('online', updateNetworkStatus)
    window.removeEventListener('offline', updateNetworkStatus)
  })
  return isOnline
}
