/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-30 17:30:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-30 17:51:49
 * @Description : 导出全局属性
 */
import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance } from 'vue'

function useGlobalProps() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const globalProps = appContext.config.globalProperties
  return { ...globalProps }
}

export default useGlobalProps
