<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 21:08:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-09 02:21:16
 * @Description : geoJson
-->
<script lang="ts" setup>
import L from 'leaflet'
import type { GeoJSON } from 'leaflet'

import { circle, lines, points, polygon } from './data'

const mapContainer = ref()
let map = null
onMounted(() => {
  map = initMap(mapContainer.value)
  drawFeatures(map)
})

function initMap(
  mapContainer: HTMLElement,
  // [纬度 经度]
  coordinates: [number, number] = [26.56, 106.75],
  zoom: number = 11.4
) {
  const map = L.map(mapContainer).setView(coordinates, zoom)
  const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  })
  googleStreets.addTo(map)
  // map.on('click', e => {
  //   console.log(e.latlng)
  // })
  return map
}

function drawFeatures(map) {
  const mapPoints = L.geoJSON(points as GeoJSON.GeoJsonObject, {
    style: feature => {
      console.log(feature)
      return {
        color: 'red', // feature.properties.color,
        weight: feature.properties.weight,
        opacity: feature.properties.opacity,
        fillColor: feature.properties.fillColor,
        fillOpacity: feature.properties.fillOpacity,
      }
    },
  })
  mapPoints.addTo(map)
  const mapLines = L.geoJSON(lines as GeoJSON.GeoJsonObject, {
    // style: feature => {
    //   console.log(feature)
    //   return {
    //     color: 'red', // feature.properties.color,
    //     // weight: feature.properties.weight,
    //     opacity: 0.4,
    //     // fillColor: feature.properties.fillColor,
    //     // fillOpacity: feature.properties.fillOpacity,
    //   }
    // },
    style: {
      stroke: true,
      color: '#f00',
      opacity: 0.4,
    },
  })
  mapLines.addTo(map)
  const mapPolygon = L.geoJSON(polygon as GeoJSON.GeoJsonObject, {
    style: feature => {
      console.log(feature)
      return {
        stroke: false,
        opacity: 0.4, // feature.properties['fill-opacity'],
        fillColor: feature.properties.fill,
        fillOpacity: 0.4, // feature.properties['fill-opacity'],
      }
    },
    onEachFeature: (feature, layer) => {
      console.log('onEachFeature')
      const areaSize = `<span style="color:red;">面积：</span> ${feature.properties.area}`
      layer.bindPopup(areaSize)
      // console.log('feature')
      // console.log(feature)
      // console.log('layer')
      // console.log(layer)
      // layer.on('click', e => {
      //   console.log(e)
      // })
    },
  })
  mapPolygon.addTo(map)
  const mapCircle = L.geoJSON(circle as GeoJSON.GeoJsonObject)
  mapCircle.addTo(map)
  return map
}
</script>

<template>
  <div class="h-full" ref="mapContainer"></div>
</template>

<style scoped lang="scss"></style>
