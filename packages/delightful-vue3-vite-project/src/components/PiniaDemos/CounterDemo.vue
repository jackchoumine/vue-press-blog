<!--
 * @Description : 
 * @Date        : 2023-01-05 01:34:31 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-05 01:54:53 +0800
 * @LastEditors : JackChou
-->
<template>
  <p>{{ count }}</p>
  <button @click="add">+</button>
</template>

<script setup lang="ts">
import { useCounter } from '@/store'
import { storeToRefs } from 'pinia'
const counter = useCounter()
// NOTE 不要直接解构，会失去响应式
// const { count } = counter
const { count } = storeToRefs(counter)

function add() {
  ++counter.count
}
</script>

<style scoped lang="scss"></style>
