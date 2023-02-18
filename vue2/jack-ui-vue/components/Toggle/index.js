/*
 * @Description : 导出 JToggle
 * @Date        : 2023-02-18 21:35:28 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-18 21:35:37 +0800
 * @LastEditors : JackChou
 */
import JToggle from './JToggle.vue'

JToggle.install = Vue => {
  Vue.component(JToggle.name, JToggle)
  return Vue
}

export default JToggle
