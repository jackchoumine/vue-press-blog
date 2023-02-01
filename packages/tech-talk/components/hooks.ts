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
