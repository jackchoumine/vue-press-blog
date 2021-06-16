<!--
 * @Description: 首页
 * @Hash: ''
 * @Date: 2021-06-01 14:30:02 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 20:53:56 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <DynamicComponent />
    <el-button type="primary" @click="showConfirm">显示弹窗</el-button>
    <DebounceTest />
    <FormTableTest />
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    showConfirm() {
      // TODO如何知道用户点了确定或者取消？
      this.$myConfirm('删除后不能恢复', '确定删除吗？')
    },
  },
}
</script>

<style></style>
