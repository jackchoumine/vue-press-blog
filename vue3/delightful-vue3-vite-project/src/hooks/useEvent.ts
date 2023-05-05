/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-06 01:12:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-05-06 01:16:32
 * @Description :
 */
import mitt from 'mitt'

export function useEvent() {
  const eventBus = mitt()
  onBeforeUnmount(() => {
    eventBus.all.clear()
  })
  return {
    on: eventBus.on,
    emit: eventBus.emit,
    off: eventBus.off,
  }
}
