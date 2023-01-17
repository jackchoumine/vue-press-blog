/*
 * @Description :
 * @Date        : 2023-01-07 21:00:16 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 21:07:12 +0800
 * @LastEditors : JackChou
 */
import { mount } from '@vue/test-utils'

import { MyInput } from '../index'

test('MyInput', () => {
  const wrapper = mount(MyInput)
  expect(wrapper.text()).toBe('useVModel')
})
