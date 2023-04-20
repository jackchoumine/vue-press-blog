/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-20 05:47:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-20 05:55:54
 * @Description : 导出SplitPane组件
 */

import SplitPane from './SplitPane'

const install = function (Vue) {
  Vue.component(SplitPane.name, SplitPane)
}

SplitPane.install = install

export default SplitPane
