<!--
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 11:18:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 11:48:50
 * @Description : 
-->
<script setup lang="ts">
import { useHover } from '@/hooks'

const div1 = ref()
const isHover1 = useHover(div1)
const div2 = ref()
const isHover2 = useHover(div2)
const div3 = ref()
const isHover3 = useHover(div3)
</script>

<template>
  <div class="test-use-hover">
    <div class="items one" ref="div1">{{ isHover1 ? '是' : '否' }}</div>
    <div class="items two" ref="div2">{{ isHover2 ? '是' : '否' }}</div>
    <div class="items three" ref="div3">{{ isHover3 ? '是' : '否' }}</div>
  </div>
</template>

<style lang="scss">
.test-use-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  .items {
    width: 100px;
    height: 100px;
    margin: 0 10px;
    &.one {
      background-color: lightgreen;
    }
    &.two {
      background-color: lightgray;
    }
    &.three {
      background-color: lightyellow;
    }
  }
}
</style>
