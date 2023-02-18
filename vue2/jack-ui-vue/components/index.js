/*
 * @Description :
 * @Date        : 2023-02-18 20:50:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-18 22:44:55 +0800
 * @LastEditors : JackChou
 */
import JButton from './Button'
import JToggle from './Toggle'
// import JTabs, { JTabContent, JTabHeader } from './Tabs'

export { JButton, JToggle }

const components = [JButton, JToggle]

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
    return Vue
  },
}
