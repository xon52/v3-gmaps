<template>
  <wrapper-vue>
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map
        :center="center"
        :zoom="zoom"
        :map-type-id="type"
        :options="options"
        @zoom_changed="handleMapZoomChange"
        @center_changed="handleCenterChange"
        @bounds_changed="handleBoundsChange"
        @maptypeid_changed="handleMapTypeChange"
      />
    </template>
    <!-- Description -->
    <template v-slot:description>
      <p>Basic Map using some props and associated events.</p>
      <code>
        &lt;gmaps-map :center="center" :zoom="zoom" :map-type-id="type" :options="options"
        @zoom_changed="handleMapZoomChange" @center_changed="handleCenterChange" @bounds_changed="handleBoundsChange"
        @maptypeid_changed="handleMapTypeChange" /&gt;
      </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls>
      <div>
        <label class="control-label">Center</label>
        <ul>
          <li>Lat: {{ center?.lat.toFixed(2) }}</li>
          <li>Lng: {{ center?.lng.toFixed(2) }}</li>
          <li><button id="fire" @click="handleReset">Reset</button></li>
        </ul>
      </div>
      <div>
        <label class="control-label">Map Type</label>
        <select v-model="type" @change="handleTypeChange">
          <option value="hybrid">Hybrid</option>
          <option value="roadmap">Roadmap</option>
          <option value="satellite">Satellite</option>
          <option value="terrain">Terrain</option>
        </select>
      </div>
      <div>
        <label class="control-label">Zoom ({{ zoom }})</label>
        <input type="range" v-model="zoom" min="0" max="20" @input="handleZoomChange" />
      </div>
      <div>
        <label class="control-label">Bounds</label>
        <ul>
          <li>North: {{ bounds?.north.toFixed(2) }}</li>
          <li>West: {{ bounds?.west.toFixed(2) }}</li>
          <li>South: {{ bounds?.south.toFixed(2) }}</li>
          <li>East: {{ bounds?.east.toFixed(2) }}</li>
        </ul>
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, GmapsBounds, GmapsMapOptions, GmapsMapTypeId, GmapsPosition } from 'v3-gmaps'
import { mapOptions } from './helpers'
import { Ref, ref } from 'vue'
import { log } from '../store'

// Data
const options: Ref<GmapsMapOptions> = ref({ ...mapOptions, mapTypeControl: true })
const zoom = ref(4)
const center: Ref<GmapsPosition | undefined> = ref(mapOptions.center)
const bounds: Ref<GmapsBounds | undefined> = ref()
const type: Ref<GmapsMapTypeId> = ref('roadmap')

const handleBoundsChange = (e: GmapsBounds | null | undefined) => (e ? (bounds.value = e) : null)
const handleZoomChange = () => log(`Zoom set to "${zoom.value}"`)
const handleTypeChange = () => log(`Type set to "${type.value}"`)
const handleCenterChange = (e: GmapsPosition) => {
  if (e) center.value = e
  log(`@center_changed event: "${e.lat.toFixed(2)}, ${e.lng.toFixed(2)}"`)
}
const handleMapTypeChange = (e: GmapsMapTypeId) => {
  if (e) type.value = e
  log(`@map_type_changed event: "${type.value}"`)
}
const handleMapZoomChange = (e: number) => {
  if (e) zoom.value = +e
  log(`@zoom_changed event: "${zoom.value}"`)
}
const handleReset = () => {
  center.value = mapOptions.center
  log(`Center set to "${mapOptions.center?.lat.toFixed(2)}, ${mapOptions.center?.lng.toFixed(2)}"`)
}
</script>
