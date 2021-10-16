<template>
  <div style="width: 100%; height: 100%">
    <!-- Error -->
    <v3-g-map-error v-if="error">{{ error }}</v3-g-map-error>
    <!-- Loading -->
    <v3-g-map-spinner v-else-if="!api" />
    <!-- Map -->
    <div v-show="!!api" ref="mapEl" style="width: 100%; height: 100%"></div>
    <!-- Components -->
    <template v-if="map">
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts">
import V3GMapError from './V3GMapError.vue'
import V3GMapSpinner from './V3GMapSpinner.vue'
import { throttle as throttleTool } from '../tools'
import { Ref, defineComponent, onBeforeUnmount, provide, onMounted, ref, watch, toRefs, PropType } from 'vue'
import { getGoogleAPI } from '../api'

const defaultOptions = {
  center: { lat: -27.5, lng: 153 },
  zoom: 12,
}

export default defineComponent({
  name: 'VGMap',
  components: { V3GMapSpinner, V3GMapError },
  props: {
    throttle: { type: [Number, String], default: 200 },
    options: { type: Object as PropType<google.maps.MapOptions>, default: () => ({}) },
  },

  emits: {
    // https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events
    bounds_changed: (e: google.maps.LatLngBounds | null | undefined) => true,
    center_changed: (e: google.maps.LatLng) => true,
    click: (e: google.maps.LatLngLiteral) => true,
    contextmenu: (e: google.maps.LatLngLiteral) => true,
    dblclick: (e: google.maps.LatLngLiteral) => true,
    drag: () => true,
    dragend: () => true,
    dragstart: () => true,
    heading_changed: (e: number) => true,
    idle: () => true,
    maptypeid_changed: (e: google.maps.MapTypeId) => true,
    mousemove: (e: google.maps.LatLngLiteral) => true,
    mouseout: (e: google.maps.LatLngLiteral) => true,
    mouseover: (e: google.maps.LatLngLiteral) => true,
    projection_changed: (e: google.maps.Projection | null) => true,
    rightclick: (e: google.maps.LatLngLiteral) => true,
    tilesloaded: () => true,
    tilt_changed: (e: Number) => true,
    zoom_changed: (e: Number) => true,
    mounted: null,
  },

  setup(props, { emit }) {
    // Data
    const map: Ref<google.maps.Map | null> = ref(null)
    const listeners: google.maps.MapsEventListener[] = []
    const mapEl = ref()
    const error: Ref<string | null> = ref(null)
    const api: Ref<typeof google.maps | undefined> = ref()
    const { options, throttle } = toRefs(props)

    // Options
    watch(
      () => props.options,
      (newVal) => {
        if (map.value)
          map.value.setOptions({
            ...defaultOptions,
            ...newVal,
          })
      },
      { deep: true }
    )

    // Set Listeners
    const setListeners = (t: google.maps.Map) => {
      const d = throttle ? +throttle.value : undefined
      const ge = google.maps.event
      listeners.push(
        // TODO: Check debounce works
        // Throttled
        ge.addListener(
          t,
          'bounds_changed',
          throttleTool(() => emit('bounds_changed', t.getBounds()), d)
        ),
        ge.addListener(
          t,
          'center_changed',
          throttleTool(() => emit('center_changed', t.getCenter()), d)
        ),
        ge.addListener(
          t,
          'drag',
          throttleTool(() => emit('drag'), d)
        ),
        ge.addListener(
          t,
          'mousemove',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mousemove', e.latLng.toJSON()), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) => emit('click', e.latLng.toJSON())),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) => emit('contextmenu', e.latLng.toJSON())),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng.toJSON())),
        // NOTE: dragend and dragstart do not return a mouse event
        ge.addListener(t, 'dragend', () => emit('dragend')),
        ge.addListener(t, 'dragstart', () => emit('dragstart')),
        ge.addListener(t, 'heading_changed', () => emit('heading_changed', t.getHeading())),
        ge.addListener(t, 'idle', () => emit('idle')),
        ge.addListener(t, 'maptypeid_changed', () => emit('maptypeid_changed', t.getMapTypeId())),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e.latLng.toJSON())),
        ge.addListener(t, 'mouseover', (e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng.toJSON())),
        ge.addListener(t, 'projection_changed', () => emit('projection_changed', t.getProjection())),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) => emit('rightclick', e.latLng.toJSON())),
        ge.addListener(t, 'tilesloaded', () => emit('tilesloaded')),
        ge.addListener(t, 'tilt_changed', () => emit('tilt_changed', t.getTilt())),
        ge.addListener(t, 'zoom_changed', () => emit('zoom_changed', t.getZoom()))
      )
    }

    // Methods
    const handleError = (e: Error, s: string) => (error.value = `[${s}]: ${e.message}`)
    const getAPI = () => {
      if (!api.value) throw new Error('vue3-gmaps :: getAPI() called before API loaded.')
      return api.value
    }
    const getMap = () => {
      if (!map.value) throw new Error('vue3-gmaps :: getMap() called before map loaded.')
      return map.value
    }

    // Provides
    provide('$getAPI', getAPI)
    provide('$getMap', getMap)
    provide('$handleError', handleError)

    // Mounted
    onMounted(() => {
      getGoogleAPI()
        .then((googleApi) => {
          api.value = googleApi
          map.value = new googleApi.Map(mapEl.value, {
            ...defaultOptions,
            ...props.options,
          })
          if (map.value) setListeners(map.value)
          emit('mounted', map.value)
        })
        .catch((e) => handleError(e, 'Map'))
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      // TODO: Check this clears all listeners
      map ? window.google.maps.event.clearInstanceListeners(map) : null
    })

    // Render
    return { error, map, api, options, throttle, mapEl }
  },
})
</script>
