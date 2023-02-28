<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-05 09:52:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-28 19:52:12
 * @Description : vue 优化技巧 https://learnvue.co/tutorials/v-once-v-memo
-->
<script setup lang="ts">
import { KeepPropStable, TabContainerDemo, VMemo, VOnce } from '@/components'
</script>

<template>
  <div class="page">
    <KeepPropStable />
    <VOnce />
    <VMemo />
    <TabContainerDemo />
  </div>
</template>
