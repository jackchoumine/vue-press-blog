<!--
 * @Description : 
 * @Date        : 2023-01-06 22:21:08 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-06 23:03:36 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <h3>todo list</h3>
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
  </div>
</template>

<script lang="ts">
import { useTodosStore } from '@/stores'

export default defineComponent({
  name: 'TodosDemo',
  setup() {
    const { todos, finish } = useTodosStore()
    function change(id, event) {
      finish(id, event.target.checked)
    }
    return { todos, change }
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
