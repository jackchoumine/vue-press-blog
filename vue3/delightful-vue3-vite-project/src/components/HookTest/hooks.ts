/*
 * @Date        : 2022-11-10 11:44:22
 * @Author      : ZhouQiJun
 * @LastEditors : JackChou
 * @LastEditTime: 2023-02-02 00:12:45 +0800
 * @Description :
 */
import type { Ref } from 'vue'

type MaybeRef<T> = Ref<T> | T

export function useHttpGet(key: MaybeRef<string>) {
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
    { immediate: true }
  )

  return list
}

export function http(key) {
  return new Promise(resolve => {
    setTimeout(() => {
      let list = [{ name: 'http', age: 100 * Math.random() }, { name: 'vue' }]
      key && (list = list.filter(item => item.name.includes(key)))
      resolve(list)
    }, 100)
  })
}

export function useAdd(a: MaybeRef<number>, b: MaybeRef<number>) {
  log()
  return computed(() => unref(a) + unref(b))
}

function log() {
  console.log('useAdd')
}
