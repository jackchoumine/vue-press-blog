<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-19 23:50:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-20 00:34:41
 * @Description : 
-->
<script lang="ts" setup>
import { useCartStore } from '@/stores'

const userCart = useCartStore()

const totalPrice = computed(() => {
  return userCart.items.reduce((total, item) => {
    return total + item.price * item.number
  }, 0)
})
</script>

<template>
  <div class="user-cart">
    <h4>购物车</h4>
    <ul>
      <li v-for="(item, index) in userCart.items" :key="index">
        {{ item.name }}--{{ item.price }}￥ --- {{ item.number }}
      </li>
    </ul>
    <div>总共：{{ userCart.totalBooks }}本</div>
    <div>总价：{{ totalPrice }}元</div>
  </div>
</template>

<style scoped lang="scss">
.user-cart {
  // scss code
}
</style>
