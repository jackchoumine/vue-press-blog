<!--
 * @Description : 测试 http 
 * @Date        : 2022-12-16 00:31:13 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-12-16 00:55:33 +0800
 * @LastEditors : JackChou
-->
<script lang="ts" setup>
import http from '@/http'

const todo = shallowReactive({})

type Todo = {
  userId: string
  id: number
  title: string
  completed: boolean
}
onMounted(async () => {
  const [error, todoId120] = await http.get<Todo>(
    'https://jsonplaceholder.typicode.com/todos/120',
    { name: 'to' },
  )
  !error && Object.assign(todo, todoId120)
})
</script>

<template>
  <div class="page">
    <p>{{ todo }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
