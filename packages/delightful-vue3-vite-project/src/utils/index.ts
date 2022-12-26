import { type } from 'os'

export { copyToClipboard, copyText, addWaterMarker } from './tools'
export type { WaterMakerParams } from './tools'
export { default as EventBus } from './EventBus'
export type { Cb, Off } from './EventBus'

export function add(a, b) {
  return a + b
}
