<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
import { throttle, isEqual } from '../helpers'
import { defineComponent, onBeforeUnmount, watch, inject, PropType } from 'vue'
import { GmapsBounds, GmapsPosition, GmapsRectangleOptions } from '../types/types'

export default defineComponent({
  name: 'GmapsRectangle',

  props: {
    bounds: { type: Object as PropType<GmapsBounds>, default: undefined },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    options: { type: Object as PropType<GmapsRectangleOptions>, default: undefined },
    visible: { type: Boolean, default: true },
  },

  emits: {
    bounds_changed: (e: GmapsBounds | null) => true,
    click: (e: GmapsPosition | null) => true,
    contextmenu: (e: GmapsPosition | null) => true,
    dblclick: (e: GmapsPosition | null) => true,
    drag: (e: GmapsPosition | null) => true,
    dragend: (e: GmapsPosition | null) => true,
    dragstart: (e: GmapsPosition | null) => true,
    mounted: (e: google.maps.Rectangle) => true,
    mousedown: (e: GmapsPosition | null) => true,
    mousemove: (e: GmapsPosition | null) => true,
    mouseout: (e: GmapsPosition | null) => true,
    mouseover: (e: GmapsPosition | null) => true,
    mouseup: (e: GmapsPosition | null) => true,
    rightclick: (e: GmapsPosition | null) => true,
    unmounted: (e: google.maps.Rectangle) => true,
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
          throttle(() => emit('bounds_changed', t.getBounds()?.toJSON() || null), d)
        ),
        ge.addListener(
          t,
          'drag',
          throttle((e: google.maps.MapMouseEvent) => emit('drag', e.latLng?.toJSON() || null), d)
        ),
        ge.addListener(
          t,
          'mousemove',
          throttle((e: google.maps.MapMouseEvent) => emit('mousemove', e.latLng?.toJSON() || null), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttle((e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng?.toJSON() || null), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) => emit('click', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) =>
          emit('contextmenu', e.latLng?.toJSON() || null)
        ),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) => emit('dragend', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) => emit('dragstart', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mousedown', (e: google.maps.MapMouseEvent) => emit('mousedown', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) => emit('mouseup', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) =>
          emit('rightclick', e.latLng?.toJSON() || null)
        )
      )
    }

    // On Created
    const map = getMap()
    const api = getAPI()
    const options = { map, ...props.options }
    if (props.bounds) options.bounds = props.bounds
    if (props.draggable) options.draggable = props.draggable
    if (props.editable) options.editable = props.editable
    if (props.visible) options.visible = props.visible
    shape = new api.Rectangle(options as google.maps.RectangleOptions)
    if (shape) {
      setListeners(shape)
      emit('mounted', shape)
    } else handleLocalError(new Error('There was a problem creating the shape.'))

    // Watchers
    watch(
      () => props.bounds,
      (v) => (v === undefined || isEqual(v, shape?.getBounds()?.toJSON()) ? null : shape?.setBounds(v)),
      { deep: true }
    )
    watch(
      () => props.draggable,
      (v) => (v === undefined || v == shape?.getDraggable() ? null : shape?.setDraggable(v))
    )
    watch(
      () => props.editable,
      (v) => (v === undefined || v == shape?.getEditable() ? null : shape?.setEditable(v))
    )
    watch(
      () => props.visible,
      (v) => (v === undefined || v == shape?.getVisible() ? null : shape?.setVisible(v))
    )

    // Unmount
    onBeforeUnmount(() => {
      if (shape) emit('unmounted', shape)
      listeners.forEach((e) => e.remove())
      if (shape) shape.setMap(null)
      if (shape) getAPI().event.clearInstanceListeners(shape)
    })

    // Render (nothing)
    return () => {}
  },
})
</script>
