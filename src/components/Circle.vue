<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
import { throttle, isEqual } from '../helpers'
import { defineComponent, onBeforeUnmount, watch, inject, PropType } from 'vue'
import { GmapsPosition, GmapsCircleOptions } from '../types/types'

export default defineComponent({
  name: 'GmapsCircle',

  props: {
    center: { type: Object as PropType<GmapsPosition>, default: undefined },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    options: { type: Object as PropType<GmapsCircleOptions>, default: undefined },
    radius: { type: Number, default: undefined },
    visible: { type: Boolean, default: true },
  },

  emits: {
    center_changed: (e: GmapsPosition | null) => true,
    click: (e: GmapsPosition | null) => true,
    dblclick: (e: GmapsPosition | null) => true,
    drag: (e: GmapsPosition | null) => true,
    dragend: (e: GmapsPosition | null) => true,
    dragstart: (e: GmapsPosition | null) => true,
    mousedown: (e: GmapsPosition | null) => true,
    mousemove: (e: GmapsPosition | null) => true,
    mouseout: (e: GmapsPosition | null) => true,
    mouseover: (e: GmapsPosition | null) => true,
    mouseup: (e: GmapsPosition | null) => true,
    radius_changed: (e: number) => true,
    rightclick: (e: GmapsPosition | null) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const getThrottle = inject('$getThrottle') as () => number
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const handleLocalError = (err: Error) => handleError(err, `Circle`)
    const listeners: google.maps.MapsEventListener[] = []
    let shape: google.maps.Circle | null = null

    // Set Listeners
    const setListeners = (t: google.maps.Circle) => {
      const ge = google.maps.event
      const d = getThrottle()
      listeners.push(
        // Throttled
        ge.addListener(
          t,
          'center_changed',
          throttle(() => emit('center_changed', t.getCenter()?.toJSON() || null), d)
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
        ge.addListener(
          t,
          'radius_changed',
          throttle(() => emit('radius_changed', t.getRadius()), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) => emit('click', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) => emit('dragend', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) => emit('dragstart', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mousedown', (e: google.maps.MapMouseEvent) => emit('mousedown', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) => emit('mouseup', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) => emit('rightclick', e.latLng?.toJSON() || null))
      )
    }

    // On Created
    const map = getMap()
    const api = getAPI()
    const options = { map, ...props.options }
    if (props.center) options.center = props.center
    if (props.draggable) options.draggable = props.draggable
    if (props.editable) options.editable = props.editable
    if (props.radius) options.radius = props.radius
    if (props.visible) options.visible = props.visible
    shape = new api.Circle(options as google.maps.CircleOptions)
    if (shape) setListeners(shape)
    else handleLocalError(new Error('There was a problem creating the shape.'))

    // Watchers
    watch(
      () => props.center,
      (v) => (v === undefined || isEqual(v, shape?.getCenter()) ? null : shape?.setCenter(v)),
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
      () => props.radius,
      (v) => (v === undefined || v == shape?.getRadius() ? null : shape?.setRadius(v))
    )
    watch(
      () => props.visible,
      (v) => (v === undefined || v == shape?.getVisible() ? null : shape?.setVisible(v))
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
