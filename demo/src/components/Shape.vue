<template>
  <!-- Map Example -->
  <gmaps-map :options="mapOptions">
    <gmaps-rectangle :options="rectangleOptions" @bounds_changed="handleRectangleMove" />
    <gmaps-circle :options="circleOptions" @center_changed="handleCircleMove" />
  </gmaps-map>
  <!-- Editable / draggable toggles -->
  <label for="editable">Editable</label>
  <input type="checkbox" id="editable" v-model="editable" @change="handleEditableChange" />
  <label for="draggable">Draggable</label>
  <input type="checkbox" id="draggable" v-model="draggable" @change="handleDraggableChange" />
</template>

<script setup lang="ts">
import { gmapsMap, gmapsCircle, gmapsRectangle } from '../../../src/index'
import { mapOptions } from './helpers'
import { Ref, ref } from 'vue'

const editable = ref(false)
const draggable = ref(true)

const circleOptions: Ref<google.maps.CircleOptions> = ref({
  center: { lat: -28, lng: 125 },
  draggable: draggable,
  editable: editable,
  fillColor: '#0000FF',
  fillOpacity: 0.35,
  radius: 500000,
  strokeColor: '#0000FF',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  zIndex: 1,
})
const rectangleOptions: Ref<google.maps.RectangleOptions> = ref({
  bounds: {
    east: 145,
    north: -20,
    west: 132,
    south: -27,
  },
  draggable: draggable,
  editable: editable,
})

const handleCircleMove = (e: google.maps.LatLngLiteral) => {
  circleOptions.value = { center: e }
}
const handleRectangleMove = (e: google.maps.LatLngBoundsLiteral) => {
  rectangleOptions.value = { bounds: e }
}
const handleEditableChange = () => {
  circleOptions.value = { editable: editable.value }
  rectangleOptions.value = { editable: editable.value }
}
const handleDraggableChange = () => {
  circleOptions.value = { draggable: draggable.value }
  rectangleOptions.value = { draggable: draggable.value }
}
</script>
