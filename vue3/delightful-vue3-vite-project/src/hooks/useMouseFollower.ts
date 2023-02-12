import { computed, defineComponent, h } from 'vue'

import { unravel } from '../utils/utils'

import { LazyOrRef } from './types'

export function useMouseFollower(position: LazyOrRef<{ x: number; y: number }>) {
  const style = computed(() => {
    const { x, y } = unravel(position)

    return {
      position: 'fixed',
      top: 0,
      left: 0,
      // NOTE添加一定的偏移，否则鼠标被遮挡，无法聚焦其他元素
      transform: `translate3d(${x + 15}px, ${y + 15}px, 0)`,
    }
  })

  const Follower = defineComponent(
    (props, { slots }) =>
      () =>
        h('div', { ...props, style: style.value }, slots)
  )

  return Follower
}
