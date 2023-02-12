<!--
 * @Date        : 2022-11-10 11:29:25
 * @Author      : ZhouQiJun
 * @LastEditors : JackChou
 * @LastEditTime: 2023-02-02 00:12:54 +0800
 * @Description : 测试 hook
-->
<template>
  <div>
    <input type="text" v-model="input" placeholder="请输入关键字" />
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHttpGet } from './hooks'
const input = ref('')
const list = useHttpGet(input)
</script>
