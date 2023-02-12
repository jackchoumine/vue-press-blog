/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-05 12:29:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-01-05 12:57:12
 * @Description : 防抖型的 ref
 * https://vuejs.org/api/reactivity-advanced.html#customref
 * https://www.cnblogs.com/fsg6/p/14485972.html
 */
import { customRef } from 'vue'

export function useDebounceRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
