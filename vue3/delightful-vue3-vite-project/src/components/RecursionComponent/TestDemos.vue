<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-13 09:04:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-20 15:09:03
 * @Description : 
-->
<script setup name="Demos">
import { CircularArc } from '@/components'

import RecursionComponent from './RecursionComponent.vue'

const list = ['Jack', 'John', 'Tom']
const show = ref(true)
</script>

<template>
  <div>
    <h4>递归组件</h4>
    <RecursionComponent :list="list">
      <template #default="{ item }">
        <strong style="color: red; background-color: beige"> {{ item }}</strong>
      </template>
    </RecursionComponent>
    <CircularArc v-if="show" :angle-start="90" :angle-end="360" />
    <button @click="show = !show">切换</button>
  </div>
</template>
