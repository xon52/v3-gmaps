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
    center_changed: (e: GmapsPosition) => true,
    click: (e: GmapsPosition) => true,
    dblclick: (e: GmapsPosition) => true,
    drag: (e: GmapsPosition) => true,
    dragend: (e: GmapsPosition) => true,
    dragstart: (e: GmapsPosition) => true,
    mousedown: (e: GmapsPosition) => true,
    mousemove: (e: GmapsPosition) => true,
    mouseout: (e: GmapsPosition) => true,
    mouseover: (e: GmapsPosition) => true,
    mouseup: (e: GmapsPosition) => true,
    radius_changed: (e: number) => true,
    rightclick: (e: GmapsPosition) => true,
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
          throttle(() => emit('center_changed', t.getCenter().toJSON()), d)
        ),
        ge.addListener(
          t,
          'drag',
          throttle((e: google.maps.MapMouseEvent) => emit('drag', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'mousemove',
          throttle((e: google.maps.MapMouseEvent) => emit('mousemove', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttle((e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'radius_changed',
          throttle(() => emit('radius_changed', t.getRadius()), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e) => emit('click', e.latLng.toJSON())),
        ge.addListener(t, 'dblclick', (e) => emit('dblclick', e.latLng.toJSON())),
        ge.addListener(t, 'dragend', (e) => emit('dragend', e.latLng.toJSON())),
        ge.addListener(t, 'dragstart', (e) => emit('dragstart', e.latLng.toJSON())),
        ge.addListener(t, 'mousedown', (e) => emit('mousedown', e.latLng.toJSON())),
        ge.addListener(t, 'mouseout', (e) => emit('mouseout', e.latLng.toJSON())),
        ge.addListener(t, 'mouseup', (e) => emit('mouseup', e.latLng.toJSON())),
        ge.addListener(t, 'rightclick', (e) => emit('rightclick', e.latLng.toJSON()))
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
