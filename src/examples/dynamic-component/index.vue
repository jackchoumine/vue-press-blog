<!--
 * @Description: 动态创建组件
 * @Date: 2021-06-02 12:56:00 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-08 19:59:24 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <h2>动态创建组件</h2>
    <el-button type="primary" @click="createButton">点击创建</el-button>
    <MyButton type="success" />
    <div ref="container" class="container"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import MyButton from './MyButton'
export default {
  name: 'DynamicComponent',
  components: { MyButton },
  methods: {
    createButton() {
      // https://www.zhihu.com/column/p/374400464
      const SubVue = Vue.extend(MyButton)
      const MyButtonInstance = new SubVue({
        // el: this.$refs.container,
        propsData: { type: 'success' },
      })
      // MyButtonInstance.$slots.default = [<span>传递vnode</span>, '哈哈哈']
      MyButtonInstance.$scopedSlots = { name: ({ age }) => <span>{age}</span> }
      // MyButtonInstance.$children = [<span>传递vnode</span>, '哈哈哈']
      const res = MyButtonInstance.$mount(this.$refs.container) // this.$refs.container
      console.log(res)
      // TODO 关键
      // 我们可以构造一个方法，方法内部完成组件的创建、挂载，再把方法挂载到 Vue 原型上的，需要动态渲染该组件，就调用该方法
      // 比如 element-ui 的 comfirm alert 都是这个思路
      // this.$refs.container.appendChild(MyButtonInstance.$el)
    },
  },
}
</script>

<style></style>
