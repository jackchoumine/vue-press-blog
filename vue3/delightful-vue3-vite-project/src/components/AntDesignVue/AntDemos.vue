<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-12 18:41:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-05-06 01:16:50
 * @Description : 
-->
<script setup lang="tsx" name="Demos">
// TODO
import { useEvent, useEventBus } from '@/hooks'

// const { emit } = useEventBus()
const { emit } = useEvent()
onMounted(() => {
  console.log('ant-design-vue mounted')
  emit('ant-btn-mounted', 'ant-design-vue')
})
</script>

<template>
  <div class="vue-component">
    <h2>ant-design-vue</h2>
    <AButton type="primary" shape="round">测试 ant-design-vue 可用性</AButton>
  </div>
</template>

<style lang="scss">
.vue-component {
  // TODO
}
</style>
