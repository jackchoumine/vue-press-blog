<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 21:53:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-08 22:13:23
 * @Description : 添加标记
-->
<script lang="ts" setup>
import L from 'leaflet'

import blackMarkerIcon from './imgs/black_marker.png'
import redMarkerIcon from './imgs/red_marker.png'

// 添加瓦片图层
const stadiaAlidadeSmoothDark = L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  {
    maxZoom: 20,
    minZoom: 10,
    // attribution:
    //   '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
)
// NOTE 添加瓦片图层
// 什么是瓦片图层？
// stadia_AlidadeSmoothDark.addTo(map)

// 添加谷歌地图
const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
})

let map = null
onMounted(() => {
  map = initMap([stadiaAlidadeSmoothDark, googleStreets])
  const redMarker = markerIcon()
  const position: [number, number] = [51.505, -0.09]
  const blackMarker = markerIcon(blackMarkerIcon, position, false)
  redMarker.addTo(map)
  blackMarker.addTo(map)
})

const mapContainer = ref()
function initMap(
  layers: L.Layer[],
  coordinates: [number, number] = [51.505, -0.09],
  zoom: number = 13
) {
  const map = L.map(mapContainer.value, {
    center: coordinates,
    zoom,
    layers,
  })
  return map
}

function markerIcon(
  iconUrl = redMarkerIcon,
  coordinates: [number, number] = [51.5, -0.1],
  draggable: boolean = true,
  iconSize: [number, number] = [20, 40]
) {
  // TODO 鼠标hover，图标放大
  const myIcon = L.icon({
    iconUrl,
    // width height
    iconSize,
    iconAnchor: [22, 94],
  })
  const marker = L.marker(coordinates, {
    title: '悬停在标记（marker）上时出现的浏览器 tooltip 提示文本内容',
    alt: '标记（marker）的 alt 属性',
    opacity: 0.8,
    draggable,
    icon: myIcon,
  })
  console.log('marker', marker.toGeoJSON())
  return marker
}
</script>

<template>
  <div class="h-full" ref="mapContainer"></div>
</template>
