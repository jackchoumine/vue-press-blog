<!--
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 17:59:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 15:27:58
 * @Description : 
-->
<script setup lang="ts" name="HookPage">
import {
  FileViewer,
  HookDemo,
  PopperButton,
  PopperButtonHook,
  MyInput,
  UseHoverDemo,
} from '#c'
const myInput = ref('hello')
</script>

<template>
  <div class="page">
    <HookDemo />
    <MyInput v-model="myInput" />
    <p>{{ myInput }}</p>
    <hr />
    <FileViewer />
    <h4>usePopper -- hook 与第三方库</h4>
    <PopperButtonHook />
    <PopperButton />
  </div>
</template>

<style lang="scss"></style>
