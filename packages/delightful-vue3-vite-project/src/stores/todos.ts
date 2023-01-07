/*
 * @Description : 使用组合式 api 定义状态
 * @Date        : 2023-01-06 22:11:03 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 14:19:44 +0800
 * @LastEditors : JackChou
 */
import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', () => {
  const todos = reactive([
    { id: '1', finished: true, content: 'coding' },
    { id: '2', finished: false, content: 'eating' },
  ])
  const finishedTodos = computed(() => {
    console.log('computed')
    return todos.filter(todo => todo.finished).map(todo => todo.content)
  })

  function finish(id: string, isFinished: boolean) {
    const index = todos.findIndex(todo => todo.id === id)
    todos[index].finished = isFinished
  }

  function remove(id) {
    const index = todos.findIndex(todo => todo.id === id)
    todos.splice(index, 1)
  }

  return { todos, finish, remove, finishedTodos }
})
