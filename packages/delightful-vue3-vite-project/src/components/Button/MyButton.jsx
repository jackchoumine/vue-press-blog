/*
 * @Description : Button 组件，用于测试在jsx 中使用插槽
 * @Date        : 2022-10-27 00:22:59 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-10-27 00:49:54 +0800
 * @LastEditors : JackChou
 */

const style = {
  width: '200px',
  height: '37px',
}
const Button = defineComponent({
  setup(props, { slots }) {
    console.log('*****slots')
    console.log(slots)
    const { default: _default, left, right } = slots
    return () => (
      <button style={style}>
        {left ? left() : null}
        {_default ? _default() : 'BUTTON'}
        {right ? right() : null}
      </button>
    )
  },
})

export default Button
