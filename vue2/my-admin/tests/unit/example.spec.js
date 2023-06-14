/*
 * @Description: 可用性测试
 * @Date: 2021-06-04 21:49:39 +0800
 * @Author: JackChou
 * @LastEditTime: 2023-06-15 02:37:25
 * @LastEditors: JackChou
 */
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@ex/HelloJest'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    // console.log(HelloWorld)
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
