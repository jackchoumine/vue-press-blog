/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-01 10:14:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-01 11:48:41
 * @Description : 函数组件
 */
/*
function FunComponent(props, { attrs, emit, slots, expose }) {
  console.log(props)
  console.log(attrs)
  //   console.log(emit)
  //   console.log(slots)
  console.log(expose)
  console.log('FuncComponent')
  const left = slots?.left?.()
  const _default = slots?.default?.() ?? '函数组件' + (props.name ?? '')
  console.log(left)
  return h(
    'div',
    {
      style: {
        backgroundColor: 'lightgreen',
      },
      onClick: () => {
        emit('my-click', props.name)
      },
      // innerHTML: slots.default?.() ?? '函数组件' + (props.name ?? ''),
    },
    [left, _default]
  )
}
*/

function FunComponent(props, context) {
  console.log(props)
  console.log(context)
  const { slots } = context
  const _default = slots?.default?.() ?? '函数组件' + (props.name ?? '')
  const left = slots?.left?.()
  const children = [left, _default]
  return (
    <div
      style={{ backgroundColor: 'lightgreen' }}
      onClick={() => {
        context.emit('my-click', props?.name)
      }}>
      {children}
    </div>
  )
}

FunComponent.props = ['name']
FunComponent.slots = ['left']
FunComponent.emits = ['my-click']

// const FunComponent = defineComponent({
//   props: {
//     name: String,
//   },
//   render() {
//     // console.log(this.name)
//     // console.log(this.$slots)
//     const _default = this.$slots?.default?.() ?? '函数组件' + (this.name ?? '')
//     const left = this.$slots?.left?.()
//     const children = [left, _default]
//     return (
//       <div
//         style={{ backgroundColor: 'lightgreen' }}
//         onClick={() => {
//           this.$emit('my-click', this.name)
//         }}>
//         {children}
//       </div>
//     )
//   },
// })

export default FunComponent
