/*
 * @Description : 使用 Button
 * @Date        : 2022-10-27 00:40:00 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-11-02 15:33:34
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
    console.log('useButton slots')
    console.log(slots)
    const { default: _default, left, right } = slots

    const children = {}
    if (left) Object.assign(children, { left: () => left() })

    if (right) Object.assign(children, { right: () => right() })

    if (_default) Object.assign(children, { right: () => _default() })
    else {
      Object.assign(children, {
        default: () => <span style={{ color: 'red' }}>hello</span>,
      })
    }
    const show = ref(false)
    function clickOutside() {
      console.log('clickOutSide of Button')
    }
    const loading = ref(true)
    setTimeout(() => {
      loading.value = !loading.value
    }, 5000)
    // NOTE 第一种方式
    return () => (
      <div v-loading={loading.value}>
        <h2 v-show={show.value}></h2>
        <Button v-slots={children} v-clickOutside={clickOutside}></Button>
      </div>
    )

    // NOTE 第二种方式
    // return () => <Button>{children}</Button>

    // NOTE 第三种方式
    // return () => (
    //   <Button>
    //     {left ? left() : null}
    //     {_default ? _default() : null}
    //     {right ? right() : null}
    //   </Button>
    // )

    // NOTE 哪种写法更好？
    // v-slots 不是官方支持的用法，推荐使用第二种方式。
  },
})

export default UseButton
