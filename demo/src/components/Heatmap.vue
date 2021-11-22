<template>
  <wrapper-vue ref="wrapper">
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="mapOptions">
        <gmaps-heatmap :data="data" :options="{ opacity, radius, dissipating, maxIntensity, gradient }" />
      </gmaps-map>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <p>
        We can create heatmaps that depend on concentrations of points.<br />Each point requires a lat and lng property.
      </p>
      <code>
        &lt;gmaps-heatmap :data="data" :options="{ opacity, radius, dissipating, maxIntensity, gradient }" /&gt;
      </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls>
      <div>
        <label class="control-label">Count ({{ count }})</label>
        <input type="range" v-model="count" min="1" max="200" @change="handleCountChange" />
      </div>
      <div>
        <label class="control-label">Opacity ({{ opacity }})</label>
        <input type="range" v-model="opacity" min="0.2" max="1" step="0.2" @change="handleOpacityChange" />
      </div>
      <div>
        <label class="control-label">Radius ({{ radius }})</label>
        <input type="range" v-model="radius" min="5" max="50" step="5" @change="handleRadiusChange" />
      </div>
      <div>
        <label class="control-label">Max Intensity ({{ maxIntensity }})</label>
        <input type="range" v-model="maxIntensity" min="1" max="10" step="1" @change="handleMaxIntensityChange" />
      </div>
      <div>
        <label class="control-label">Dissipating</label>
        <toggle-vue v-model="dissipating" />
      </div>
      <div>
        <label class="control-label">Gradient</label>
        <toggle-vue v-model="gradientOn" />
      </div>
      <div>
        <label class="control-label">Random Weights</label>
        <toggle-vue v-model="weights" />
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsHeatmap, GmapsWeightedPosition } from '../../../src/index'
import { mapOptions } from './helpers'
import { ref, computed } from 'vue'
import { log } from '../store'
import ToggleVue from '../assets/Toggle.vue'

const count = ref(50)
const opacity = ref(0.8)
const radius = ref(20)
const maxIntensity = ref(1)
const dissipating = ref(true)
const gradientOn = ref(false)
const weights = ref(false)
const colors = ['transparent', '#CC0000', '#FF6600', '#660099']
const gradient = computed(() => (gradientOn.value ? colors : undefined))

const data = computed(() => {
  const result: GmapsWeightedPosition[] = []
  for (let i = 0; i < count.value; i++) {
    const lat: number = Math.random() * 30 - 43
    const lng: number = Math.random() * 40 + 115
    const weight: number | undefined = weights.value ? Math.random() * 5 : 1
    result.push({ lat, lng, weight })
  }
  return result
})
const handleCountChange = () => log(`Updated count to ${count.value}`)
const handleOpacityChange = () => log(`Updated opacity to ${opacity.value}`)
const handleRadiusChange = () => log(`Updated radius to ${radius.value}`)
const handleMaxIntensityChange = () => log(`Updated maxIntensity to ${maxIntensity.value}`)
</script>
