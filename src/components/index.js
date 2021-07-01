/*
 * @Description: 导出全局组件
 * @Date: 2021-06-01 15:13:27 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-01 15:13:47 +0800
 * @LastEditors: JackChou
 */
import Aside from './aside'
const components = [Aside]
const elComponents = {
  install(Vue) {
    try {
      components.forEach(component => {
        if (!component.name) {
          // 跳出 forEach 的技巧
          throw new Error('组件必须提供名字，并且使用大驼峰式命名')
        } else {
          Vue.component(component.name, component)
        }
      })
    } catch (error) {
      console.error(error)
    }
  },
}

export default elComponents
