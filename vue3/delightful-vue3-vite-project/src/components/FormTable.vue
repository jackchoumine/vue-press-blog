<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-08 14:56:58
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-08 16:55:28
 * @Description : 表单式表格
-->
<script setup lang="ts">
type Col = {
  label: string
  prop: string
  span?: number
}

type Props = {
  colList: Col[]
  data: Recordable<unknown>
  // 一行有几个 label value 对
  labelPreRow?: number
}
const props = withDefaults(defineProps<Props>(), {
  colList: () => [
    // { label: '告警站点总数', prop: 'alarmTotal' },
    // { label: '超设计水位站点', prop: 'beyondDesignedWaterHeight' },
    // { label: '超历史最高站点', prop: 'beyondHistoryMaxHeight' },
    // { label: '超汛限水位站点', prop: 'beyondLimitWaterHeight' },
    // { label: '超正常水位站点', prop: 'beyondNormalWaterHeight', span: 2 },
  ],
  data: () => ({
    // alarmTotal: 10,
    // beyondDesignedWaterHeight: 3,
    // beyondHistoryMaxHeight: 8,
    // beyondLimitWaterHeight: 15,
    // beyondNormalWaterHeight: 17,
  }),
  labelPreRow: 2,
})

function calcWith(item: Col, index: number) {
  const percent = ((item.span || 1) / props.labelPreRow) * 100 + '%'
  return `calc(${percent} - 4px)`
}
</script>

<template>
  <div class="component form-table">
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in colList"
        :key="index"
        :style="{
          width: calcWith(item, index),
        }">
        <span>{{ item.label }}:</span>
        <span>{{ data[item.prop] }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.component.form-table {
  width: 100%;
  background-color: #fff;

  div,
  ul,
  li {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .item {
      display: flex;
      flex-wrap: wrap;
      height: 36px;
      margin: 5px 0;
      font-size: 16px;
      line-height: 36px;
      text-indent: 8px;
      color: #3b4252;
      background-color: #eee;
      list-style-type: none;
      border-radius: 2px;

      &:nth-child(2n) {
        margin-left: 2px;
      }

      &:nth-child(n) {
        margin-right: 2px;
      }
    }
  }
}
</style>
