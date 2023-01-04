<!--
 * @Description : 
 * @Date        : 2023-01-05 01:34:31 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-05 01:43:32 +0800
 * @LastEditors : JackChou
-->
<template>
  <p>{{ counter.count }}</p>
</template>

<script setup lang="ts">
import { useCounter } from '@/store'
const counter = useCounter()
</script>

<style scoped lang="scss"></style>
