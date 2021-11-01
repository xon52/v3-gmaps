<template>
  <wrapper-vue ref="wrapper">
    <template v-slot:map>
      <gmaps-map :options="mapOptions" @mounted="handleMapMounted">
        <gmaps-rectangle
          v-bind="rectangle"
          :draggable="draggable"
          :editable="editable"
          @bounds_changed="handleRectangleMove"
        />
        <gmaps-circle v-bind="circle" :draggable="draggable" :editable="editable" @center_changed="handleCircleMove" />
      </gmaps-map>
    </template>
    <template v-slot:controls>
      <div>
        <label for="draggable">Draggable</label>
        <input type="checkbox" id="draggable" v-model="draggable" />
      </div>
      <div>
        <label for="editable">Editable</label>
        <input type="checkbox" id="editable" v-model="editable" />
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsCircle, gmapsRectangle } from '../../../src/index'
import { mapOptions } from './helpers'
import { ref } from 'vue'
import { log, clearLogs } from './store'
import { GmapsBounds, GmapsPosition } from '../../../src/types/types'

const editable = ref(false)
const draggable = ref(true)

const circle = ref({
  center: { lat: -28, lng: 125 },
  fillColor: '#0000FF',
  fillOpacity: 0.35,
  radius: 500000,
  strokeColor: '#0000FF',
  strokeOpacity: 0.8,
  strokeWeight: 2,
})
const rectangle = ref({
  bounds: {
    east: 145,
    north: -20,
    west: 132,
    south: -27,
  },
})

const handleCircleMove = (e: GmapsPosition) => {
  log(`Circle moved to: ${e.lat.toFixed(2)}, ${e.lng.toFixed(2)}`)
}
const handleRectangleMove = (e: GmapsBounds) => {
  log(`Rectangle moved to: ${e.north.toFixed(2)}, ${e.west.toFixed(2)}, ${e.south.toFixed(2)}, ${e.east.toFixed(2)}`)
}
const handleMapMounted = () => {
  clearLogs()
  log(`Shape Example Mounted`)
}
</script>
