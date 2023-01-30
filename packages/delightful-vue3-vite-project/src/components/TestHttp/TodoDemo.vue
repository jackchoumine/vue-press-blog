<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-30 08:49:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-01-30 09:03:32
 * @Description : 测试 http 封装
-->
<script lang="ts" setup>
import http from '@jack/http'

const todo = shallowReactive({})

type Todo = {
  userId: string
  id: number
  title: string
  completed: boolean
}

onBeforeMount(async () => {
  const [error, todoId120] = await http.get<Todo>(
    'https://jsonplaceholder.typicode.com/todos/120',
    { name: 'to' }
  )
  !error && Object.assign(todo, todoId120)
})
</script>

<template>
  <p>{{ todo }}</p>
</template>
