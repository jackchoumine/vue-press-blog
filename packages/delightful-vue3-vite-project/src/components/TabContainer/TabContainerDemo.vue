<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-05 11:57:48
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-01-05 12:24:13
 * @Description : 
-->
<template>
  <h3>renderLess 组合组件 --- 实现 tab-container 组件</h3>
  <TabContainer v-model="activeTab">
    <TabHeader tab-id="1"> tab1 </TabHeader>
    <TabHeader tab-id="2"> tab2 </TabHeader>
    <TabHeader tab-id="3"> tab3 </TabHeader>
    <!-- <div>hello</div> -->
    <!-- 注释 -->
    <TabContent v-for="item in ['1', '2', '3']" :key="item" :tab-id="item">
      content {{ item }}
    </TabContent>
  </TabContainer>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'

import { TabContainer, TabContent, TabHeader } from './index'

export default defineComponent({
  name: 'TabContainerDemo',
  components: {
    TabContent,
    TabContainer,
    TabHeader,
  },
  setup(props, { emit, attrs, slots }) {
    const activeTab = ref('1')
    return { activeTab }
    // NOTE 如何限制子组件类型?
    // 检查子组件类型
    // const existNonValidSubCom = slots.some(slot => ![TabHeader, TabContent].includes(slot.type))
    // console.log(existNonValidSubCom)
    // if (!existNonValidSubCom) {
    //   const message = 'TabContainer的子组件必须是 TabHeader 和 TabContent'
    //   // throw new Error(message)
    //   return h('div', message)
    // }
  },
})
</script>
