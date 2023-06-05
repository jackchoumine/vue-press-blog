/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-13 09:04:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-05 10:19:09
 * @Description : 导出工具函数
 */
export type { Cb, Off } from './EventBus'

export { copyToClipboard, copyText, addWaterMarker } from './tools'
export type { WaterMakerParams } from './tools'
export { default as EventBus } from './EventBus'

export function add(a, b) {
  return a + b
}
export * from './utils'
