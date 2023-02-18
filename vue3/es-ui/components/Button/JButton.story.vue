<script setup>
import { logEvent } from 'histoire/client'
import JButton from './JButton.vue'
</script>

<template>
  <Story title="Form/JButton">
    <Variant title="基本使用">
      <JButton @click="logEvent('click', $event)">
        <span>按钮</span>
      </JButton>
    </Variant>
  </Story>
</template>

<docs lang="md">
# button 组件
</docs>
