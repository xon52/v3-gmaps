<template>
  <div>
    <template v-for="({ position, items, weight }, key) in clusters">
      <gmaps-cluster-marker
        v-if="items.length > 1"
        :key="`c-${key}`"
        :count="items.length"
        :position="position"
        :background="getColor(weight)"
        @click.prevent="handleClick(key)"
      />
      <gmaps-marker
        v-else
        :key="`m-${key}`"
        :position="position"
        :title="items[0].title || items[0].id"
        :visible="items[0].visible"
        :icon="items[0].icon"
        :label="items[0].label"
        @click.prevent="handleClick(key)"
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
  maxZoom: 8,
  tileSize: 0.4, // TODO: Seems to break the click to zoom above this number??
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
      if (!weight) return
      if (!clusterOptions.highPercentage && !clusterOptions.lowPercentage) return
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
    return { clusters, getColor, handleClick }
  },
})
</script>
