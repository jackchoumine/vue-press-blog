<!--
 * @Description: 防抖和节流
 * @Date: 2021-06-03 19:55:14 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-09-23 20:41:17 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <h1>防抖与节流</h1>
    <h2>防抖---合并执行----关注结果</h2>
    <el-button type="primary" @click="debounceClickDelay">延迟执行</el-button>
    <el-button type="primary" @click="debounceClickImmediate">立即执行</el-button>
    <h2>节流---固定频率执行----关注过程变化过程是否平滑</h2>
    <el-button type="primary" @click="throttleClickDelay">延迟执行</el-button>
    <el-button type="primary" @click="throttleClickImmediate">立即执行</el-button>
    <a href="http://demo.nimius.net/debounce_throttle/">该网站可观看目标函数执行频率</a>
    <HelloComponent v-if="show" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { debounce, throttle } from '@/utils'
import AsyncError from './ErrorComponent.vue'
import AsyncLoading from './LoadingComponent.vue'
export default {
  name: 'DebounceTest',
  components: {
    HelloComponent: () => ({
      component: import(/* webpackChunkName: "AsyncComponent" */ './AsyncComponent.vue'),
      loading: AsyncLoading,
      error: AsyncError,
      delay: 4000,
      timeout: 5000,
    }),
  },
  data() {
    return { show: false }
  },
  created() {
    this.debounceClickDelay = debounce(this.myClick, 2000)
    this.debounceClickImmediate = debounce(this.myClick, 2000, true)
    this.throttleClickDelay = throttle(this.myClick, 2000)
    this.throttleClickImmediate = throttle(this.myClick, 2000, true)
  },
  methods: {
    myClick(event) {
      const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
      console.log('目标函数执行了', now)
      this.show = true
    },
  },
}
</script>

<style></style>
