/*
 * @Description : 导出组件
 * @Date        : 2023-02-18 20:47:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-18 20:49:32 +0800
 * @LastEditors : JackChou
 */
import JButton from './JButton.vue'

JButton.install = Vue => {
  Vue.component(JButton.name, JButton)
  return Vue
}

export default JButton
