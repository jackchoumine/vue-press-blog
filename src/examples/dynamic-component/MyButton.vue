<!--
 * @Description: 需要动态创建的组件
 * @Date: 2021-06-02 14:56:17 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-02 17:18:42 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <el-button :type="type" @click="myClick">
      <slot name="name" age="25">按钮</slot>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      name: 'jack',
    }
  },
  methods: {
    myClick() {
      console.log('my-button')
    },
  },
}
</script>

<style></style>
