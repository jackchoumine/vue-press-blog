import type { App } from 'vue'
import copy from './copy'
import clickOutside from './clickOutside'
import auth from './auth'
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
  return app
}
