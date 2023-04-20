/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-20 05:08:41
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-20 05:55:19
 * @Description : 以插件形式导出 FormTable 组件
 */
import FormTable from './FormTable'

const install = function (Vue, opts = { titleWidth: 120 }) {
  if (!opts?.titleWidth) opts.titleWidth = 120
  Vue.prototype.$formTableOptions = opts
  Vue.component(FormTable.name, FormTable)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

FormTable.install = install

export default FormTable
