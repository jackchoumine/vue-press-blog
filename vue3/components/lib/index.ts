/*
 * @Description : 导出所有组件
 * @Date        : 2023-02-12 19:25:57 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-12 20:16:43 +0800
 * @LastEditors : JackChou
 */
import type { App } from 'vue'
import { MyButton } from './MyButton'

const components = [MyButton]

export default (app: App) => {
  components.forEach(component => {
    const name = component.name ?? component.__name
    console.log(component)
    app.component(name as string, component)
  })
  return app
}
