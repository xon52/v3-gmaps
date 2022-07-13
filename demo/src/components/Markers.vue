<template>
  <wrapper-vue>
    <!-- Code -->
    <template v-slot:map>
      <gmaps-map :options="mapOptions">
        <gmaps-marker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :label="`${label}${marker.id}`"
          :title="`${title} ${marker.id}`"
          :draggable="draggable"
          @click="handleClick(`${title} ${marker.id}`)"
          @dragend="(e) => handleDrag(`${title} ${marker.id}`, e)"
        />
      </gmaps-map>
    </template>
    <!-- Description -->
    <template v-slot:description>
      <code>
        &lt;gmaps-marker v-for="marker in markers" :key="marker.id" :position="marker.position"
        :label="`${label}${marker.id}`" :title="`${title} ${marker.id}`" :draggable="draggable" @click="() =>
        handleClick(`${title} ${marker.id}`)" @dragend="(e) => handleDrag(`${title} ${marker.id}`, e.latLng)" /&gt;
      </code>
    </template>
    <!-- Controls -->
    <template v-slot:controls>
      <div>
        <label class="control-label">Count ({{ count }})</label>
        <input type="range" v-model="count" min="1" max="200" @change="handleCountChange" />
      </div>
      <div>
        <label class="control-label">Draggable</label>
        <toggle-vue v-model="draggable" />
      </div>
      <div>
        <label class="control-label">Label</label>
        <input type="text" v-model="label" maxlength="3" style="width: 30px" />
      </div>
      <div>
        <label class="control-label">Title</label>
        <input type="text" v-model="title" style="width: 80px" />
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsMarker, GmapsPosition } from 'v3-gmaps'
import { mapOptions } from './helpers'
import { Ref, ref, watch } from 'vue'
import { log } from '../store'
import ToggleVue from '../assets/Toggle.vue'

const count = ref(50)
const markers: Ref<{ id: string; position: GmapsPosition }[]> = ref([])
const draggable = ref(true)
const label = ref('M')
const title = ref('Marker')

const generate = async () => {
  markers.value.splice(0, markers.value.length)
  for (let i = 0; i < count.value; i++) {
    const lat: number = Math.random() * 30 - 43
    const lng: number = Math.random() * 40 + 115
    markers.value.push({
      id: `${i}`,
      position: { lat, lng },
    })
  }
}
generate()

const handleClick = (s: string) => {
  log(`Clicked "${s}"`)
}
const handleDrag = (s: string, e: GmapsPosition | null) => {
  if (e) log(`Dragged "${s}" to ${e.lat.toFixed(2)}, ${e.lng.toFixed(2)}`)
}
const handleCountChange = () => {
  generate()
  log(`Updated count to ${count.value}`)
}

watch(
  () => draggable.value,
  (v) => log(`Markers are ${v ? 'now draggable' : 'no longer draggable'}`)
)
watch(
  () => label.value,
  (v) => log(`Marker labels set to "${v}##"`)
)
watch(
  () => title.value,
  (v) => log(`Marker titles set to "${v} ##"`)
)
</script>
