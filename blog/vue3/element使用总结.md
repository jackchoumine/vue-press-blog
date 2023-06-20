# element 组件库使用使用总结

## el-table 如何重置排序

```html{11,13,15,16}
<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus'
import { reactive } from 'vue'

interface User {
  date: string
  name: string
  address: string
}

const defaultSort = reactive({ prop: 'date', order: 'descending' })
function change() {
  esTable.value.clearSort()
  nextTick(() => {
    defaultSort.prop = Math.random() > 0.5 ? 'name' : 'date'
    esTable.value.sort(defaultSort.prop, defaultSort.order)
  })
}
watch(defaultSort, (newVal, oldVal) => {
  console.log(newVal, oldVal, 'zqj log')
})
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address
}

const esTable = ref()
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
  <el-table
    ref="esTable"
    :data="tableData"
    :default-sort="defaultSort"
    style="width: 100%">
    <el-table-column prop="date" label="Date" sortable width="180" />
    <el-table-column prop="name" label="Name" sortable width="180" />
    <el-table-column prop="address" label="Address" sortable :formatter="formatter" />
  </el-table>
  <el-button @click="change">change sort dd</el-button>
</template>
```

提供了`defaultSort`设置默认排序，但是如果需要重置排序，需要使用`clearSort`方法清除原来的排序，然后再调用`sort`方法设置新的排序规则。

> 不是很理解为什么要这样设计，如果只是想要重置排序，直接重置`defaultSort`不就好了吗？
