<template>
  <div ref="content">
    <slot :close="close" :open="open"></slot>
  </div>
</template>

<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/marker
import { defineComponent, onBeforeUnmount, watch, inject, PropType, ref, onMounted } from 'vue'
import { GmapsPosition, GmapsInfoWindowOptions } from '../types/types'
import { isEqual, throttle } from '../helpers'

export default defineComponent({
  name: 'GmapsInfoWindow',

  props: {
    options: { type: Object as PropType<GmapsInfoWindowOptions>, default: undefined },
    position: { type: Object as PropType<GmapsPosition>, default: undefined },
    zIndex: { type: Number, default: undefined },
  },

  emits: {
    closeclick: () => true,
    content_changed: () => true,
    domready: () => true,
    position_changed: (e: GmapsPosition | null | undefined) => true,
    zindex_changed: (e: number | null | undefined) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const getThrottle = inject('$getThrottle') as () => number
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const handleLocalError = (err: Error) => handleError(err, `InfoWindow`)
    const listeners: google.maps.MapsEventListener[] = []
    let infoWindow: google.maps.InfoWindow | null = null
    const content = ref<HTMLDivElement>()

    // Methods
    const open = () => infoWindow?.open(getMap())
    const close = () => infoWindow?.close()

    // Set Listeners
    const setListeners = (t: google.maps.InfoWindow) => {
      const ge = google.maps.event
      const d = getThrottle()
      listeners.push(
        // Throttled
        ge.addListener(
          t,
          'position_changed',
          throttle(() => emit('position_changed', t.getPosition()?.toJSON()), d)
        ),
        // Not throttled
        ge.addListener(t, 'closeclick', () => emit('closeclick')),
        ge.addListener(t, 'content_changed', () => emit('content_changed')),
        ge.addListener(t, 'domready', () => emit('domready')),
        ge.addListener(t, 'zindex_changed', () => emit('zindex_changed', t.getZIndex()))
      )
    }

    // On Created
    const map = getMap()
    const api = getAPI()

    // Watchers
    watch(
      () => props.options,
      // TODO: Remove any
      (v) => (v === undefined ? null : infoWindow?.setOptions(v as any)),
      { deep: true }
    )
    watch(
      () => props.position,
      (v) => (v === undefined || isEqual(v, infoWindow?.getPosition()?.toJSON()) ? null : infoWindow?.setPosition(v)),
      { deep: true }
    )
    watch(
      () => props.zIndex,
      (v) => (v === undefined || v == infoWindow?.getZIndex() ? null : infoWindow?.setZIndex(v))
    )

    // Mounted
    onMounted(() => {
      try {
        const options = { map, content: content.value, ...props.options }
        if (props.position) options.position = props.position
        if (props.zIndex) options.zIndex = props.zIndex
        infoWindow = new api.InfoWindow(options as google.maps.InfoWindowOptions)
        if (infoWindow) setListeners(infoWindow)
        open()
      } catch (err) {
        handleLocalError(new Error('There was a problem creating the InfoWindow.'))
      }
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      close()
      if (infoWindow) getAPI().event.clearInstanceListeners(infoWindow)
    })

    return { content, close, open }
  },
})
</script>
