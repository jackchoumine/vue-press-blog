<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 23:46:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-09 02:28:45
 * @Description : 图层控制
-->
<script lang="ts" setup>
import L from 'leaflet'

import blackMarkerIcon from './imgs/black_marker.png'
import { markerIcon } from './leafletTool'

const USImageryUrl =
  'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}'
// eslint-disable-next-line camelcase
const USGS_USImagery = L.tileLayer(USImageryUrl)

const stadiaAlidadeSmoothDark = L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
)

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
const baseLayers = {
  streetMap: osm,
  dark: stadiaAlidadeSmoothDark,
}

// NOTE WMS 是什么数据格式
// WKT 是什么数据格式
const nexrad = L.tileLayer.wms(
  'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
  {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: 'Weather data © 2012 IEM Nexrad',
  }
)

const cities = makerCitiesLayer()

const parks = makerParks()
const myMarkers = makerMarkers()
const overlayLayers = {
  cities,
  parks,
}

let map = null
const mapContainer = ref()
onMounted(initMap)

function makerCitiesLayer() {
  const cities = L.layerGroup()
  // const mLittleton =
  L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities)
  // const mDenver =
  L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities)
  // const mAurora =
  L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities)
  // const mGolden =
  L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities)
  return cities
}

function makerMarkers() {
  const redMarker = markerIcon(undefined, [39.64, -105.02])
  const blackMarker = markerIcon(blackMarkerIcon, [39.6, -105.0])
  const myMarkers = L.layerGroup([redMarker, blackMarker])
  return myMarkers
}

function makerParks() {
  const crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.')
  const rubyHill = L.marker([39.68, -105.0]).bindPopup('This is Ruby Hill Park.')
  const parks = L.layerGroup([crownHill, rubyHill])
  return parks
}

function initMap() {
  map = L.map(mapContainer.value, {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [baseLayers.dark, overlayLayers.parks, overlayLayers.cities],
  })

  const layerControl = L.control.layers(baseLayers, overlayLayers, {
    collapsed: false,
  })

  layerControl.addTo(map)
  // 动态地添加或删除基础层或覆盖层
  // TODO 如何设置默认的图层
  // layerControl.removeLayer(osm)
  layerControl.addBaseLayer(USGS_USImagery, 'USImageryOnly')
  layerControl.addOverlay(myMarkers, 'myMarkers')
  layerControl.addOverlay(nexrad, 'nexrad')
}
</script>

<template>
  <div class="h-full" ref="mapContainer"></div>
</template>
