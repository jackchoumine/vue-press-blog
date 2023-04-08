<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 21:08:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-08 21:43:05
 * @Description : 初始化地图
-->
<script lang="ts" setup>
import L from 'leaflet'

const mapContainer = ref()

onMounted(() => {
  initMap(mapContainer.value)
})

function initMap(
  mapContainer: HTMLElement,
  coordinates: [number, number] = [51.505, -0.09],
  zoom: number = 13
) {
  const map = L.map(mapContainer).setView(coordinates, zoom)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    // attribution:
    //   '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)

  // const map = L.map('map', {
  //   center: coordinates,
  //   zoom,
  //   layers,
  // })
  return map
}
</script>

<template>
  <div class="h-full" ref="mapContainer"></div>
</template>

<style scoped lang="scss"></style>
