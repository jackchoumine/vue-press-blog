/*
 * @Description: 导出确认组件
 * @Date: 2021-06-03 14:48:15 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-03 17:38:39 +0800
 * @LastEditors: JackChou
 */
import Confirm from './src/Confirm.vue'
import Vue from 'vue'
const ConfirmClass = Vue.extend(Confirm)

let confirmInstance = null

const confirm = (content = '插槽内容', title = '弹窗标题', options = {}) => {
  if (!confirmInstance) {
    confirmInstance = new ConfirmClass({
      el: document.createElement('div'),
      propsData: {
        content: content,
        title,
      },
    })
  }
  // 设置组件 data 为 true，内部 div 渲染
  confirmInstance.show = true
  document.body.appendChild(confirmInstance.$el)
  return confirmInstance
}

export default confirm
