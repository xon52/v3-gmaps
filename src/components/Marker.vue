<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/marker
import { throttle as throttleTool } from '../tools'
import { defineComponent, onBeforeUnmount, watch, inject, PropType, toRaw } from 'vue'
import {
  GmapsAnimation,
  GmapsSymbol,
  GmapsIcon,
  GmapsMarkerLabel,
  GmapsPosition,
  GmapsMarkerShape,
  GmapsMouseEvent,
  GmapsMarkerOptions,
} from '../types/types'
import { GmapsMouseEventConverter, isEqual } from '../helpers'

export default defineComponent({
  name: 'GmapsMarker',

  props: {
    animation: { type: Object as PropType<GmapsAnimation>, default: undefined },
    clickable: { type: Boolean, default: true },
    cursor: { type: String, default: undefined },
    draggable: { type: Boolean, default: false },
    icon: { type: [String, Object] as PropType<string | GmapsIcon | GmapsSymbol | null>, default: undefined },
    label: { type: [String, Object] as PropType<GmapsMarkerLabel>, default: null },
    opacity: { type: Number, default: undefined },
    options: { type: Object as PropType<GmapsMarkerOptions>, default: undefined },
    position: { type: Object as PropType<GmapsPosition>, default: undefined },
    shape: { type: Object as PropType<GmapsMarkerShape>, default: undefined },
    title: { type: String, default: undefined },
    visible: { type: Boolean, default: true },
    zIndex: { type: Number, default: undefined },
  },

  emits: {
    animation_changed: (e: GmapsAnimation | null | undefined) => true,
    click: (e: GmapsMouseEvent) => true,
    clickable_changed: (e: boolean) => true,
    contextmenu: (e: GmapsMouseEvent) => true,
    cursor_changed: (e: string | null | undefined) => true,
    dblclick: (e: GmapsMouseEvent) => true,
    drag: (e: GmapsMouseEvent) => true,
    dragend: (e: GmapsMouseEvent) => true,
    draggable_changed: (e: boolean | null | undefined) => true,
    dragstart: (e: GmapsMouseEvent) => true,
    flat_changed: () => true,
    icon_changed: (e: string | GmapsIcon | GmapsSymbol | null | undefined) => true,
    mousedown: (e: GmapsMouseEvent) => true,
    mouseout: (e: GmapsMouseEvent) => true,
    mouseover: (e: GmapsMouseEvent) => true,
    mouseup: (e: GmapsMouseEvent) => true,
    position_changed: (e: GmapsPosition | null | undefined) => true,
    rightclick: (e: GmapsMouseEvent) => true,
    shape_changed: (e: GmapsMarkerShape | null | undefined) => true,
    title_changed: (e: string | null | undefined) => true,
    visible_changed: (e: boolean) => true,
    zindex_changed: (e: number | null | undefined) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const getThrottle = inject('$getThrottle') as () => number
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const handleLocalError = (err: Error) => handleError(err, `Marker`)
    const listeners: google.maps.MapsEventListener[] = []
    let marker: google.maps.Marker | null = null

    // TODO: Test
    const getAnimation = () => {
      return marker?.getAnimation() as GmapsAnimation | null | undefined
    }
    // TODO: Test
    const getIcon = () => {
      return marker?.getIcon() as undefined as string | GmapsIcon | GmapsSymbol | null | undefined
    }
    // TODO: Test
    const getShape = () => {
      return marker?.getShape() as undefined as GmapsMarkerShape | null | undefined
    }

    // Set Listeners
    const setListeners = (t: google.maps.Marker) => {
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
          'mouseover',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mouseover', GmapsMouseEventConverter(e)), d)
        ),
        ge.addListener(
          t,
          'position_changed',
          throttleTool(() => emit('position_changed', t.getPosition()?.toJSON()), d)
        ),
        // Not throttled
        ge.addListener(t, 'animation_changed', () =>
          emit('animation_changed', t.getAnimation() ? getAnimation() : undefined)
        ),
        ge.addListener(t, 'click', (e) => emit('click', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'clickable_changed', () => emit('clickable_changed', t.getClickable())),
        ge.addListener(t, 'contextmenu', (e) => emit('contextmenu', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'cursor_changed', () => emit('cursor_changed', t.getCursor())),
        ge.addListener(t, 'dblclick', (e) => emit('dblclick', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'dragend', (e) => emit('dragend', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'draggable_changed', () => emit('draggable_changed', t.getDraggable())),
        ge.addListener(t, 'dragstart', (e) => emit('dragstart', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'flat_changed', () => emit('flat_changed')),
        ge.addListener(t, 'icon_changed', () => emit('icon_changed', getIcon())),
        ge.addListener(t, 'mousedown', (e) => emit('mousedown', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'mouseout', (e) => emit('mouseout', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'mouseup', (e) => emit('mouseup', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'rightclick', (e) => emit('rightclick', GmapsMouseEventConverter(e))),
        ge.addListener(t, 'shape_changed', () => emit('shape_changed', getShape())),
        ge.addListener(t, 'title_changed', () => emit('title_changed', t.getTitle())),
        ge.addListener(t, 'visible_changed', () => emit('visible_changed', t.getVisible())),
        ge.addListener(t, 'zindex_changed', () => emit('zindex_changed', t.getZIndex()))
      )
    }

    // On Created
    const map = getMap()
    const api = getAPI()
    const options = { map, ...props.options }
    if (props.animation) options.animation = props.animation
    if (props.clickable) options.clickable = props.clickable
    if (props.cursor) options.cursor = props.cursor
    if (props.draggable) options.draggable = props.draggable
    if (props.icon) options.icon = props.icon
    if (props.label) options.label = props.label
    if (props.opacity) options.opacity = props.opacity
    if (props.position) options.position = props.position
    if (props.shape) options.shape = props.shape
    if (props.title) options.title = props.title
    if (props.visible) options.visible = props.visible
    if (props.zIndex) options.zIndex = props.zIndex
    // TODO: Remove any
    marker = new api.Marker(options as any)
    if (marker) setListeners(marker)
    else handleLocalError(new Error('There was a problem creating the marker.'))

    // Watchers
    watch(
      () => props.animation,
      (v) => (v === undefined || v.valueOf() == marker?.getAnimation() ? null : marker?.setAnimation(v.valueOf()))
    )
    watch(
      () => props.clickable,
      (v) => (v === undefined || v == marker?.getClickable() ? null : marker?.setClickable(v))
    )
    watch(
      () => props.cursor,
      (v) => (v === undefined || v == marker?.getCursor() ? null : marker?.setCursor(v))
    )
    watch(
      () => props.draggable,
      (v) => (v === undefined || v == marker?.getDraggable() ? null : marker?.setDraggable(v))
    )
    watch(
      () => props.icon,
      // TODO: Remove any
      (v) => (v === undefined || v == marker?.getIcon() ? null : marker?.setIcon(v as any))
    )
    watch(
      () => props.label,
      (v) => (v === undefined || isEqual(v, marker?.getLabel()) ? null : marker?.setLabel(v)),
      { deep: true }
    )
    watch(
      () => props.opacity,
      (v) => (v === undefined || v == marker?.getOpacity() ? null : marker?.setOpacity(v))
    )
    watch(
      () => props.options,
      // TODO: Remove any
      (v) => {
        console.log(v)
        v === undefined ? null : marker?.setOptions(v as any)
      },
      { deep: true }
    )
    watch(
      () => props.position,
      (v) => (v === undefined || isEqual(v, marker?.getPosition()?.toJSON()) ? null : marker?.setPosition(v)),
      { deep: true }
    )
    watch(
      () => props.shape,
      // TODO: Remove any
      (v) => (v === undefined || v == marker?.getShape() ? null : marker?.setShape(v as any)),
      { deep: true }
    )
    watch(
      () => props.title,
      (v) => (v === undefined || v == marker?.getTitle() ? null : marker?.setTitle(v))
    )
    watch(
      () => props.visible,
      (v) => (v === undefined || v == marker?.getVisible() ? null : marker?.setVisible(v))
    )
    watch(
      () => props.zIndex,
      (v) => (v === undefined || v == marker?.getZIndex() ? null : marker?.setZIndex(v))
    )

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      if (marker) marker.setMap(null)
      if (marker) getAPI().event.clearInstanceListeners(marker)
    })

    // Render (nothing)
    return () => {}
  },
})
</script>
