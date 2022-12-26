import type { MaybeRef } from '@vueuse/core'
export function useTitle(newTitle?: MaybeRef<string>) {
  const title = ref(newTitle)
  watchEffect(() => {
    const _title = title.value || document.title
    document.title = _title
  })
  return title
}
