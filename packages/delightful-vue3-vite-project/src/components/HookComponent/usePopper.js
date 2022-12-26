import { createPopper } from '@popperjs/core'
export function usePopper(placement) {
  const target = ref(null)
  const tooltipDom = ref(null)

  onBeforeUpdate(() => {
    target.value = null
    tooltipDom.value = null
  })

  watchEffect(
    () => {
      createPopper(target.value, tooltipDom.value, {
        placement: unref(placement), // ref 作为参数传入
      })
    },
    {
      flush: 'post',
    }
  )

  return {
    reference(el) {
      target.value = el
    },
    tooltip(el) {
      tooltipDom.value = el
    },
  }
}
