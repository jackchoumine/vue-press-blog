/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-30 17:30:45
 * @LastEditors : JackChou
 * @LastEditTime: 2023-02-12 21:10:13 +0800
 * @Description : 导出全局属性
 */
import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance } from 'vue'

function useGlobalProps() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const globalProps = appContext.config.globalProperties
  return globalProps
}

export default useGlobalProps
