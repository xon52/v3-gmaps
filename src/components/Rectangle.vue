<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
import { throttle as throttleTool, GmapsMouseEventConverter, isEqual } from '../helpers'
import { defineComponent, onBeforeUnmount, watch, inject, PropType } from 'vue'
import { GmapsMouseEvent, GmapsBounds, GmapsRectangleOptions } from '../types/types'

export default defineComponent({
  name: 'GmapsRectangle',

  props: {
    bounds: { type: Object as PropType<GmapsBounds>, default: undefined },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    options: { type: Object as PropType<GmapsRectangleOptions> },
    visible: { type: Boolean, default: true },
  },

  emits: {
    bounds_changed: (e: GmapsBounds) => true,
    click: (e: GmapsMouseEvent) => true,
    dblclick: (e: GmapsMouseEvent) => true,
    drag: (e: GmapsMouseEvent) => true,
    dragend: (e: GmapsMouseEvent) => true,
    dragstart: (e: GmapsMouseEvent) => true,
    mousedown: (e: GmapsMouseEvent) => true,
    mousemove: (e: GmapsMouseEvent) => true,
    mouseout: (e: GmapsMouseEvent) => true,
    mouseover: (e: GmapsMouseEvent) => true,
    mouseup: (e: GmapsMouseEvent) => true,
    rightclick: (e: GmapsMouseEvent) => true,
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
          throttleTool((e: google.maps.MapMouseEvent) => emit('drag', GmapsMouseEventConverter(e)), d)
        ),
        ge.addListener(
          t,
          'mousemove',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mousemove', GmapsMouseEventConverter(e)), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mouseover', GmapsMouseEventConverter(e)), d)
        ),
        // Not throttled
        ge.addListener(t, 'click', (e) => emit('click', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'dblclick', (e) => emit('dblclick', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'dragend', (e) => emit('dragend', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'dragstart', (e) => emit('dragstart', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'mousedown', (e) => emit('mousedown', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'mouseout', (e) => emit('mouseout', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'mouseup', (e) => emit('mouseup', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'rightclick', (e) => emit('rightclick', GmapsMouseEventConverter(e)))
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
    // TODO: Remove any
    shape = new api.Rectangle(options as any)
    if (shape) setListeners(shape)
    else handleLocalError(new Error('There was a problem creating the shape.'))

    // Watchers
    watch(
      () => props.bounds,
      (v) => (v === undefined || isEqual(v, shape?.getBounds().toJSON()) ? null : shape?.setBounds(v)),
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
      listeners.forEach((e) => e.remove())
      if (shape) shape.setMap(null)
      if (shape) getAPI().event.clearInstanceListeners(shape)
    })

    // Render (nothing)
    return () => {}
  },
})
</script>
