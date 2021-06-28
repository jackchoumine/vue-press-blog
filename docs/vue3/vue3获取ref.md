# vue3 获取 ref

> 获取 组件实例

```html
<template>
  <BasicTable ref="table" />
</template>

<script lang="tsx">
  import { defineComponent, ref, watch } from 'vue'
  import { BasicTable } from '@/components/element/table'

  export default defineComponent({
    name: 'CourseTable',
    components: { BasicTable },
    setup(props) {
      // table.value 通过 value 属性获取组件实例
      // TODO 这里的类型不会提示方法，不知道如何声明才能提示方法
      // 这里的类型是全局声明的，需要导出
      const table = ref<Nullable<ComponentRef>>(null)
      return {
        table,
      }
    },
  })
</script>
```

> 循环获取 DOM

```html
<template>
  <ul>
    <li v-for="item in 2" :key="item" :ref="setLi">{{ item }}</li>
  </ul>
</template>
<script lang="ts">
  import { nextTick, ref } from 'vue'
  export default {
    name: 'Test',
    setup() {
      const myLi = ref<HTMLElement[]>([])
      const setLi = (el: HTMLElement) => {
        // 获取 DOM 属性，出现提示
        console.log(el.textContent)
        myLi.value.push(el)
      }
      nextTick(() => {
        // 一个 proxy
        console.log(myLi.value)
      })
      return { myLi, setLi }
    },
  }
</script>
```
