<!-- Meow.story.vue -->
<script setup>
import { ref, reactive } from 'vue'
import JToggle from './JToggle.vue'
const open = ref(true)
</script>

<template>
  <Story title="Form/JToggle">
    <Variant title="基本使用">
      <JToggle />
    </Variant>
    <Variant title="绑定v-model">
      <JToggle v-model="open" />
      <template #controls>
        <HstCheckbox v-model="open" title="open" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
## toggle 切换

微信的切换按钮
</docs>
