<!--
 * @Description : 
 * @Date        : 2022-01-16 22:01:25 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-16 22:54:49 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <span class="rating">{{ msg }}</span>
    <my-rating
      ref="myRating"
      :max-value="innerMaxValue"
      :value="innerValue"
      is-show
      :person.prop="{ name: 'jack' }"
      :personArray.prop="persons"
      @ratingChange="ratingChange"
    />
    <!-- NOTE 单独设置 默认属性 -->
    <Button :type="type" v-bind="buttonOptions" @click="changeRating">修改评价</Button>
  </div>
</template>

<script>
import { Button } from 'element-ui'
export default {
  name: 'MyVueRating',
  components: {
    Button,
  },
  props: {
    maxValue: {
      type: Number,
      default: 5,
    },
    value: {
      type: Number,
      default: 3,
    },
    type: {
      type: String,
      default: 'primary',
    },
    buttonOptions: {
      type: Object,
      default: () => ({
        size: 'small',
      }),
    },
  },
  data() {
    return {
      msg: 'Hello web components in stencil!',
      innerValue: this.value,
      innerMaxValue: this.maxValue,
      persons: [{ name: 'jack', age: 30 }],
    }
  },
  mounted() {
    const myRatingComponent = this.$refs.myRating // document.querySelector('my-rating') // NOTE 打包后找不到
    setTimeout(() => {
      // myRatingComponent.value = 4;
      myRatingComponent.setAttribute('value', 4)
      console.log('set value')
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
      this.innerValue = Math.floor(Math.random() * this.maxValue)
      this.persons.push({ age: 30 * Math.random() })
    },
    ratingChange({ detail }) {
      console.log('rating changed', detail)
    },
  },
}
</script>

<style>
@import '../../../../node_modules/element-ui/lib/theme-chalk/button.css';
</style>
