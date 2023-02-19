<script setup>
import { ref } from 'vue'
import MyInput from './MyInput.vue'
const myInput = ref('我的输入')
const title = ref('title')
</script>

<template>
  <Story title="Form/MyInput">
    <Variant title="基本使用">
      <MyInput v-model="myInput" v-model:title="title" />
      <template #controls>
        <HstText v-model="title" title="title" />
        <HstText v-model="myInput" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# my-HstText 组件
</docs>
