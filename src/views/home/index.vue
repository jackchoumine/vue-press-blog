<!--
 * @Description: 首页
 * @Hash: ''
 * @Date: 2021-06-01 14:30:02 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-11-22 00:47:50 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <span class="rating">{{ msg }}</span>
    <my-rating ref="myRating" :max-value="maxValue" :value="value" />
    <ElButton @click="changeRating">修改评价</ElButton>
    <DynamicComponent />
    <el-button type="primary" @click="showConfirm">显示弹窗</el-button>
    <DebounceTest />
    <FormTableTest />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Hello web components in stencil!',
      maxValue: 5,
      value: 2,
    }
  },
  mounted() {
    console.log('Home mounted')
    const myRatingComponent = document.querySelector('my-rating')
    setTimeout(() => {
      // myRatingComponent.value = 4;
      myRatingComponent.setAttribute('value', 4)
      console.log('set value')
      this.maxValue = 10
      myRatingComponent.getValue({ maxValue: 10, value: 5 }).then(value => {
        console.log('get value', value)
      })
      console.log(this.$refs.myRating)
    }, 2000)

    myRatingComponent.addEventListener('ratingChange', ({ detail }) => {
      console.log('rating changed', detail)
      // alert(`rating change ${detail.value}`)
    })
  },
  methods: {
    showConfirm() {
      // TODO如何知道用户点了确定或者取消？
      this.$myConfirm('删除后不能恢复', '确定删除吗？')
    },
    changeRating() {
      this.value = Math.floor(Math.random() * this.maxValue)
    },
  },
}
</script>

<style></style>
