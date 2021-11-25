<template>
  <wrapper-vue>
    <!-- Code -->
    <template v-slot:map>
      <div class="inner-wrapper">
        <div class="map-wrapper">
          <h1>Throttle 0 (off)</h1>
          <gmaps-map :options="mapOptions" :throttle="0">
            <gmaps-marker :options="optionsA" @position_changed="handlePositionChanged" />
          </gmaps-map>
        </div>
        <div class="map-wrapper">
          <h1>Throttle 100 (default)</h1>
          <gmaps-map :options="mapOptions" :throttle="100">
            <gmaps-marker :options="optionsA" @position_changed="handlePositionChanged" />
          </gmaps-map>
        </div>
        <div class="map-wrapper">
          <h1>Throttle 500 (500 milliseconds)</h1>
          <gmaps-map :options="mapOptions" :throttle="500">
            <gmaps-marker :options="optionsA" @position_changed="handlePositionChanged" />
          </gmaps-map>
        </div>
      </div>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <p>Google Maps events can be fired off at crazy rates. Throttle makes this sane.</p>
      <p>Move the marker for each different throttle value and see how often the position is updated.</p>
      <code> &lt;gmaps-map :options="mapOptions" :throttle="0" /&gt; </code>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsMarker, GmapsMarkerOptions, GmapsPosition } from 'v3-gmaps'
import { mapOptions } from './helpers'
import { Ref, ref } from 'vue'
import { log } from '../store'

const optionsA: Ref<GmapsMarkerOptions> = ref({
  position: { lat: -25, lng: 130 },
  draggable: true,
})

const handlePositionChanged = (e: GmapsPosition | null | undefined) => {
  if (!e) return
  log(`Marker A position changed`)
}
</script>

<style lang="scss">
.inner-wrapper {
  display: flex;
  flex-flow: wrap;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
  .map-wrapper {
    height: 100%;
    min-height: 300px;
    min-width: 300px;
    position: relative;
    width: 33%;
    h1 {
      background-color: #ffffff88;
      left: 50%;
      padding: 5px 10px;
      pointer-events: none;
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      z-index: 1;
      width: fit-content;
    }
  }
}
</style>
