<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 21:08:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-10 00:41:38
 * @Description : 初始化地图
-->
<script lang="ts" setup>
import L from 'leaflet'

import { AntDesignDemos } from '../AntDesignVue'

const mapContainer = ref()
onMounted(() => {
  const map = initMap(mapContainer.value)
  map.on('mousemove', onMouseMove)
})

const GuiYangPosition: [number, number] = [26.55, 106.6]
function initMap(
  mapContainer: HTMLElement,
  coordinates: [number, number] = GuiYangPosition,
  zoom: number = 11
) {
  const map = L.map(mapContainer).setView(coordinates, zoom)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    // attribution:
    //   '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)

  const marker = L.marker([26.55, 106.6]).addTo(map)
  function componentAsContent(VueComponent, props, mountEl = 'div') {
    const container = document.createElement(mountEl)
    return layer => {
      console.log(container)
      console.log(layer)
      return createApp(VueComponent, props).mount(container).$el
    }
  }

  marker
    .bindPopup(componentAsContent(AntDesignDemos, { title: '使用vue组件' }), {
      closeButton: false,
      autoClose: false,
    })
    .openPopup()

  L.circle(GuiYangPosition, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5000,
  }).addTo(map)
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
