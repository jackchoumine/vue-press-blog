<!--
 * @Description : 
 * @Date        : 2023-01-06 22:21:08 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 17:45:22 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <h3>todo list</h3>
    <h6>通过插件导入的全局属性</h6>
    <p>{{ secret }}</p>
    <p>{{ pluginVar }}</p>
    <p>{{ name }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.finished"
          @change="event => change(todo.id, event)" />
        <span class="content" :class="{ finished: todo.finished }">
          {{ todo.content }}
        </span>
      </li>
    </ul>
    <button @click="changeTodos">外部修改todos</button>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { useTodosStore } from '@/stores'

export default defineComponent({
  name: 'TodosDemo',
  setup() {
    const todosStore = useTodosStore()
    // 解构出 actions 非响应式的数据
    const { finish, secret, pluginVar, name } = todosStore

    // NOTE 和 props 一样，直接解构，会失去响应性
    // methods（actions）和 非响应式的数据被忽略
    // 当你只使用 store 的状态而不调用任何 action 时，它会非常有用
    const { todos /* finish */ } = storeToRefs(todosStore)

    // console.log(todos)
    // console.log(finish)
    function change(id, event) {
      finish(id, event.target.checked)
    }
    // BUG 外部可修改 todos
    function changeTodos() {
      console.log(todos)
      todos.value = []
      console.log(todos)
    }
    return { todos, changeTodos, change, secret, pluginVar, name }
  },
})
</script>

<style scoped lang="scss">
ul > li {
  list-style: none;
  display: flex;
}

.content {
  display: inline-block;
  height: 30px;
  width: 120px;
  line-height: 30px;
  margin: 0 10px;
}

.finished {
  color: gray;
  text-decoration: line-through lightcoral;
}
</style>
