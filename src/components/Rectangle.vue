<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
import { throttle as throttleTool } from '../tools'
import { defineComponent, onBeforeUnmount, watch, inject, PropType, toRaw } from 'vue'
import { GmapsPosition, GmapsStrokePosition, GmapsBounds } from '../types/types'

export default defineComponent({
  name: 'GmapsRectangle',

  props: {
    bounds: { type: Object as PropType<GmapsBounds>, default: undefined },
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    fillColor: { type: String, default: undefined },
    fillOpacity: { type: Number, default: undefined },
    strokeColor: { type: String, default: undefined },
    strokeOpacity: { type: Number, default: undefined },
    strokePosition: { type: Object as PropType<GmapsStrokePosition>, default: undefined },
    strokeWeight: { type: Number, default: undefined },
    visible: { type: Boolean, default: true },
    zIndex: { type: Number, default: undefined },
  },

  emits: {
    bounds_changed: (e: GmapsBounds) => true,
    click: (e: GmapsPosition) => true,
    contextmenu: (e: GmapsPosition) => true,
    dblclick: (e: GmapsPosition) => true,
    drag: (e: GmapsPosition) => true,
    dragend: (e: GmapsPosition) => true,
    dragstart: (e: GmapsPosition) => true,
    mousedown: (e: GmapsPosition) => true,
    mousemove: (e: GmapsPosition) => true,
    mouseout: (e: GmapsPosition) => true,
    mouseover: (e: GmapsPosition) => true,
    mouseup: (e: GmapsPosition) => true,
    rightclick: (e: GmapsPosition) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const getThrottle = inject('$getThrottle') as () => number
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const handleLocalError = (err: Error) => handleError(err, `Rectangle`)
    const listeners: google.maps.MapsEventListener[] = []
    let shape: google.maps.Rectangle | null = null

    // Set Listeners
    const setListeners = (t: google.maps.Rectangle) => {
      const ge = google.maps.event
      const d = getThrottle()
      listeners.push(
        // Throttled
        ge.addListener(
          t,
          'bounds_changed',
          throttleTool(() => emit('bounds_changed', t.getBounds().toJSON()), d)
        ),
        ge.addListener(
          t,
          'drag',
          throttleTool((e: google.maps.MapMouseEvent) => emit('drag', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'mousemove',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mousemove', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng.toJSON()), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) => emit('click', e.latLng.toJSON())),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) => emit('contextmenu', e.latLng.toJSON())),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng.toJSON())),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) => emit('dragend', e.latLng.toJSON())),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) => emit('dragstart', e.latLng.toJSON())),
        ge.addListener(t, 'mousedown', (e: google.maps.MapMouseEvent) => emit('mousedown', e.latLng.toJSON())),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e.latLng.toJSON())),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) => emit('mouseup', e.latLng.toJSON())),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) => emit('rightclick', e.latLng.toJSON()))
      )
    }

    // On Created
    const map = getMap()
    const api = getAPI()
    const options = { map, ...toRaw(props) }
    shape = new api.Rectangle(options as any)
    if (shape) setListeners(shape)
    else handleLocalError(new Error('There was a problem creating the shape.'))

    // Watchers
    watch(
      () => props.bounds,
      (v) => (v ? shape?.setBounds(v) : null)
    )
    watch(
      () => props.draggable,
      (v) => shape?.setDraggable(v)
    )
    watch(
      () => props.editable,
      (v) => shape?.setEditable(v)
    )
    watch(
      () => props.visible,
      (v) => shape?.setVisible(v)
    )

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      if (shape) shape.setMap(null)
      if (shape) getAPI().event.clearInstanceListeners(shape)
    })

    // Render (nothing)
    return () => {}
  },
})
</script>
