<template>
  <wrapper-vue ref="wrapper">
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="mapOptions">
        <gmaps-rectangle
          :options="rectangleOptions"
          :draggable="draggable"
          :editable="editable"
          @bounds_changed="handleRectangleChange"
          @click="handleRectangleClick"
          @mounted="handleRectangleMounted"
        />
        <gmaps-circle
          :options="circleOptions"
          :draggable="draggable"
          :editable="editable"
          @center_changed="handleCircleChange"
          @radius_changed="handleRadiusChange"
          @click="handleCircleClick"
          @mounted="handleCircleMounted"
        />
      </gmaps-map>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <code>
        &lt;gmaps-rectangle :options="rectangleOptions" :draggable="draggable" :editable="editable"
        @bounds_changed="handleRectangleChange" @click="handleRectangleClick" /&gt;
      </code>
      <code>
        &lt;gmaps-circle :options="circleOptions" :draggable="draggable" :editable="editable"
        @center_changed="handleCircleChange" @click="handleCircleClick" /&gt;
      </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls>
      <div>
        <label class="control-label">Draggable</label>
        <toggle-vue v-model="draggable" />
      </div>
      <div>
        <label class="control-label">Editable</label>
        <toggle-vue v-model="editable" />
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import {
  gmapsMap,
  gmapsCircle,
  gmapsRectangle,
  GmapsBounds,
  GmapsCircleOptions,
  GmapsPosition,
  GmapsRectangleOptions,
} from 'v3-gmaps'
import { mapOptions } from './helpers'
import { Ref, ref, watch } from 'vue'
import { log } from '../store'
import ToggleVue from '../assets/Toggle.vue'

const editable = ref(false)
const draggable = ref(true)

const circleOptions: Ref<GmapsCircleOptions> = ref({
  center: { lat: -28, lng: 125 },
  fillColor: '#0000FF',
  fillOpacity: 0.35,
  radius: 500000,
  strokeColor: '#0000FF',
  strokeOpacity: 0.8,
  strokeWeight: 2,
})
const rectangleOptions: Ref<GmapsRectangleOptions> = ref({
  bounds: {
    east: 145,
    north: -20,
    west: 132,
    south: -27,
  },
})

const handleCircleMounted = (e: google.maps.Circle) => console.log('Circle mounted', e)
const handleRectangleMounted = (e: google.maps.Rectangle) => console.log('Rectangle mounted', e)
const handleCircleChange = (e: GmapsPosition | null) =>
  log(`Circle moved to: ${e?.lat.toFixed(2)}, ${e?.lng.toFixed(2)}`)
const handleRectangleChange = (e: GmapsBounds | null) =>
  log(
    `Rectangle moved to: ${e?.north.toFixed(2)}, ${e?.west.toFixed(2)}, ${e?.south.toFixed(2)}, ${e?.east.toFixed(2)}`
  )
const handleCircleClick = () => log(`Circle clicked`)
const handleRectangleClick = () => log(`Rectangle clicked`)
const handleRadiusChange = (e: number) => log(`Circle radius changed to ${e.toFixed(0)}`)

watch(
  () => draggable.value,
  (v) => log(`Shapes are ${v ? 'now draggable' : 'no longer draggable'}`)
)
watch(
  () => editable.value,
  (v) => log(`Shapes are ${v ? 'now editable' : 'no longer editable'}`)
)
</script>
