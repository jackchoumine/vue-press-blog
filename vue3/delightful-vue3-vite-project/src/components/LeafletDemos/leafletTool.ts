/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-09 00:08:52
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-09 00:10:17
 * @Description :
 */
import L from 'leaflet'
import type { Marker } from 'leaflet'

import redMarkerIcon from './imgs/red_marker.png'

export function markerIcon(
  iconUrl = redMarkerIcon,
  coordinates: [number, number] = [51.5, -0.1],
  draggable: boolean = true,
  iconSize: [number, number] = [20, 40]
): Marker {
  const myIcon = L.icon({
    iconUrl,
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
