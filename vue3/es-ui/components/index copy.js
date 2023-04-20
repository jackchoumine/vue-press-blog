/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-20 05:12:44
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-20 05:56:20
 * @Description : 导出所有组件
 */
import Vue from 'vue'
import FormTable from './FormTable'
import SplitPane from './SplitPane'
const components = [FormTable, SplitPane]

components.forEach(component => {
  Vue.component(component.name, component)
})

export { FormTable, SplitPane }
