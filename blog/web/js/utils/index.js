/*
 * @Description: 常用的工具函数
 * @Date: 2021-06-03 11:54:55 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-28 21:09:41 +0800
 * @LastEditors: JackChou
 */
export function copyText(content = '', title = '') {
  // NOTE 使用 input 难以调整复制文本的格式，比如换行
  const textarea = document.createElement('textarea')
  textarea.value = typeof content === 'string' ? content.trim() : ''
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('Copy')
    // NOTE 使用时导入 element-ui Message
    // eslint-disable-next-line no-undef
    Message.success(`复制${title}成功`)
  } catch (error) {
    // eslint-disable-next-line no-undef
    Message.error('复制失败，请重试')
  }
  document.body.removeChild(textarea)
}

export function isElement(obj) {
  try {
    // Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement
  } catch (e) {
    // Browsers not supporting W3 DOM2 don't have HTMLElement and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have (works on IE7)
    return (
      typeof obj === 'object' &&
      obj.nodeType === 1 &&
      typeof obj.style === 'object' &&
      typeof obj.ownerDocument === 'object'
    )
  }
}
