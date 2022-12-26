<template>
  <div>
    <!-- BUG stencil WC 无法响应到变化 -->
    <e-line-chart
      :dimensions.prop="dimensions"
      :source="source"
      :chartTitle.prop="chartTitle"
      :y-name.prop="yName"></e-line-chart>
    <button type="button" @click="changeName">修改参数</button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: String,
})
const myElement = ref(null)
const dimensions = ['product', '2015', '2016', '2017']
const source = [
  { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
  { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
  { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
  { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 },
]
let lineChart = null
const chartTitle = 'lineChart'
const yName = ref('lineChart')
const count = ref(12)
const array = ref([])

function changeName() {
  yName.value = 'Line Chart' + Math.random()
  // console.log(yName.value)
  // lineChart.yName = yName.value
  lineChart.setAttribute('y-name', yName.value)
  lineChart.chartTitle = 'hello world'
  console.log(lineChart)
  lineChart.dimensions = ['product', '2015', '2016']
  count.value = 1000
  array.value = ['lit', 'stencil', 'vue']
  console.log(myElement.value)
}
onMounted(() => {
  lineChart = document.querySelector('line-chart')
})
</script>

<style scoped lang="scss"></style>
