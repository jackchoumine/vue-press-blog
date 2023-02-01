<!--
 * @Description : 
 * @Date        : 2023-02-02 00:20:44 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-02 00:24:11 +0800
 * @LastEditors : JackChou
-->
<script setup>
import { ref } from 'vue'
import MyInput from './MyInput.vue'
const input = ref('')
</script>

<template>
  <div>
    <MyInput v-model="input" />
    <p>{{ input }}</p>
  </div>
</template>
