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

## ele 懒加载的表格，展开懒加载的行后，懒加载部分不更新

解决方案：记录行展开时的调用参数，监听表格更新条件，变化时设置`treeNode.loading`为`true`，在手动调用 load 函数。

```ts
const expandedRows = new Set()
const expandedRowMap = new Map()
// 行展开事件处理器
function onExpandChange(row, expanded) {
  if (expanded) expandedRows.add(row.code)
  else expandedRows.delete(row.code)
}
// 监听表格更新的参数，手动调用加载函数
watch(params, value => {
  expandedRows.forEach(id => {
    const { row, treeNode, resolve } = expandedRowMap.get(id)
    treeNode.loading = true
    loadMore(row, treeNode, resolve)
  })
})

function loadMore(row, treeNode, resolve) {
  // 记录加载函数的参数
  if (!expandedRowMap.get(row.code)) {
    expandedRowMap.set(row.code, { row, treeNode, resolve })
  }
  const obj = {
    area: row.code,
    type: {
      motype: 1,
      sttypes: selectedTypes.value, // ? [selectedTypes.value] : [],
    },
  }
  http('water.all.tree.data', obj).then((res: any) => {
    if (!Array.isArray(res)) {
      resolve([])
      return
    }
    // 9个0 是区县级别
    // 6个0 乡镇
    // 3个0 村级
    const isCounty = res[0].code.includes('000000000')
    if (isCounty) {
      const data = res.map(item => {
        // 区县级，不再向下请求
        return { ...item, hasChild: false }
      })
      resolve(data)
      return
    }
    resolve(res)
  })
}
```

[参考文章](https://blog.csdn.net/qq_43653951/article/details/125180296)
