<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:44:23
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-05-15 16:49:42
 * @Description : 
-->
<script lang="ts" setup name="CreateGlobalState">
import { useGlobalCounter } from './store'

const { count } = useGlobalCounter()
</script>

<template>
  <div class="create-global-state">
    <p>count{{ count }}</p>
  </div>
</template>

<style scoped lang="scss">
.create-global-state {
  // scss code
}
</style>
