/*
 * @Description : 导出所有组件
 * @Date        : 2023-02-12 19:25:57 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-12 21:13:58 +0800
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

// export default {
//  install(app: App, optipns = {}) {
// NOTE vue3 插件可提供哪些功能？
// 1.  注册全局组件
// app.component('heead-demo',component)
// 2. 注册全局指令
// app.directive(key, dircetive)
// 3. 添加全局自定义属性
// FIXME 如何添加类型？
// app.config.globalProperties.testFn = () => {
//   console.log('install global properties')
// }
// app.config 可配置编译选项，原生tag/web component 全局属性
// 4. 全局依赖注入
// app.provide('key','注入变量')
// 5. 提供全局混入
// app.mixin({
//   data() {
//     return {
//       mixinVar: '混入的变量',
//     }
//   },
// })
//   },
// }
