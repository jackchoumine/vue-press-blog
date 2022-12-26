/*
 * @Date        : 2022-08-09 10:29:48
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQijun
 * @LastEditTime: 2022-10-17 09:40:10
 * @Description : 点击 dom 外部
 */
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useOn } from './useOn'

export function useOnClickOutside(DOM = null, callback) {
  const isClickOutside = ref(false)
  function handleClick(event) {
    if (DOM.value && !DOM.value.contains(event.target)) {
      callback()
      isClickOutside.value = true
      return
    }
    isClickOutside.value = false
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClick)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClick)
  })
  return isClickOutside
}

export function useOnClickOutsideV2(callback) {
  const isClickOutside = ref(false)
  const DOMRef = ref(null)
  function handleClick(event) {
    if (DOMRef.value && !DOMRef.value.contains(event.target)) {
      callback(event.target)
      isClickOutside.value = true
      return
    }
    isClickOutside.value = false
  }
  // onMounted(() => {
  //   document.addEventListener('mousedown', handleClick)
  // })
  // onBeforeUnmount(() => {
  //   document.removeEventListener('mousedown', handleClick)
  // })
  useOn('mousedown', handleClick, document)

  function whenClickOutside(DOM) {
    DOMRef.value = DOM
  }
  return { isClickOutside, whenClickOutside }
}
