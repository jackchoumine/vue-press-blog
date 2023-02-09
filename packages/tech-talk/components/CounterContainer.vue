<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-09 10:14:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-09 10:25:06
 * @Description : renderless 状态逻辑复用
-->
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: ['initCount'],
  setup(props, { slots }) {
    const count = ref(props.initCount)
    function add(step = 1) {
      count.value += step
    }
    function reduce(step = 1) {
      count.value -= step
    }
    return () => slots?.default?.({ count, add, reduce })
  },
})
</script>
