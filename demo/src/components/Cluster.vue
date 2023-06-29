<template>
  <wrapper-vue ref="wrapper">
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="mapOptionsBase" @zoom_changed="handleZoomChange">
        <gmaps-cluster :items="items" :options="{ minZoom, maxZoom, highPercentage, lowPercentage }" />
      </gmaps-map>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <p>Markers can also be clustered together on a map using a cluster component.</p>
      <pre>
&lt;gmaps-map&gt;
  &lt;gmaps-cluster
    :items="items"
    :options="{ minZoom, maxZoom, highPercentage, lowPercentage }"
  /&gt;
&lt;/gmaps-map&gt;
      </pre>
    </template>
    <!-- Controls -->
    <template v-slot:controls>
      <div>
        <label class="control-label">Count ({{ count }})</label>
        <input type="range" v-model="count" min="200" max="2000" step="200" @change="handleCountChange" />
      </div>
      <div>
        <label class="control-label">Min Zoom ({{ minZoom }})</label>
        <input type="range" v-model="minZoom" min="0" max="20" @change="handleMinZoomChange" />
      </div>
      <div>
        <label class="control-label">Max Zoom ({{ maxZoom }})</label>
        <input type="range" v-model="maxZoom" min="0" max="20" @change="handleMaxZoomChange" />
      </div>
      <div>
        <label class="control-label">High Percentage ({{ highPercentage }})</label>
        <input type="range" v-model="highPercentage" min="5" max="10" step="1" @change="handleHighPercentageChange" />
      </div>
      <div>
        <label class="control-label">Low Percentage ({{ lowPercentage }})</label>
        <input type="range" v-model="lowPercentage" min="0" max="5" step="1" @change="handleLowPercentageChange" />
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsCluster, GmapsPosition, GmapsClusterItem } from 'v3-gmaps'
import { mapOptionsBase } from './helpers'
import { ref, computed } from 'vue'
import { log } from '../store'

const count = ref(50)
const minZoom = ref(1)
const maxZoom = ref(7)
const highPercentage = ref(10)
const lowPercentage = ref(3)

const items = computed(() => {
  const result: GmapsClusterItem[] = []
  for (let i = 0; i < count.value; i++) {
    const lat: number = Math.random() * 170 - 85
    const lng: number = Math.random() * 360 - 180
    const onClick = (e: GmapsPosition) => log(`Marker at ${e.lat.toFixed(0)}, ${e.lng.toFixed(2)} clicked.`)
    result.push({ lat, lng, onClick })
  }
  return result
})
const handleZoomChange = (e: number | null) => log(`Zoomed to level ${e}`)
const handleCountChange = () => log(`Updated count to ${count.value}`)
const handleMinZoomChange = () => log(`Updated minZoom to ${minZoom.value}`)
const handleMaxZoomChange = () => log(`Updated maxZoom to ${maxZoom.value}`)
const handleHighPercentageChange = () => log(`Updated highPercentage to ${highPercentage.value}`)
const handleLowPercentageChange = () => log(`Updated lowPercentage to ${lowPercentage.value}`)
</script>
