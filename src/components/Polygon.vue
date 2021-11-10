<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
import {
  throttle as throttleTool,
  GmapsMouseEventConverter,
  GmapsPolyMouseEventConverter,
  isEqual,
  GmapsPolygonConverter,
} from '../helpers'
import { defineComponent, onBeforeUnmount, watch, inject, PropType } from 'vue'
import { GmapsMouseEvent, GmapsPosition, GmapsPolygonOptions, GmapsPolyMouseEvent } from '../types/types'

export default defineComponent({
  name: 'GmapsPolygon',

  props: {
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    options: { type: Object as PropType<GmapsPolygonOptions>, default: false },
    paths: { type: Object as PropType<GmapsPosition[] | GmapsPosition[][]>, default: undefined },
    visible: { type: Boolean, default: true },
  },

  emits: {
    click: (e: GmapsPolyMouseEvent) => true,
    contextmenu: (e: GmapsPolyMouseEvent) => true,
    dblclick: (e: GmapsPolyMouseEvent) => true,
    drag: (e: GmapsMouseEvent) => true,
    dragend: (e: GmapsMouseEvent) => true,
    dragstart: (e: GmapsMouseEvent) => true,
    mousedown: (e: GmapsPolyMouseEvent) => true,
    mousemove: (e: GmapsPolyMouseEvent) => true,
    mouseout: (e: GmapsPolyMouseEvent) => true,
    mouseover: (e: GmapsPolyMouseEvent) => true,
    mouseup: (e: GmapsPolyMouseEvent) => true,
    rightclick: (e: GmapsPolyMouseEvent) => true,
    paths_changed: (e: GmapsPosition[][]) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const getThrottle = inject('$getThrottle') as () => number
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const handleLocalError = (err: Error) => handleError(err, `Polygon`)
    const listeners: google.maps.MapsEventListener[] = []
    let shape: google.maps.Polygon | null = null

    // Set Listeners
    const setListeners = (t: google.maps.Polygon) => {
      const ge = google.maps.event
      const d = getThrottle()
      listeners.push(
        // Throttled
        ge.addListener(
          t,
          'drag',
          throttleTool((e: google.maps.MapMouseEvent) => emit('drag', GmapsMouseEventConverter(e)), d)
        ),
        ge.addListener(
          t,
          'mousemove',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mousemove', GmapsPolyMouseEventConverter(e)), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mouseover', GmapsPolyMouseEventConverter(e)), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e) => emit('click', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'contextmenu', (e) => emit('contextmenu', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'dblclick', (e) => emit('dblclick', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'dragend', (e) => emit('dragend', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'dragstart', (e) => emit('dragstart', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'mousedown', (e) => emit('mousedown', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'mouseout', (e) => emit('mouseout', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'mouseup', (e) => emit('mouseup', GmapsPolyMouseEventConverter(e))),
        ge.addListener(t, 'rightclick', (e) => emit('rightclick', GmapsPolyMouseEventConverter(e))),
        // NOTE: path events insert_at and set_at only fired once so mouseup and dragend were more reliable
        ge.addListener(t, 'dragend', (e) => emit('paths_changed', GmapsPolygonConverter(t))),
        ge.addListener(t, 'mouseup', (e) =>
          e.path !== undefined ? emit('paths_changed', GmapsPolygonConverter(t)) : null
        ),
        t.getPath().addListener('remove_at', () => emit('paths_changed', GmapsPolygonConverter(t)))
      )
    }

    // On Created
    const map = getMap()
    const api = getAPI()
    const options = { map, ...props.options }
    if (props.draggable) options.draggable = props.draggable
    if (props.editable) options.editable = props.editable
    if (props.paths) options.paths = props.paths
    if (props.visible) options.visible = props.visible
    // TODO: Remove any
    shape = new api.Polygon(options as any)
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
      () => props.paths,
      // TODO: Remove any
      (v) => (v === undefined || isEqual(v, shape?.getPaths()) ? null : shape?.setPaths(v as any)),
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
