<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-13 09:04:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-20 16:02:50
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
    <CircularArc v-if="show" :angle-start="0" :angle-end="360" />
    <CircularArc
      v-if="show"
      :angle-start="0"
      :angle-end="360"
      line-type="line"
      color="green"
      :angle-step="1" />
    <button @click="show = !show">切换</button>
  </div>
</template>
