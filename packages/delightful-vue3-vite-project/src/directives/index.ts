/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 17:59:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-30 17:25:07
 * @Description : 导出全局指令
 */
import type { App } from 'vue'

import auth from './auth'
import clickOutside from './clickOutside'
import copy from './copy'
import title from './title'
import waterMaker from './waterMaker'

const directiveObj = {
  copy,
  clickOutside,
  auth,
  title,
  waterMaker,
}

export default function (app: App<HTMLElement>) {
  Object.keys(directiveObj).forEach(key => {
    app.directive(key, directiveObj[key])
  })
  app.config.globalProperties.testFn = () => {
    console.log('install global properties')
  }
  return app
}
