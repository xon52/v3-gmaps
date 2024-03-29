<template>
  <div style="width: 100%; height: 100%">
    <!-- Error -->
    <map-error v-if="error">{{ error }}</map-error>
    <!-- Loading -->
    <map-spinner v-else-if="!ready" />
    <!-- Map -->
    <div v-show="ready && !error" ref="mapEl" style="width: 100%; height: 100%"></div>
    <!-- Components -->
    <template v-if="ready && !error">
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/map
import MapError from './MapError.vue'
import MapSpinner from './MapSpinner.vue'
import { Ref, defineComponent, onBeforeUnmount, provide, ref, watch, toRefs, PropType, onMounted } from 'vue'
import { getGoogleAPI } from '../install/api'
import { GmapsBounds, GmapsMapOptions, GmapsMapTypeId, GmapsPosition } from '../types/types'
import { debounce, isEqual, throttle as throttleTool } from '../helpers'

const defaultOptions: GmapsMapOptions = {
  center: { lat: 0, lng: 0 },
  zoom: 2,
}

export default defineComponent({
  name: 'GmapsMap',
  components: { MapSpinner, MapError },
  props: {
    center: { type: Object as PropType<GmapsPosition> },
    clickableIcons: { type: Boolean },
    heading: { type: [String, Number] },
    mapTypeId: { type: [String, Object] as PropType<GmapsMapTypeId> },
    options: { type: Object as PropType<GmapsMapOptions>, default: undefined },
    // streetView: {type: Object as PropType<StreetViewPanorama>},
    tilt: { type: [String, Number] },
    zoom: { type: [String, Number] },
    // Custom
    throttle: { type: [Number, String], default: 100 },
  },

  emits: {
    bounds_changed: (e: GmapsBounds | null) => true,
    center_changed: (e: GmapsPosition | null) => true,
    click: (e: GmapsPosition | null) => true,
    contextmenu: (e: GmapsPosition | null) => true,
    dblclick: (e: GmapsPosition | null) => true,
    drag: () => true,
    dragend: () => true,
    dragstart: () => true,
    error: (e: string | undefined) => true,
    heading_changed: (e: number | null) => true,
    idle: () => true,
    isfractionalzoomenabled_changed: (e: number | null) => true,
    maptypeid_changed: (e: string | null) => true,
    mounted: (e: google.maps.Map) => true,
    mousemove: (e: GmapsPosition | null) => true,
    mouseout: (e: GmapsPosition | null) => true,
    mouseover: (e: GmapsPosition | null) => true,
    projection_changed: () => true,
    renderingtype_changed: () => true,
    rightclick: (e: GmapsPosition | null) => true,
    tilesloaded: () => true,
    tilt_changed: (e: number | null) => true,
    unmounted: (e: google.maps.Map) => true,
    zoom_changed: (e: number | null) => true,
  },

  setup(props, { emit }) {
    // Data
    let map: google.maps.Map | null = null
    let api: typeof google.maps | null = null
    const listeners: google.maps.MapsEventListener[] = []
    const mapEl = ref()
    const error: Ref<string | null> = ref(null)
    const ready = ref(false)
    const { throttle } = toRefs(props)

    // Methods
    const handleError = debounce((e: Error, s: string) => {
      error.value = `[${s}]: ${e.message}`
      emit('error', error.value)
    }, 500)
    const getAPI = () => {
      if (!api) throw new Error('vue3-gmaps :: getAPI() called before API loaded.')
      return api
    }
    const getMap = () => {
      if (!map) throw new Error('vue3-gmaps :: getMap() called before map loaded.')
      return map
    }

    // Provides
    provide('$getAPI', getAPI)
    provide('$getMap', getMap)
    provide('$getThrottle', () => +props.throttle)
    provide('$handleError', handleError)

    // Set Listeners
    const setListeners = (t: google.maps.Map) => {
      const d = +throttle.value
      const ge = google.maps.event
      listeners.push(
        // Throttled
        ge.addListener(
          t,
          'bounds_changed',
          throttleTool(() => emit('bounds_changed', t.getBounds()?.toJSON() || null), d)
        ),
        ge.addListener(
          t,
          'center_changed',
          throttleTool(() => emit('center_changed', t.getCenter()?.toJSON() || null), d)
        ),
        ge.addListener(
          t,
          'drag',
          throttleTool(() => emit('drag'), d)
        ),
        ge.addListener(
          t,
          'mousemove',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mousemove', e.latLng?.toJSON() || null), d)
        ),
        ge.addListener(
          t,
          'idle',
          throttleTool(() => emit('idle'), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) => emit('click', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) =>
          emit('contextmenu', e.latLng?.toJSON() || null)
        ),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'dragend', () => emit('dragend')),
        ge.addListener(t, 'dragstart', () => emit('dragstart')),
        ge.addListener(t, 'heading_changed', () => emit('heading_changed', t.getHeading() || null)),
        ge.addListener(t, 'isfractionalzoomenabled_changed', () =>
          emit('isfractionalzoomenabled_changed', t.getZoom() || null)
        ),
        ge.addListener(t, 'maptypeid_changed', () => emit('maptypeid_changed', t.getMapTypeId() || null)),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mouseover', (e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'projection_changed', () => emit('projection_changed')),
        ge.addListener(t, 'renderingtype_changed', () => emit('renderingtype_changed')),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) =>
          emit('rightclick', e.latLng?.toJSON() || null)
        ),
        ge.addListener(t, 'tilesloaded', () => emit('tilesloaded')),
        ge.addListener(t, 'tilt_changed', () => emit('tilt_changed', t.getTilt() || null)),
        ge.addListener(t, 'zoom_changed', () => emit('zoom_changed', t.getZoom() || null))
      )
    }

    // On Mounted
    onMounted(() => {
      getGoogleAPI()
        .then((googleApi) => {
          api = googleApi
          const options = { ...defaultOptions, ...props.options }
          if (props.center) options.center = props.center
          if (props.clickableIcons) options.clickableIcons = props.clickableIcons
          if (props.heading) options.heading = props.heading
          if (props.mapTypeId) options.mapTypeId = props.mapTypeId
          if (props.tilt) options.tilt = props.tilt
          if (props.zoom) options.zoom = props.zoom
          map = new googleApi.Map(mapEl.value, options as any)
          if (map) setListeners(map)
          emit('mounted', map)
          ready.value = true
        })
        .catch((e) => handleError(e, 'Map'))
    })

    // Watchers
    watch(
      () => props.center,
      (v) => (v === undefined || isEqual(v, map?.getCenter()?.toJSON()) ? null : map?.setCenter(v)),
      { deep: true }
    )
    watch(
      () => props.clickableIcons,
      (v) => (v === undefined || v == map?.getClickableIcons() ? null : map?.setClickableIcons(v))
    )
    watch(
      () => props.heading,
      (v) => (v === undefined || +v == map?.getHeading() ? null : map?.setHeading(+v))
    )
    watch(
      () => props.mapTypeId,
      (v) => (v === undefined || v == map?.getMapTypeId() ? null : map?.setMapTypeId(v))
    )
    watch(
      () => props.options,
      (v) => (v ? map?.setOptions(v as any) : null)
    )
    // watch(
    //   () => props.streetView,
    //   (v) => (v ? map?.setStreetView(v) : null)
    // )
    watch(
      () => props.tilt,
      (v) => (v === undefined || +v == map?.getTilt() ? null : map?.setTilt(+v))
    )
    watch(
      () => props.zoom,
      (v) => (v === undefined || +v == map?.getZoom() ? null : map?.setZoom(+v))
    )

    // Unmount
    onBeforeUnmount(() => {
      if (map) emit('unmounted', map)
      listeners.forEach((e) => e.remove())
      if (map) window.google.maps.event.clearInstanceListeners(map)
    })

    // Render
    return { error, ready, mapEl }
  },
})
</script>
