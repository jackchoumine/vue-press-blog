/*
 * @Description :
 * @Date        : 2023-01-07 21:09:46 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 21:10:52 +0800
 * @LastEditors : JackChou
 */
import { mount } from '@vue/test-utils'
import MyButton from './MyButton'

test('MyButton', () => {
  const wrapper = mount(MyButton)
  expect(wrapper.text()).toContain('BUTTON')
})
