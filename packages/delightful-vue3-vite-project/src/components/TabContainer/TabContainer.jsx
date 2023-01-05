/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-05 11:54:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-01-05 11:54:48
 * @Description : tab 组件
 */
import { h, isVNode } from 'vue'
import './TabContainer.scss'

const TabContainer = {
  name: 'TabContainer',
  // emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  // BUG 不会重新执行
  // setup(props, { emit, slots }) {}
  render() {
    const vnodeList = this.$slots.default()
    const childList = []
    let existNonValidSubCom = false
    let i = 0
    do {
      const vnode = vnodeList[i]
      console.log(vnode.type, isVNode(vnode))
      // html tag
      if (typeof vnode.type === 'string') {
        existNonValidSubCom = true
        break
      } else if ([TabHeader, TabContent].includes(vnode.type)) {
        childList.push(vnode)
      }
      // Symbol(Fragment)
      else if (typeof vnode.type === 'symbol' && Array.isArray(vnode.children)) {
        // childList.push(h(vnode.type, null, vnode.children))
        vnode.children.forEach(child => {
          if ([TabHeader, TabContent].includes(child.type)) {
            childList.push(child)
          }
        })
      }
      // Symbol(Comment)
      else if (typeof vnode.type === 'symbol' && typeof vnode.children === 'string') {
        // 跳过
      } else {
        existNonValidSubCom = true
        break
      }
    } while (++i < vnodeList.length && !existNonValidSubCom)
    // console.log(childList)
    // NOTE 如何限制子组件类型?
    // 检查子组件类型
    // const existNonValidSubCom = childList.some(slot => ![TabHeader, TabContent].includes(slot.type))
    if (existNonValidSubCom) {
      const message = 'TabContainer的子组件必须是 TabHeader 和 TabContent'
      // throw new Error(message)
      return h('div', message)
    }
    const TabList = childList.filter(item => item.type === TabHeader)
    const Tabs = TabList.map(Tab =>
      h(Tab, {
        class: {
          tab: true,
          active: Tab.props['tab-id'] === this.modelValue,
        },
        onClick: () => {
          this.$emit('update:modelValue', Tab.props['tab-id'])
        },
      })
    )

    const ContentSlots = childList.filter(item => item.type === TabContent)
    const Content = ContentSlots.find(slot => slot.props['tab-id'] === this.modelValue)
    // debugger
    return [h('div', { class: 'tab-container' }, Tabs), h('div', Content)]
  },
}

export default TabContainer
export const TabHeader = TabItem({ name: 'TabHeader' })
export const TabContent = TabItem({ name: 'TabContent' })

function TabItem(options) {
  return {
    ...options,
    props: {
      tabId: {
        type: String,
        required: true,
      },
    },
    render() {
      return h('div', null, this.$slots.default())
    },
  }
}
