/*
 * @Description :
 * @Date        : 2023-02-18 20:50:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-04-21 19:15:49
 * @LastEditors : ZhouQiJun
 */
import JButton from './Button'
import JToggle from './Toggle'

export { JButton, JToggle }

const components = [JButton, JToggle]

const install = app => {
  components.forEach(component => {
    component.install && app.use(component)
    // 或者
    // app.component(component.name, component)
  })
  return app
}

const jackUI = {
  install,
}

export default jackUI

/**
 * 使用方式
 * 全局引入
 * import jackUI from 'jack-ui'
 * app.use(jackUI)
 * 按需引入
 * import { JButton } from 'jack-ui'
 * app.use(JButton)
 */
