<!--
  * @Date        : 2022-08-08 14:23:25
  * @Author      : ZhouQijun
  * @LastEditors : JackChou
  * @LastEditTime: 2023-02-01 21:41:53 +0800
  * @Description : 
-->
<script setup lang="tsx">
import { FunComponent, HelloWorld, SlottedDemo, WatchDemo } from '#c'

import { useGlobalProps } from '@/hooks'
import { USER_KEY } from '@/utils/injectionKey'

// import { FunComponent } from '#c/FunctionalCom'

const SubComponent = defineComponent({
  render() {
    return <div style={{ backgroundColor: 'red' }}>单个文中中定义多个组件</div>
  },
})

const loading = ref(true)
setTimeout(() => {
  loading.value = !loading.value
}, 5000)

const user = inject(USER_KEY)
const helloWorld = ref()
const funComponent = ref()

const { testFn, globalFn } = useGlobalProps()
testFn()
onMounted(() => {
  globalFn('global function in main.js')
  console.log(funComponent.value)
})
setTimeout(() => {
  console.log(helloWorld.value)
  console.log(helloWorld.value.exposeVar)
  console.log(helloWorld.value.count)
  // helloWorld.value.modalIsOpen = true
}, 2000)
function onClick(params) {
  console.log(params)
}
</script>

<template>
  <div class="page" v-water-maker="{ text: '水印' }">
    <h4>全局属性</h4>
    <h3>provide inject</h3>
    <p>userName:{{ user?.name }}</p>
    <hr />
    <SlottedDemo />
    <hr />
    <WatchDemo />
    <hr />
    <HelloWorld ref="helloWorld" />
    <!-- <button @click="toggle">toggle</button> -->
    <!-- <count-to v-if="show" :end-value="endValue" :precision="3" @on-end="updated">
      <span slot="left">工资：</span>
      <span slot="right">$</span>
    </count-to> -->
    <!-- <my-rating :max-value="10" :person="person" :personArray="[person]"></my-rating>
    <button type="button" @click="changePerson">修改person</button> -->
    <SubComponent />
    <hr />
    <FunComponent
      @my-click="onClick"
      ref="funComponent"
      name="函数组件属性"
      title="attrs属性">
      <p>hello-world</p>
      <template #left>
        <p>left</p>
      </template>
    </FunComponent>
  </div>
</template>

<style></style>
