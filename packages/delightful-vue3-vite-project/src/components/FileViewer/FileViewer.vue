<!--
 * @Date        : 2022-08-08 15:45:47
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-01-06 15:24:58
 * @Description : 文件预览
-->
<template>
  <div :style="style">
    <h4>useStorage</h4>
    <p>{{ jack?.name }}</p>
    <p>{{ person?.name }}</p>
    <button @click="remove">删除</button>
    <h4>useWindowResize</h4>
    <p>width:{{ width }}</p>
    <p ref="myP">height:{{ height }}</p>
    <h4>useNetworkStatus,网络在线吗？{{ isOnline ? '在' : '不在' }}</h4>
    <div class="box">box</div>
    <SubComponent />
    <!-- <p :ref="whenClickOutside">点到myP外部了吗？{{ isClickOutside ? '是' : '否' }}</p> -->
    <p>
      <img :src="avatar" />
    </p>
  </div>
</template>

<script lang="ts">
import { useFetch } from '@vueuse/core'

import {
  useLocalStorage,
  useNetworkStatus,
  useOnClickOutsideV2,
  useStorage,
  useTitle,
  useWindowResize,
} from '@/hooks'

const SubComponent = defineComponent({
  template: /* html */ `<div style="background-color:red">单个文中中定义多个组件</div>`,
  // render() {
  //   return <div style={{ backgroundColor: 'red' }}>单个文中中定义多个组件</div>
  // },
})
export default defineComponent({
  name: 'FileViewer',
  components: { SubComponent },
  props: {
    height: {
      type: Number,
      default: 54,
    },
  },
  setup(props) {
    console.log(props.height)
    const { value, remove } = useLocalStorage('jack', JSON.stringify({ name: 'jack' }))
    const { width, height } = useWindowResize()
    const [person, setItem] = useStorage('jack')
    setItem({ name: 'reactive session storage' })
    setTimeout(() => {
      setItem({ name: 'session storage' })
    }, 2000)
    watch(person, value => {
      console.log(value)
    })
    const hello = ref('hello')
    const title = computed(() => {
      return hello.value + Math.random() * 10
    })
    useTitle(title)
    setTimeout(() => {
      hello.value = 'Hello'
    }, 2000)
    const { data } = useFetch('https://api.github.com/users/jackchoumine').json()
    const avatar = computed(() => data.value?.avatar_url)
    // console.log(isRef(title))
    // title.value = '修改hook的返回值'
    // console.log('person: ')
    // console.log(person)
    const pDOM = ref(null)
    // NOTE lifeHook 不能嵌套调用
    // onMounted(() => {
    //   console.log('onMounted 1')
    //   onMounted(() => {
    //     console.log('onMounted 2')
    //   })
    // })
    // const isClickOutside = useOnClickOutside(pDOM, () => {
    //   console.log('click outside')
    // })
    // const { isClickOutside, whenClickOutside } = useOnClickOutsideV2(dom => {
    //   console.log('点击了', dom)
    // })
    watch(width, val => {
      console.log(val)
    })
    const isOnline = useNetworkStatus(isOnline => {
      console.log(isOnline)
    })
    // FIXME
    // NOTE 使用 css 变量的技巧
    const style = computed(() => {
      return { '--div-height': props.height + 'px' }
    })
    return {
      isOnline,
      jack: value,
      remove,
      width,
      // height,
      person,
      myP: pDOM,
      style,
      avatar,
      // whenClickOutside,
      // isClickOutside,
    }
  },
})
export const testNameExport = '从 export default defineComponent 中导出变量'
</script>

<style scoped>
.box {
  height: var(--div-height);
  background-color: #ddd;
}
</style>
