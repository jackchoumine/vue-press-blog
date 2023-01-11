/*
 * @Description : jsx vue 类型声明
 * @Date        : 2023-01-07 00:33:17 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 00:58:50 +0800
 * @LastEditors : JackChou
 * 解决 tsx 编写组件 提示错误，但是不成功
 * https://blog.arrowhitech.com/jsx-the-benefits-of-using-it-with-vue-js/
 */
import type { App, VNode } from 'vue'
// import type { DefineComponent } from 'vue'
// const component: DefineComponent<{}, {}, any>
declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends App {}
    interface ElementAttributesProperty {
      $props: {}
    }
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
