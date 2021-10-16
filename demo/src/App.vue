<template>
  <div style="width: 90vw; height: 90vh">
    <gmaps-map :options="mapOptions" @zoom_changed="resetZoom">
      <gmaps-marker :options="markerOptions" @position_changed="" />
      <gmaps-circle :options="circleOptions" @position_changed="" />
      <gmaps-rectangle :options="rectangleOptions" @position_changed="" />
    </gmaps-map>
    <button @click="fire1">Fire 1</button>
    <button @click="fire2">Fire 2</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gmapsMap, gmapsMarker, gmapsCircle, gmapsRectangle } from '../../src/index'

const mapOptions = ref({ zoom: 15 })
const markerOptions = ref({ position: { lat: -27.5, lng: 153 }, draggable: true })
const circleOptions = ref({ center: { lat: -27.5, lng: 153 }, radius: 1000, draggable: true })
const rectangleOptions = ref({ bounds: { north: -27.49, south: -27.51, west: 152.99, east: 153.01 }, draggable: true })

const fire1 = () => {
  markerOptions.value.position.lat += -0.02
}
const fire2 = () => {
  mapOptions.value.zoom += -1
}

const resetZoom = (zoom: any) => {
  mapOptions.value.zoom = zoom
}
</script>
