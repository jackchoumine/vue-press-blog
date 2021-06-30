<!--
 * @Description: store 测试页面
 * @Date: 2021-06-30 11:29:14 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-30 15:18:44 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <div>vuex</div>
    <p>{{ $store.state.age }}</p>
    <p>{{ $store.getters.myAge }}</p>
    <button @click="syncChange">同步更改</button>
    <button @click="asyncChange">异步更改</button>
  </div>
</template>

<script>
export default {
  name: 'VuexPage',
  beforeCreate() {
    // 注入自定义属性
    this.$city = '北京'
  },
  methods: {
    syncChange() {
      this.$store.state.age = 100
      // this.$store.commit('syncChangeAge', 100)
    },
    asyncChange() {
      this.$store.dispatch('asyncChangeAge', -10)
    }
  }
}
</script>

<style></style>
