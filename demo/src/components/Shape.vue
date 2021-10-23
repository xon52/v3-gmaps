<template>
  <gmaps-map :options="mapOptions">
    <gmaps-rectangle :options="rectangleOptions" />
    <gmaps-circle :options="circleOptions" @center_changed="handlePosChange" />
  </gmaps-map>
  <button @click="handleFire1">Fire 1</button>
</template>

<script setup lang="ts">
import { gmapsMap, gmapsCircle, gmapsRectangle } from '../../../src/index'
import { mapOptions } from './helpers'
import { Ref, ref } from 'vue'

const editable = ref(false)
const draggable = ref(false)

const circleOptions: Ref<google.maps.CircleOptions> = ref({
  center: { lat: -28, lng: 125 },
  radius: 500000,
  draggable: false,
  strokeColor: '#0000FF',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#0000FF',
  fillOpacity: 0.35,
  zIndex: 1,
})
const rectangleOptions: Ref<google.maps.RectangleOptions> = ref({
  bounds: {
    east: 145,
    north: -20,
    west: 132,
    south: -27,
  },
  draggable: false,
  // editable,
})

const handlePosChange = (e: google.maps.LatLngLiteral) => {
  circleOptions.value = { center: e }
}

const handleFire1 = () => {
  circleOptions.value = { draggable: !circleOptions.value.draggable }
  rectangleOptions.value = { draggable: !rectangleOptions.value.draggable }
}
</script>
