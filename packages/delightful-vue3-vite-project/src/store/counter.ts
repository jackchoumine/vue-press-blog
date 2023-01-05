/*
 * @Description : count 全局状态
 * @Date        : 2023-01-05 01:26:42 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-05 23:00:11 +0800
 * @LastEditors : JackChou
 */
import { defineStore } from 'pinia'

// 定义并导出容器
// 参数1：容器名字
// 参数2：选项对象
export const useCounter = defineStore('counter', {
  /**
   * 全局状态：使用箭头函数返回
   */
  state: () => {
    return {
      count: 100,
      age: 20,
      books: ['vue', 'react', 'sevlet'],
    }
  },
  getters: {
    booksStr(state) {
      console.log(state.books)
      return this.books.join('--')
    },
  },
  actions: {
    complexChange(step: number) {
      this.age += step
      this.books.push('solidjs', 'lit')
    },
  },
})
