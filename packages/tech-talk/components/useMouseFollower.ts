import { computed, defineComponent, h, ref, unref, ComputedRef } from 'vue'

import type { Ref } from 'vue'

// Raw value or a ref
export type MaybeRef<T> = Ref<T> | T
// Can't be a raw value
export type LazyOrRef<T> = Ref<T> | (() => T)

// Can be a ref, a getter, or a raw value
export type MaybeLazyRef<T> = MaybeRef<T> | (() => T)

// Can be a ref, a getter, or a raw value

export function unravel<T>(value: MaybeLazyRef<T>): T {
  if (typeof value === 'function') {
    // casting because there is  a typescript bug
    // https://github.com/microsoft/TypeScript/issues/37663
    return (value as () => T)()
  }

  return unref(value)
}

export function useMouseFollower(position: LazyOrRef<{ x: number; y: number }>) {
  const style = computed(() => {
    const { x, y } = unravel(position)

    return {
      position: 'fixed',
      top: 0,
      left: 0,
      // NOTE添加一定的偏移，否则鼠标被遮挡，无法聚焦其他元素
      transform: `translate3d(${x}px, ${y}px, 0)`,
    }
  })

  const Follower = defineComponent(
    (props, { slots }) =>
      () =>
        h('div', { ...props, style: style.value }, slots),
  )

  return Follower
}
