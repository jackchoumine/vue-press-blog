import L from 'leaflet'

var map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

const marker = L.marker([51.5, -0.09]).addTo(map) // .bindPopup('这是一个标记').openPopup()

marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup()

var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map)
console.log(circle)
circle.bindPopup('I am a circle.')

var polygon = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047],
]).addTo(map)
console.log(polygon)
polygon.bindPopup('I am a polygon.')

// NOTE 一个单独的 popup
var popup = L.popup().setLatLng([51.513, -0.09]).setContent('I am a standalone popup.').openOn(map)
