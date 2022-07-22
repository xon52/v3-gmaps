<template>
  <wrapper-vue ref="wrapper">
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="mapOptions">
        <gmaps-polygon
          :options="polygonOptions"
          :paths="items"
          :editable="editable"
          @paths_changed="handlePathsChanged"
          @mouseup="handleMouseUp"
          @rightclick="handleRightClick"
          @mounted="handleMounted"
        />
      </gmaps-map>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <p>
        Multiple paths inside can be used inside a polygon. Clockwise points will be shaded, while counterclockwise
        points won't be.
      </p>
      <p>Right click on a path point to remove it.</p>
      <code>
        &lt;gmaps-polygon :options="polygonOptions" :paths="items" :editable="editable" @mouseup="handleMouseUp"
        @rightclick="handleRightClick" /&gt;
      </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls>
      <div>
        <label class="control-label">Reset Points</label>
        <button @click="handleReset">Reset</button>
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
import { gmapsMap, gmapsPolygon, GmapsPolygonOptions, GmapsPolyMouseEvent, GmapsPosition } from 'v3-gmaps'
import { mapOptions, icons } from './helpers'
import { Ref, ref, watch } from 'vue'
import { log } from '../store'
import ToggleVue from '../assets/Toggle.vue'

const defaultItems = [
  [
    { lat: -23.53, lng: 114.7 },
    { lat: -10.19, lng: 135.09 },
    { lat: -20.6, lng: 155.66 },
    { lat: -40.08, lng: 145.29 },
    { lat: -38.86, lng: 124.02 },
  ],
  [
    { lat: -28.96, lng: 123.93 },
    { lat: -34.13, lng: 141.86 },
    { lat: -20.27, lng: 141.6 },
    { lat: -20.51, lng: 127.71 },
  ],
  [
    { lat: -26.6, lng: 130.88 },
    { lat: -22.65, lng: 134.14 },
    { lat: -26.01, lng: 137.48 },
  ],
]

const editable = ref(true)
const items: Ref<GmapsPosition[][]> = ref(defaultItems)

const polygonOptions: Ref<GmapsPolygonOptions> = ref({
  icons,
  fillColor: '#0000FF',
  fillOpacity: 0.35,
  strokeColor: '#0000FF',
  strokeOpacity: 0.8,
  strokeWeight: 2,
})

const handleMounted = (e: google.maps.Polygon) => console.log('Polygon mounted', e)
const handleReset = () => (items.value = defaultItems)
const handleMouseUp = (e: GmapsPolyMouseEvent) => {
  if (e.path !== undefined) {
    if (e.edge !== undefined) log(`Edge ${e.edge} on Path ${e.path} moved.`)
    else if (e.vertex !== undefined) log(`Vertex ${e.vertex} on Path ${e.path} moved.`)
    else log(`Path ${e.path} pressed.`)
  }
}
const handleRightClick = (e: GmapsPolyMouseEvent) => {
  if (e.path !== undefined && e.vertex !== undefined) {
    items.value[e.path].splice(e.vertex, 1)
    log(`Vertex ${e.vertex} on Path ${e.path} removed.`)
  }
}
const handlePathsChanged = (e: GmapsPosition[][]) => (items.value = e)

watch(
  () => editable.value,
  (v) => log(`Shapes are ${v ? 'now editable' : 'no longer editable'}`)
)
</script>
