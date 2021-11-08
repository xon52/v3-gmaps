import { GmapsBounds, GmapsMapOptions, GmapsSymbol } from '../../../src/types/types'

export const mapOptions: GmapsMapOptions = {
  center: { lat: -27, lng: 133 },
  zoom: 4,
  fullscreenControl: false,
  mapTypeControl: false,
  rotateControl: false,
  scaleControl: false,
  streetViewControl: false,
  zoomControl: false,
}

export const ausBounds: GmapsBounds = {
  north: -12,
  east: 155,
  south: -40,
  west: 113,
}

export const icon: GmapsSymbol = {
  path: 'M -2,0 0,-2 2,0 0,2 z',
  strokeColor: '#F00',
  fillColor: '#F00',
  fillOpacity: 1,
}
export const icons = [
  { icon, offset: '0%' },
  { icon, offset: '100%' },
]
