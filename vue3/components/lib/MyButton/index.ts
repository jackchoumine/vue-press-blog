/*
 * @Description :
 * @Date        : 2022-12-25 00:54:20 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-12 19:28:08 +0800
 * @LastEditors : JackChou
 */
import type { App } from 'vue'

import MyButton from './MyButton.vue'

MyButton.install = (app: App) => {
  app.component('MyButton', MyButton)
  return app
}
export { MyButton }
export default MyButton
