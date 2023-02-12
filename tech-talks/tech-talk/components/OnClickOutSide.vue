<!--
 * @Description : 
 * @Date        : 2023-02-07 23:44:48 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-07 23:51:47 +0800
 * @LastEditors : JackChou
-->
<template>
  <p style="background:lightyellow" :ref="whenClickOutside">点到 P 外部了吗？{{ isClickOutside ? '是' : '否' }}</p>
</template>

<script setup>
import { useOnClickOutside } from './hooks'
const { isClickOutside, whenClickOutside } = useOnClickOutside()
</script>
