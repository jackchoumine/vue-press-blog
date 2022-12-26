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
