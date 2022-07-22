<template>
  <wrapper-vue>
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="options" @mounted="handleMounted" />
    </template>
    <!-- Description -->
    <template v-slot:description>
      <p>Some Map features are not props, but can be set by giving the options prop a new value.</p>
      <code> &lt;gmaps-map :options="options" /&gt; </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls>
      <div>
        <label class="control-label">Map Controls</label>
        <ul>
          <li>
            <input
              id="fullscreenControl"
              type="checkbox"
              v-model="fullscreenControl"
              @change="handleFullScreenChange"
            />
            <label for="fullscreenControl">Full Screen</label>
          </li>
          <li>
            <input id="zoomControl" type="checkbox" v-model="zoomControl" @change="handleZoomChange" />
            <label for="zoomControl">Zoom</label>
          </li>
          <li>
            <input id="scaleControl" type="checkbox" v-model="scaleControl" @change="handleScaleChange" />
            <label for="scaleControl">Scale</label>
          </li>
          <li>
            <input id="mapTypeControl" type="checkbox" v-model="mapTypeControl" @change="handleMapTypeChange" />
            <label for="mapTypeControl">Map Type</label>
          </li>
        </ul>
      </div>
      <div>
        <label class="control-label">Allow Scrollwheel</label>
        <toggle-vue v-model="scrollwheel" />
      </div>
      <div>
        <label class="control-label">Restrict Boundary</label>
        <toggle-vue v-model="restrict" />
      </div>
      <div>
        <label class="control-label">Min/Max Zoom</label>
        <toggle-vue v-model="minMaxZoom" />
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, GmapsMapOptions } from 'v3-gmaps'
import { mapOptions, ausBounds } from './helpers'
import { Ref, ref, watch } from 'vue'
import { log } from '../store'
import ToggleVue from '../assets/Toggle.vue'

// Data
const options: Ref<GmapsMapOptions> = ref({ ...mapOptions })
const fullscreenControl = ref(mapOptions.fullscreenControl)
const zoomControl = ref(mapOptions.zoomControl)
const scaleControl = ref(mapOptions.scaleControl)
const mapTypeControl = ref(mapOptions.mapTypeControl)
const scrollwheel = ref(true)
const restrict = ref(false)
const minMaxZoom = ref(false)

const handleMounted = (e: google.maps.Map) => console.log('Map mounted', e)
const handleFullScreenChange = (e: Event) => {
  log(`Full screen controls ${(e.target as HTMLInputElement).checked ? 'on' : 'off'}`)
  options.value = { fullscreenControl: (e.target as HTMLInputElement).checked }
}
const handleZoomChange = (e: Event) => {
  log(`Zoom controls ${(e.target as HTMLInputElement).checked ? 'on' : 'off'}`)
  options.value = { zoomControl: (e.target as HTMLInputElement).checked }
}
const handleScaleChange = (e: Event) => {
  log(`Scale controls ${(e.target as HTMLInputElement).checked ? 'on' : 'off'}`)
  options.value = { scaleControl: (e.target as HTMLInputElement).checked }
}
const handleMapTypeChange = (e: Event) => {
  log(`Map type controls ${(e.target as HTMLInputElement).checked ? 'on' : 'off'}`)
  options.value = { mapTypeControl: (e.target as HTMLInputElement).checked }
}
watch(
  () => scrollwheel.value,
  (v) => {
    log(`Scrollwheel ${v ? 'enabled' : 'disabled'}`)
    options.value = { scrollwheel: v }
  }
)
watch(
  () => restrict.value,
  (v) => {
    log(`Bounds ${v ? 'restricted to Australia' : 'unrestricted'}`)
    options.value = { restriction: v ? { latLngBounds: ausBounds, strictBounds: false } : undefined }
  }
)
watch(
  () => minMaxZoom.value,
  (v) => {
    log(`Min zoom ${v ? 'set to 6' : 'unset'}`)
    log(`Max zoom ${v ? 'set to 10' : 'unset'}`)
    options.value = { minZoom: v ? 6 : undefined, maxZoom: v ? 10 : undefined }
  }
)
</script>
