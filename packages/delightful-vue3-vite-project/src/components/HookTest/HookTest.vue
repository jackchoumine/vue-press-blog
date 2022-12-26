<!--
 * @Date        : 2022-11-10 11:29:25
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-11-11 09:41:08
 * @Description : 测试 hook
-->
<template>
  <div>
    <h4>useAdd</h4>
    <p>c:{{ c }}</p>
    <button type="button" @click="b = 100">修改b</button>
    <hr />
    <h4>useHttpGet</h4>
    <input type="text" v-model="input" />
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item.name }}</li>
    </ul>
    <p>{{ input }}</p>
    <h4>购物车</h4>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <button @click="() => removeCart(item.id)">-</button> {{ item.name }} --
        {{ item.number }}
        <button @click="() => addCart(item)">+</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useHttpGet, useAdd } from './hooks'
import useCart from './useCart'
import './testUseAdd'
export default {
  setup() {
    const input = ref('')
    const { list } = useHttpGet(input)
    const a = 1
    const b = ref(10)
    const c = useAdd(a, b)
    const { items, removeCart, addCart } = useCart()
    return { b, c, list, input, items, removeCart, addCart }
  },
}
</script>

<style lang="scss"></style>
