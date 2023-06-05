<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-05 10:14:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-05 11:10:35
 * @Description : 并发控制-示例一
-->
<script lang="ts" setup>
import { ConcurrencyControl } from '@/utils'

// 生成用于测试的任务集合

const tasks = new Array(10).fill(0).map((v, i) => {
  return function task() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(i + 1)
      }, i * 1000)
    })
  }
})
const concurrencyControl = new ConcurrencyControl({
  callback: res => {
    console.log(res)
  },
})
tasks.forEach(task => {
  concurrencyControl.push(task())
})
// 测试代码
// const sendRequest = concurrencyControl(tasks, 3, taskId => {
//   console.log(`task ${taskId} finish！`)
// })

// sendRequest()
</script>

<template>
  <div class="demo-one">
    <h4>使用 concurrencyControl</h4>
  </div>
</template>

<style scoped lang="scss">
.demo-one {
  // scss code
}
</style>
