<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-30 17:13:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-01-30 17:16:13
 * @Description : 学习 useRequest
-->
<script setup lang="ts">
import { useRequest } from 'vue-hooks-plus'

function getUsername(params: { desc: string }): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`vue-hooks-plus ${params.desc}`)
    }, 1000)
  })
}

const { data, loading } = useRequest(() => getUsername({ desc: 'good' }))
</script>

<template>
  <div class="vue-component">
    <div>name：{{ loading ? 'loading' : data }}</div>
    {{ data }}
  </div>
</template>

<style lang="scss"></style>
