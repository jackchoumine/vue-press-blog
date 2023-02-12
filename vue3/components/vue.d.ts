/*
 * @Description :
 * @Date        : 2023-02-12 19:24:19 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-12 19:24:19 +0800
 * @LastEditors : JackChou
 */
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
