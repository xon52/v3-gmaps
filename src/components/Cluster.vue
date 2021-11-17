<template>
  <div>
    <template v-for="({ position, items, weight }, key) in clusters">
      <gmaps-marker
        v-if="items.length > 1"
        :key="`c-${key}`"
        :label="{
          text: `${items.length}`,
          fontSize: `20px`,
          color: `#333`,
        }"
        :position="position"
        :icon="{
          path: `M0-31.15c5.58-.17 10.24 4.20 10.41 9.77.12 4.00-2.11 7.51-5.42 9.24L.01-.01C-1.75-3.94-3.35-7.94-4.92-11.95c-3.33-1.56-5.70-4.89-5.82-8.81-.17-5.57 4.21-10.22 9.78-10.39z`,
          scale: 2,
          fillColor: getColor(weight),
          fillOpacity: 0.85,
          strokeColor: `#fff`,
          strokeWeight: 1,
          labelOrigin: { x: 0, y: -21 },
        }"
        @click="zoomToCluster(key)"
      />
      <gmaps-marker
        v-else
        :key="`m-${key}`"
        :position="position"
        :title="items[0].title || items[0].id"
        :visible="items[0].visible"
        :icon="items[0].icon"
        :label="items[0].label"
        @click="handleClick(key)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watch, inject, PropType, onMounted, Ref, ref } from 'vue'
import { GmapsClusterGroup, GmapsClusterItem, GmapsClusterOptions, GmapsPosition } from '../types/types'
import { getBounds, extendBounds, boundsContains, organiseClusters } from '../helpers'
import GmapsMarker from './Marker.vue'
import GmapsClusterMarker from './ClusterMarker.vue'

const defaultOptions: GmapsClusterOptions = {
  minZoom: -1,
  maxZoom: 20,
  tileSize: 0.5,
  highPercentage: 10,
  lowPercentage: 3,
}

export default defineComponent({
  name: 'GmapsCluster',

  components: { GmapsMarker, GmapsClusterMarker },

  props: {
    items: { type: Object as PropType<GmapsClusterItem[]>, required: true },
    options: { type: Object as PropType<GmapsClusterOptions>, default: () => ({}) },
  },

  emits: {
    click: (e: GmapsPosition) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const handleLocalError = (err: Error) => handleError(err, `Cluster`)
    const listeners: google.maps.MapsEventListener[] = []
    let clusterOptions: GmapsClusterOptions = { ...defaultOptions, ...props.options }
    let all: Record<string, GmapsClusterGroup> = {}
    let clusters: Ref<Record<string, GmapsClusterGroup>> = ref({})

    // Methods
    const handleClick = (key: string) => {
      emit('click', clusters.value[key].position)
    }
    const zoomToCluster = (key: string) => {
      const _clusterBounds = getBounds(clusters.value[key].items)
      getMap().fitBounds(_clusterBounds)
      emit('click', clusters.value[key].position)
    }

    const handlePan = () => {
      const bounds = getMap().getBounds()
      if (!bounds) return handleLocalError(new Error('No map bounds.'))
      const _bounds = extendBounds(bounds.toJSON())
      const _filtered: Record<string, GmapsClusterGroup> = {}
      const _rand = Math.floor(Math.random() * 10000)
      for (const [key, value] of Object.entries(all))
        if (boundsContains(_bounds, value.position)) _filtered[`${key}-${_rand}`] = value
      clusters.value = _filtered
    }

    const handleZoom = () => {
      const _zoom = getMap().getZoom()
      all = organiseClusters(
        props.items,
        Math.max(_zoom, clusterOptions.minZoom!),
        clusterOptions.maxZoom!,
        clusterOptions.tileSize!
      )
    }

    const getColor = (weight: number | undefined) => {
      if (weight === undefined) return undefined
      if (!clusterOptions.highPercentage && !clusterOptions.lowPercentage) return undefined
      if (clusterOptions.highPercentage && weight >= clusterOptions.highPercentage) return '#FBB3BD'
      if (clusterOptions.lowPercentage && weight <= clusterOptions.lowPercentage) return '#CCF1FF'
      return '#F1E0B0'
    }

    // On Created
    const map = getMap()
    const api = getAPI()

    // Watchers
    watch(
      () => props.items,
      (v) => {
        handleZoom()
        handlePan()
      },
      { deep: true }
    )
    watch(
      () => props.options,
      (v) => {
        clusterOptions = { ...defaultOptions, ...v }
        handleZoom()
        handlePan()
      },
      { deep: true }
    )

    // Mounted
    onMounted(() => {
      try {
        handleZoom()
        handlePan()
        listeners.push(
          map.addListener('idle', () => handlePan()),
          map.addListener('zoom_changed', () => handleZoom())
        )
      } catch (err) {
        handleLocalError(new Error('There was a problem creating the cluster.'))
      }
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
    })

    // Render (nothing)
    return { clusters, getColor, zoomToCluster, handleClick, size: new google.maps.Size(500, 500) }
  },
})
</script>
