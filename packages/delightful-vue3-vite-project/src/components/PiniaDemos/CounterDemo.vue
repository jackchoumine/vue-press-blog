<!--
 * @Description : 
 * @Date        : 2023-01-05 01:34:31 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-05 22:59:02 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <p>{{ count }}</p>
    <p>age:{{ age }}</p>
    <ul>
      <li v-for="book in books" :key="book">{{ book }}</li>
    </ul>
    <p>{{ booksStr }}</p>
    <button @click="add">+</button>
    <hr />
    <button @click="changeMulti">批量修改</button>
    <hr />
    <button @click="changeMulti2">$patch使用接收函数</button>
    <hr />
    <button @click="changeByAaction">action 修改</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@/store'
import { storeToRefs } from 'pinia'
const counter = useCounter()
// NOTE 不要直接解构，会失去响应式
// const { count } = counter
const { count, age, books, booksStr } = storeToRefs(counter)

// NOTE 状态修改
// 方式1：最简单
function add() {
  ++counter.count
}

// 方式2：修改多个数据，使用 $patch 接收函数批量更新
function changeMulti2() {
  counter.$patch(counter => {
    counter.count += 10
    counter.books.push('angular')
  })
}

// 方式3：修改多个数据，使用 $patch 批量修改
function changeMulti() {
  counter.$patch({
    count: counter.count + 1,
    age: counter.age + 10,
  })
}

// 方式4：封装 actions，适合复杂操作
function changeByAaction() {
  counter.complexChange(10)
}
</script>

<style scoped lang="scss"></style>
