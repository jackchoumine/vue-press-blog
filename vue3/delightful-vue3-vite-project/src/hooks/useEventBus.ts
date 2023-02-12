import { EventBus } from '@/utils'
import type { Cb } from '@/utils'

const bus = new EventBus()

export function useEventBus() {
  const instance = {
    eventMap: new Map(),
    on: bus.on,
    once: bus.once,
    off: bus.off,
    clear() {
      this.eventMap.forEach((list, key) => {
        list.forEach(cb => {
          bus.off(key, cb)
        })
      })
      eventMap.clear()
    },
  }
  const eventMap = new Map()
  function on(key: string, cd: Cb) {
    instance.on(key, cd)
    bus.on(key, cd)
  }
  function once(key: string, cd: Cb) {
    instance.once(key, cd)
    bus.once(key, cd)
  }
  onBeforeUnmount(() => {
    instance.clear()
  })
  return {
    on,
    once,
    off: bus.off.bind(bus),
    emit: bus.off.bind(bus),
  }
}
