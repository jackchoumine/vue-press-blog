<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-05 09:52:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-01-05 11:59:22
 * @Description : vue 优化技巧 https://learnvue.co/tutorials/v-once-v-memo
-->
<script setup lang="ts">
import { TabContainerDemo, VMemo, VOnce } from '@/components'
</script>

<template>
  <div class="page">
    <VOnce />
    <VMemo />
    <TabContainerDemo />
  </div>
</template>
