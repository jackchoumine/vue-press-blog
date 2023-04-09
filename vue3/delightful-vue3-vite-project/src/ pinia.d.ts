/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-09 17:01:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-09 17:02:37
 * @Description : pinia 类型追加
 */
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    name: Ref<string>
    secret: string
    pluginVar: string
  }
}
