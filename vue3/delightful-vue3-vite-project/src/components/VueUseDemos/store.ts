/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:47:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-05-15 17:01:50
 * @Description :
 */
import { createGlobalState } from '@vueuse/core'

export const useGlobalCounter = createGlobalState(() => {
  const count = ref(0)
  return { count }
})

const defendOpen = ref(false)

export function useOpen() {
  function toggleOpen(open?: boolean) {
    defendOpen.value = open ?? !defendOpen.value
  }
  return {
    defendOpen: readonly(defendOpen),
    toggleOpen,
  }
}
