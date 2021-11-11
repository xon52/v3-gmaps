<template>
  <wrapper-vue ref="wrapper">
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="mapOptions">
        <gmaps-popup :position="{ lat: -25, lng: 125 }" background="#BBF0FF">
          <p style="margin: 10px; font-size: large">
            {{ text }}
          </p>
        </gmaps-popup>
        <gmaps-popup :position="{ lat: -30, lng: 138 }" height="100px;">
          <button @click="text = 'Aussie Aussie Aussie'">Anything can</button>
          <br />
          <button @click="text = 'Oi Oi Oi'">Go here</button>
        </gmaps-popup>
      </gmaps-map>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <code> &lt;gmaps-popup :position="{ lat: -25, lng: 125 }" background="#BBF0FF" /&gt; </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls></template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsPopup } from '../../../src/index'
import { mapOptions, icons } from './helpers'
import { Ref, ref, watch } from 'vue'
import { log } from '../store'
import { GmapsPosition } from '../../../src/types/types'
import ToggleVue from '../assets/Toggle.vue'

const text = ref('This is just text')
</script>
