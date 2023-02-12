/*
 * @Description : 使用 Button
 * @Date        : 2022-10-27 00:40:00 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-30 09:48:57
 * @LastEditors : ZhouQiJun
 */
// import { clickOutside } from '../../plugins/directive'
import Button from './MyButton'

// import {} from 'element-plus/'
const UseButton = defineComponent({
  // directives: {
  //   clickOutside,
  // },
  setup(props, { slots }) {
    const show = ref(false)
    function clickOutside() {
      console.log('clickOutSide of Button')
    }
    const loading = ref(true)
    setTimeout(() => {
      loading.value = !loading.value
    }, 5000)

    console.log('useButton slots')
    console.log(slots)
    const { default: _default, left, right } = slots

    const children = {
      // NOTE 可选链和空值合并结合使用
      default: () => _default?.() ?? <span style={{ color: 'red' }}>hello</span>,
      right: () => right?.(),
      left: () => left?.(),
    }
    // NOTE 第一种方式
    // return () => (
    //   <div v-loading={loading.value}>
    //     <h2 v-show={show.value}></h2>
    //     <Button v-slots={children} v-clickOutside={clickOutside}></Button>
    //   </div>
    // )

    // NOTE 第二种方式
    return () => (
      <div v-loading={loading.value}>
        <h2 v-show={show.value}></h2>
        <Button v-clickOutside={clickOutside}>{children}</Button>
      </div>
    )

    // NOTE 第三种方式
    // return () => (
    //   <Button>
    //     {left ? left() : null}
    //     {_default?.()}
    //     {right?.()}
    //   </Button>
    // )

    // NOTE 哪种写法更好？
    // v-slots 不是官方支持的用法，推荐使用第二种方式。
  },
})

export default UseButton
