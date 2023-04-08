<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 21:53:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-09 00:43:26
 * @Description : 添加标记
 * 标记文档：https://leafletjs.cn/reference.html#marker
 * hover 事件：https://leafletjs.com/reference-1.7.1.html#marker-mouseover
-->
<script lang="ts" setup>
import L from 'leaflet'
import type { LeafletMouseEvent, Marker } from 'leaflet'
import { debounce } from 'lodash-es'

import blackMarkerIcon from './imgs/black_marker.png'
import redMarkerIcon from './imgs/red_marker.png'
import { markerIcon } from './leafletTool'

// 添加谷歌地图
const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
})

const onMoveEnd = (e: LeafletMouseEvent) => {
  console.log('event', e.type)
  console.log('marker.options', e.target.options)
  // const { lat, lng } = e.latlng
  const { lat, lng } = e.target.getLatLng()
  console.log(lat, lng)
}
const moveHandler = debounce(onMoveEnd, 400)
function onMouseOver(e: LeafletMouseEvent) {
  console.log('event', e.type)
  const marker = e.target as Marker
  // console.log(marker)
  const { options } = marker.options.icon
  console.log('iconOptions', options)
  console.log('marker', marker.toGeoJSON())
  marker
    .bindTooltip('我是一个 tooltip', {
      direction: 'top',
      // @ts-ignore
      offset: { x: 0, y: -(options.iconSize[0] + 10) },
    })
    .openTooltip()
    .setIcon(L.icon({ iconUrl: blackMarkerIcon, iconSize: [30, 50] }))
}
function onMouseout(e: LeafletMouseEvent) {
  console.log('event', e.type)
  const marker = e.target
  marker.closeTooltip()
  marker.setIcon(L.icon({ iconUrl: redMarkerIcon, iconSize: [20, 40] }))
}

let map = null
onMounted(() => {
  map = initMap([googleStreets])
  const redMarker = markerIcon()
  redMarker.on('move', moveHandler)
  redMarker.on('moveend', onMoveEnd)
  redMarker.on('mouseover', onMouseOver)
  redMarker.on('mouseout', onMouseout)
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
  // TODO 和下面的代码有什么区别？
  // stadia_AlidadeSmoothDark.addTo(map)
  const map = L.map(mapContainer.value, {
    center: coordinates,
    zoom,
    layers,
  })
  return map
}
</script>

<template>
  <div class="h-full" ref="mapContainer"></div>
</template>
