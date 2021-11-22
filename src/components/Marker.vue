<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/marker
import { defineComponent, onBeforeUnmount, watch, inject, PropType } from 'vue'
import {
  GmapsSymbol,
  GmapsIcon,
  GmapsMarkerLabel,
  GmapsPosition,
  GmapsMarkerShape,
  GmapsMarkerOptions,
} from '../types/types'
import { isEqual, throttle } from '../helpers'

export default defineComponent({
  name: 'GmapsMarker',

  props: {
    animation: { type: Object as PropType<'BOUNCE' | 'DROP'>, default: undefined },
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
    animation_changed: () => true,
    click: (e: GmapsPosition) => true,
    clickable_changed: (e: boolean) => true,
    contextmenu: (e: GmapsPosition) => true,
    cursor_changed: (e: string | null | undefined) => true,
    dblclick: (e: GmapsPosition) => true,
    drag: (e: GmapsPosition) => true,
    dragend: (e: GmapsPosition) => true,
    draggable_changed: (e: boolean | null | undefined) => true,
    dragstart: (e: GmapsPosition) => true,
    flat_changed: () => true,
    icon_changed: () => true,
    mousedown: (e: GmapsPosition) => true,
    mouseout: (e: GmapsPosition) => true,
    mouseover: (e: GmapsPosition) => true,
    mouseup: (e: GmapsPosition) => true,
    position_changed: (e: GmapsPosition | null | undefined) => true,
    rightclick: (e: GmapsPosition) => true,
    shape_changed: () => true,
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

    // Methods
    const GmapsAnimationConverter = (animation: string) => {
      if (animation === 'BOUNCE') return globalThis.google.maps.Animation.BOUNCE
      if (animation === 'DROP') return globalThis.google.maps.Animation.DROP
      return null
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
          throttle((e: google.maps.MapMouseEvent) => emit('drag', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttle((e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'position_changed',
          throttle(() => emit('position_changed', t.getPosition()?.toJSON()), d)
        ),
        // Not throttled
        ge.addListener(t, 'animation_changed', () => emit('animation_changed')),
        ge.addListener(t, 'click', (e) => emit('click', e.latLng.toJSON())),
        ge.addListener(t, 'clickable_changed', () => emit('clickable_changed', t.getClickable())),
        ge.addListener(t, 'contextmenu', (e) => emit('contextmenu', e.latLng.toJSON())),
        ge.addListener(t, 'cursor_changed', () => emit('cursor_changed', t.getCursor())),
        ge.addListener(t, 'dblclick', (e) => emit('dblclick', e.latLng.toJSON())),
        ge.addListener(t, 'dragend', (e) => emit('dragend', e.latLng.toJSON())),
        ge.addListener(t, 'draggable_changed', () => emit('draggable_changed', t.getDraggable())),
        ge.addListener(t, 'dragstart', (e) => emit('dragstart', e.latLng.toJSON())),
        ge.addListener(t, 'flat_changed', () => emit('flat_changed')),
        ge.addListener(t, 'icon_changed', () => emit('icon_changed')),
        ge.addListener(t, 'mousedown', (e) => emit('mousedown', e.latLng.toJSON())),
        ge.addListener(t, 'mouseout', (e) => emit('mouseout', e.latLng.toJSON())),
        ge.addListener(t, 'mouseup', (e) => emit('mouseup', e.latLng.toJSON())),
        ge.addListener(t, 'rightclick', (e) => emit('rightclick', e.latLng.toJSON())),
        ge.addListener(t, 'shape_changed', () => emit('shape_changed')),
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
    if (options.animation) options.animation = GmapsAnimationConverter(options.animation) as any
    marker = new api.Marker(options as google.maps.MarkerOptions)
    if (marker) setListeners(marker)
    else handleLocalError(new Error('There was a problem creating the marker.'))

    // Watchers
    watch(
      () => props.animation,
      (v) => (v === undefined ? null : marker?.setAnimation(GmapsAnimationConverter(v)))
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
      (v) => (v === undefined || v == marker?.getIcon() ? null : marker?.setIcon(v as google.maps.Icon))
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
      (v) => (v === undefined ? null : marker?.setOptions(v as google.maps.MarkerOptions)),
      { deep: true }
    )
    watch(
      () => props.position,
      (v) => (v === undefined || isEqual(v, marker?.getPosition()?.toJSON()) ? null : marker?.setPosition(v)),
      { deep: true }
    )
    watch(
      () => props.shape,
      (v) => (v === undefined || v == marker?.getShape() ? null : marker?.setShape(v as google.maps.MarkerShape)),
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
