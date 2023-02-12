export type Cb = (payload: any) => void
export type Off = (key: string, cb?: Cb) => void

interface EventBusInterface {
  eventMap: Map<string, Function[]>
  off: Off
  once: Off
}

export default class EventBus implements EventBusInterface {
  eventMap: Map<string, any>
  constructor() {
    this.eventMap = new Map()
  }

  on(key: string, cb: Cb) {
    let handlers = this.eventMap.get(key)
    if (!handlers) {
      handlers = []
    }
    handlers.push(cb)
    this.eventMap.set(key, handlers)
  }

  off(key: string, cb: Cb) {
    const handlers = this.eventMap.get(key)
    if (!handlers) return
    if (cb) {
      const idx = handlers.indexOf(cb)
      idx > -1 && handlers.splice(idx, 1)
      this.eventMap.set(key, handlers)
    } else {
      this.eventMap.delete(key)
    }
  }

  once(key: string, cb: Cb) {
    const handlers = [
      payload => {
        cb(payload)
        this.off(key, undefined)
      },
    ]
    this.eventMap.set(key, handlers)
  }

  emit(key: string, payload: any) {
    const handlers = this.eventMap.get(key)
    if (!Array.isArray(handlers)) return
    handlers.forEach(handler => {
      handler(payload)
    })
  }
}
