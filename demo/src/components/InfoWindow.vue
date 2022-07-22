<template>
  <wrapper-vue ref="wrapper">
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="mapOptions">
        <gmaps-info-window ref="infoWA" :position="positionA" @closeclick="handleCloseClicked" @mounted="handleMounted">
          <p>Any <span style="background: yellow">HTML</span> can<br />go in <strong>these</strong>.</p>
        </gmaps-info-window>
        <gmaps-info-window
          ref="infoWB"
          :position="positionB"
          style="background: #bbf0ff"
          @closeclick="handleCloseClicked"
          @mounted="handleMounted"
        >
          <p>Even a whole Vue component</p>
          <p>
            <em> (but they're locked in the white Google bubble with a close button) </em>
          </p>
        </gmaps-info-window>
      </gmaps-map>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <p>
        This is a custom component (like an
        <router-link to="/infowindow" class="component-name">InfoWindow</router-link>) but without boarders and close
        button.
      </p>
      <p>Anything can be placed inside and handled like any normal Vue component.</p>
      <code>
        &lt;gmaps-popup :position="{ lat: -25, lng: 125 }" background="#BBF0FF"&gt;<br />
        &nbsp;&nbsp;&lt;p style="margin: 10px; font-size: large"> &#123;{ text }&#125; &lt;/p&gt;<br />
        &lt;/gmaps-popup /&gt;
      </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls>
      <div>
        <button @click="handleReset">Reset</button>
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsInfoWindow } from 'v3-gmaps'
import { mapOptions } from './helpers'
import { log } from '../store'
import { ref } from 'vue'

const positionA = { lat: -21, lng: 130 }
const positionB = { lat: -32, lng: 133 }
const infoWA = ref<InstanceType<typeof gmapsInfoWindow>>()
const infoWB = ref<InstanceType<typeof gmapsInfoWindow>>()

const handleMounted = (e: google.maps.InfoWindow) => console.log('InfoWindow mounted', e)
const handleCloseClicked = () => {
  log('InfoWindow closed')
}
const handleReset = () => {
  if (infoWA.value) infoWA.value.open()
  if (infoWB.value) infoWB.value.open()
  log('Demo reset')
}
</script>
