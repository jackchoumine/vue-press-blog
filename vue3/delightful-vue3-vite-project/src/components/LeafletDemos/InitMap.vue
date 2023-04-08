<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 21:08:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-09 02:51:39
 * @Description : 初始化地图
-->
<script lang="ts" setup>
import L from 'leaflet'

const mapContainer = ref()
onMounted(() => {
  const map = initMap(mapContainer.value)
  map.on('mousemove', onMouseMove)
})

function initMap(
  mapContainer: HTMLElement,
  coordinates: [number, number] = [26.55, 106.6],
  zoom: number = 11
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

const coordinates = reactive({
  lat: undefined,
  lng: undefined,
})
function onMouseMove(e: L.LeafletMouseEvent) {
  const { lat, lng } = e.latlng
  coordinates.lat = lat.toFixed(4)
  coordinates.lng = lng.toFixed(4)
}
</script>

<template>
  <div class="h-full" ref="mapContainer">
    <span class="coordinates">
      纬度:{{ coordinates.lat }}，经度:{{ coordinates.lng }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.coordinates {
  position: absolute;
  bottom: 10px;
  left: calc(50%);
  z-index: 401;
}
</style>
