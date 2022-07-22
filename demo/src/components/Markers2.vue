<template>
  <wrapper-vue>
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="mapOptions" @click="addMarker">
        <gmaps-marker :options="optionsB" @click="handleMarkerBClick" @mounted="handleMarkerBMounted" />
        <gmaps-marker
          v-for="(m, i) in markers"
          :key="i"
          :options="m"
          @click="removeMarker(i)"
          @mounted="handleMarkerMounted"
          @unmounted="handleMarkerUnmounted"
        />
      </gmaps-map>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <ol>
        <li>Click on the flag to increase its opacity</li>
        <li>Click on the map to drop a new marker</li>
        <li>Click on a dropped marker to remove it</li>
      </ol>
      <code> &lt;gmaps-map :options="mapOptions" @click="addMarker"&gt; </code>
      <code> &nbsp;&nbsp;&lt;gmaps-marker :options="optionsB" @click="handleMarkerBClick" /&gt; </code>
      <code>
        &nbsp;&nbsp;&lt;gmaps-marker v-for="(m, i) in markers" :key="i" :options="m" @click="removeMarker(i)" /&gt;
      </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls> </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsMarker, GmapsMarkerOptions, GmapsPosition } from 'v3-gmaps'
import { mapOptions } from './helpers'
import { Ref, ref } from 'vue'
import { log } from '../store'
import MarkerPng from '../assets/marker.png'
import Marker2Png from '../assets/marker2.png'

const optionsB: Ref<GmapsMarkerOptions> = ref({
  position: { lat: -30, lng: 138 },
  icon: Marker2Png,
  title: 'Marker B',
  opacity: 0.7,
})
const markers: Ref<GmapsMarkerOptions[]> = ref([])

const handleMarkerBClick = () => {
  const op = optionsB.value.opacity || 1
  const new_op = Math.round((op > 0.9 ? 0.5 : op + 0.1) * 10) / 10
  log(`Marker B opacity changed to ${new_op}`)
  optionsB.value = { opacity: new_op }
}

const handleMarkerBMounted = (e: google.maps.Marker) => console.log('Marker B Mounted', e)
const handleMarkerMounted = (e: google.maps.Marker) => console.log('Marker mounted', e)
const handleMarkerUnmounted = (e: google.maps.Marker) => console.log('Marker unmounted', e)
const addMarker = (e: GmapsPosition | null) => {
  if (e) markers.value.push({ position: e, animation: 'DROP', icon: MarkerPng })
}
const removeMarker = (index: number) => {
  markers.value.splice(index, 1)
}
</script>
