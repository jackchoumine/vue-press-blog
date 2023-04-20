/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-20 05:13:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-20 05:42:14
 * @Description : 工具函数
 */
export function copyText(content = '', title = '') {
  // NOTE 使用 input 难以调整复制文本的格式，比如换行
  const textarea = document.createElement('textarea')
  textarea.value = typeof content === 'string' ? content.trim() : ''
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('Copy')
    // Message.success(`复制${title}成功`)
    alert(`复制${title}成功`)
  } catch (error) {
    alert('复制失败，请重试')
    // Message.error('复制失败，请重试')
  }
  document.body.removeChild(textarea)
}
