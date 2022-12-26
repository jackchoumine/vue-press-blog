import { useOn } from './useOn'

export type VisibilityChange = (hidden: boolean) => void

export function useVisibilityChange(visibilitychange: VisibilityChange) {
  const hidden = ref(document.hidden)
  function change() {
    hidden.value = document.hidden
    visibilitychange?.(document.hidden)
  }
  useOn('visibilitychange', change, document)
  return hidden
}
