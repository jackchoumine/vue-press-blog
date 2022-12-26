<script setup lang="ts" name="HookPage">
import { FileViewer, HookDemo, PopperButton, PopperButtonHook, MyInput } from '#c'
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
