<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
import { throttle, GmapsPolyMouseEventConverter } from '../helpers'
import { defineComponent, onBeforeUnmount, watch, inject, PropType } from 'vue'
import { GmapsPosition, GmapsPolylineOptions, GmapsPolyMouseEvent } from '../types/types'
import { isEqual } from '../helpers'

export default defineComponent({
  name: 'GmapsPolyline',

  props: {
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    options: { type: Object as PropType<GmapsPolylineOptions>, default: false },
    path: { type: Object as PropType<GmapsPosition[]>, default: undefined },
    visible: { type: Boolean, default: true },
  },

  emits: {
    click: (e: GmapsPolyMouseEvent) => true,
    contextmenu: (e: GmapsPolyMouseEvent) => true,
    dblclick: (e: GmapsPolyMouseEvent) => true,
    drag: (e: GmapsPosition) => true,
    dragend: (e: GmapsPosition) => true,
    dragstart: (e: GmapsPosition) => true,
    mousedown: (e: GmapsPolyMouseEvent) => true,
    mousemove: (e: GmapsPolyMouseEvent) => true,
    mouseout: (e: GmapsPolyMouseEvent) => true,
    mouseover: (e: GmapsPolyMouseEvent) => true,
    mouseup: (e: GmapsPolyMouseEvent) => true,
    rightclick: (e: GmapsPolyMouseEvent) => true,
    path_changed: (e: GmapsPosition[]) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const getThrottle = inject('$getThrottle') as () => number
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const handleLocalError = (err: Error) => handleError(err, `Polyline`)
    const listeners: google.maps.MapsEventListener[] = []
    let shape: google.maps.Polyline | null = null

    // Methods
    const GmapsPolylineConverter: (e: google.maps.Polyline) => GmapsPosition[] = (e) =>
      e
        .getPath()
        .getArray()
        .map((f) => f.toJSON())

    // Set Listeners
    const setListeners = (t: google.maps.Polyline) => {
      const ge = google.maps.event
      const d = getThrottle()
      listeners.push(
        // Throttled
        ge.addListener(
          t,
          'drag',
          throttle((e: google.maps.MapMouseEvent) => emit('drag', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'mousemove',
          throttle((e: google.maps.MapMouseEvent) => emit('mousemove', GmapsPolyMouseEventConverter(e)), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttle((e: google.maps.MapMouseEvent) => emit('mouseover', GmapsPolyMouseEventConverter(e)), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e) => emit('click', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'contextmenu', (e) => emit('contextmenu', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'dblclick', (e) => emit('dblclick', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'dragend', (e) => emit('dragend', e.latLng.toJSON())),
        ge.addListener(t, 'dragstart', (e) => emit('dragstart', e.latLng.toJSON())),
        ge.addListener(t, 'mousedown', (e) => emit('mousedown', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'mouseout', (e) => emit('mouseout', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'mouseup', (e) => emit('mouseup', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'rightclick', (e) => emit('rightclick', GmapsPolyMouseEventConverter(e))),
        // NOTE: path events insert_at and set_at only fired once so mouseup and dragend were more reliable
        ge.addListener(t, 'dragend', (e) => emit('path_changed', GmapsPolylineConverter(t))),
        ge.addListener(t, 'mouseup', (e) =>
          e.vertex !== undefined || e.edge !== undefined ? emit('path_changed', GmapsPolylineConverter(t)) : null
        ),
        t.getPath().addListener('remove_at', () => emit('path_changed', GmapsPolylineConverter(t)))
      )
    }

    // On Created
    const map = getMap()
    const api = getAPI()
    const options = { map, ...props.options }
    if (props.draggable) options.draggable = props.draggable
    if (props.editable) options.editable = props.editable
    if (props.path) options.path = props.path
    if (props.visible) options.visible = props.visible
    shape = new api.Polyline(options as google.maps.PolylineOptions)
    if (shape) setListeners(shape)
    else handleLocalError(new Error('There was a problem creating the shape.'))

    // Watchers
    watch(
      () => props.draggable,
      (v) => (v === undefined || v == shape?.getDraggable() ? null : shape?.setDraggable(v))
    )
    watch(
      () => props.editable,
      (v) => (v === undefined || v == shape?.getEditable() ? null : shape?.setEditable(v))
    )
    watch(
      () => props.path,
      (v) => (v === undefined || isEqual(v, shape?.getPath()) ? null : shape?.setPath(v)),
      { deep: true }
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
