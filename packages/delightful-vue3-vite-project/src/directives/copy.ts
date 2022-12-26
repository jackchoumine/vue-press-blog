import type { Directive, DirectiveBinding } from 'vue'
import { copyText } from '@/utils'

/**
 * 复制指令
 * // 没提供值，复制 textContent，这里复制 hello
 * <div v-copy>hello</div>
 * // 提供值，复制该值，复制 value 的值
 * <div v-copy="value">hello</div>
 */
const copy: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const { value = '' } = binding
    const text = el.textContent.trim()
    el.dataset.copyData = value || text // 没有值, 复制节点文本
    // @ts-ignore
    el.onClick = function () {
      const data = el.dataset.copyData
      copyText(data)
    }
    // @ts-ignore
    el.addEventListener('click', el.onClick, false)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.dataset.copyData = binding.value
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el.onClick)
  },
}

export default copy
