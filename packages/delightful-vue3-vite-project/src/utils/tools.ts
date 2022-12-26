import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

export function copyToClipboard(text) {
  const input = document.createElement('input')
  input.setAttribute('value', text)
  document.body.appendChild(input)
  input.select()
  const result = document.execCommand('copy')
  document.body.removeChild(input)
  return result
}

export function copyText(
  data = '',
  success = () => ElMessage.success('复制成功'),
  fail = () => ElMessage.error('复制失败'),
) {
  const clipboard = navigator.clipboard
  if (clipboard) {
    clipboard.writeText(data).then(success).catch(fail)
    return true
  }
  // NOTE 使用 input 难以调整复制文本的格式，比如换行
  const textarea = document.createElement('textarea')
  textarea.value = typeof data === 'string' ? data.trim() : ''
  document.body.appendChild(textarea)
  textarea.select()
  let result = false
  try {
    result = document.execCommand('Copy')
    success()
  } catch (error) {
    fail()
  }
  document.body.removeChild(textarea)
  return result
}

export type WaterMakerParams = {
  text: string
  node: HTMLElement
  font?: string
  textColor?: string
}
/**
 * 生成水印
 * @param text 水印文字
 * @param node 添加水印的节点
 * @param font 文字大小和字体
 * @param textColor 文字颜色
 */
export function addWaterMarker({
  text,
  node,
  font = '16px Microsoft JhengHei',
  textColor = 'rgba(180, 180, 180, 0.5)',
}: WaterMakerParams) {
  // 水印文字，父元素，字体，文字颜色
  const can: HTMLCanvasElement = document.createElement('canvas')
  node.appendChild(can)
  can.width = 205
  can.height = 140
  can.style.display = 'none'
  const cans = can.getContext('2d') as CanvasRenderingContext2D
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font
  cans.fillStyle = textColor
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle' as CanvasTextBaseline
  cans.fillText(text, can.width / 10, can.height / 2)
  node.style.backgroundImage = `url(${can.toDataURL('image/png')})`
}
