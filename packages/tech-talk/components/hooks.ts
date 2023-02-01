/*
 * @Description :
 * @Date        : 2023-02-01 22:29:28 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-02 00:42:58 +0800
 * @LastEditors : JackChou
 */
import { computed, unref, ref, watch, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

import { http } from './utils'

type MaybeRef<T> = Ref<T> | T

export function useAdd(a: MaybeRef<number>, b: MaybeRef<number>) {
  console.log('useAdd') // NOTE 这个会执行几次？
  return computed(() => unref(a) + unref(b))
}

export function useCounter(initCount: number = 0) {
  const count = ref(initCount)
  function add(step = 1) {
    count.value += step
  }
  function reduce(step = 1) {
    count.value -= step
  }
  return {
    count,
    add,
    reduce,
  }
}

export function useHttpGet(key: string) {
  const keyRef = ref(key)
  const list = ref([])
  watch(
    keyRef,
    newKey => {
      http(newKey).then(res => {
        // @ts-ignore
        list.value = res
      })
    },
    { immediate: true },
  )

  return list
}

export function useVModel(props, name) {
  const emit = getCurrentInstance().emit

  return computed({
    get() {
      return props[name]
    },
    set(v) {
      emit(`update:${name}`, v)
    },
  })
}

type Handler = (event: Event) => void

export function useOn(
  eventName: string,
  handler: Handler,
  target: HTMLElement | Document | Window | BroadcastChannel,
) {
  onMounted(() => {
    target.addEventListener(eventName, handler)
  })
  onUnmounted(() => {
    target.removeEventListener(eventName, handler)
  })
}

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  // onMounted(() => window.addEventListener('mousemove', update))
  // onUnmounted(() => window.removeEventListener('mousemove', update))
  useOn('mousemove', update, window)

  // expose managed state as return value
  return { x, y }
}
