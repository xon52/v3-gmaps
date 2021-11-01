<template>
  <wrapper-vue>
    <template v-slot:map>
      <gmaps-map :options="mapOptions" @mounted="handleMapMounted">
        <gmaps-marker
          v-for="v in markers"
          :key="v.id"
          :position="v.position"
          :label="`${label}${v.id}`"
          :title="`${title} ${v.id}`"
          :draggable="draggable"
          @click="() => handleClick(`${title} ${v.id}`)"
        />
      </gmaps-map>
    </template>
    <template v-slot:controls>
      <div>
        <label for="count">Count ({{ count }})</label>
        <input type="range" id="count" v-model="count" min="1" max="200" @change="handleCountChange" />
      </div>
      <div>
        <label for="draggable">Draggable</label>
        <input type="checkbox" id="draggable" v-model="draggable" />
      </div>
      <div>
        <label for="label">Label</label>
        <input type="text" id="label" v-model="label" maxlength="3" style="width: 30px" />
      </div>
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" style="width: 80px" />
      </div>
    </template>
  </wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue'
import { gmapsMap, gmapsMarker } from '../../../src/index'
import { mapOptions } from './helpers'
import { Ref, ref } from 'vue'
import { GmapsPosition } from '../../../src/types/types'
import { clearLogs, log } from './store'

const count = ref(50)
const markers: Ref<{ id: string; position: GmapsPosition }[]> = ref([])
const draggable = ref(true)
const label = ref('M')
const title = ref('Marker')

const generate = async () => {
  markers.value.splice(0, markers.value.length)
  for (let i = 0; i < count.value; i++) {
    const lat: number = Math.random() * 30 - 45
    const lng: number = Math.random() * 40 + 115
    markers.value.push({
      id: `${i}`,
      position: { lat, lng },
    })
  }
}
generate()

const handleMapMounted = () => {
  clearLogs()
  log(`Multiple Marker Example Mounted`)
}
const handleClick = (s: string) => {
  log(`Clicked "${s}"`)
}
const handleCountChange = generate
</script>
