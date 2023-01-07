/*
 * @Description :
 * @Date        : 2023-01-07 20:20:28 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 20:59:23 +0800
 * @LastEditors : JackChou
 */
// import { expect, test } from 'vitest' // NOTE 全局导入 vitest 的函数
import RecursionComponent from '../RecursionComponent.vue'
import { mount } from '@vue/test-utils'

test('第一个测试', () => {
  expect(1 + 1).toBe(2)
})

test('RecursionComponent', () => {
  const wrapper = mount(RecursionComponent)
  console.log(wrapper.text())
})
