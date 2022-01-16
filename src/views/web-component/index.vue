<!--
 * @Description : 
 * @Date        : 2022-01-16 19:20:31 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-16 19:23:17 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <span class="rating">{{ msg }}</span>
    <my-rating
      ref="myRating"
      :max-value="maxValue"
      :value="value"
      is-show
      :person.prop="{ name: 'jack' }"
      :personArray.prop="persons"
      @ratingChange="ratingChange"
    />
    <ElButton @click="changeRating">修改评价</ElButton>
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
  },
}
</script>

<style></style>
