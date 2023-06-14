<!--
 * @Description : 
 * @Date        : 2022-01-16 19:20:31 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-10-15 18:01:42 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <MyRating />
    <MyVueName />
    <hr />
    <h2>测试全局指令</h2>
    <Button v-auth:disabled="'li'" type="primary">无权限时禁用按钮</Button>
    <!-- 无权限时删除按钮 -->
    <Button v-auth="'li'" type="button">无权限时禁用按钮</Button>
    <br />
    <h3>测试 v-click-outside</h3>
    <div v-click-outside="onClickOutside">
      <p>测试点击外部</p>
      <p>测试点击外部</p>
      <p>测试点击外部</p>
      <p>测试点击外部</p>
    </div>
  </div>
</template>

<script>
import { Button } from 'element-ui'
import { MyRating, MyVueName } from './components'
export default {
  name: 'WebComponent',
  components: {
    MyRating,
    MyVueName,
    Button,
  },
  data() {
    return {
      msg: 'Hello web components in stencil!',
      maxValue: 5,
      value: 2,
      persons: [{ name: 'jack', age: 30 }],
    }
  },
  mounted() {
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
    // myRatingComponent.addEventListener('ratingChange', ({ detail }) => {
    //   console.log('rating changed', detail)
    //   // alert(`rating change ${detail.value}`)
    // })
  },
  methods: {
    changeRating() {
      this.value = Math.floor(Math.random() * this.maxValue)
      this.persons.push({ age: 30 * Math.random() })
    },
    ratingChange({ detail }) {
      console.log('rating changed', detail)
    },
    onClickOutside() {
      console.log('onClickOutside')
      console.log(this.msg)
    },
  },
}
</script>

<style></style>
