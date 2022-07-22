<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/marker
import { defineComponent, onMounted, onBeforeUnmount, watch, inject, PropType } from 'vue'
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
    click: (e: GmapsPosition | null) => true,
    clickable_changed: (e: boolean) => true,
    contextmenu: (e: GmapsPosition | null) => true,
    cursor_changed: (e: string | null | undefined) => true,
    dblclick: (e: GmapsPosition | null) => true,
    drag: (e: GmapsPosition | null) => true,
    dragend: (e: GmapsPosition | null) => true,
    draggable_changed: (e: boolean | null | undefined) => true,
    dragstart: (e: GmapsPosition | null) => true,
    flat_changed: () => true,
    icon_changed: () => true,
    mounted: (e: google.maps.Marker) => true,
    mousedown: (e: GmapsPosition | null) => true,
    mouseout: (e: GmapsPosition | null) => true,
    mouseover: (e: GmapsPosition | null) => true,
    mouseup: (e: GmapsPosition | null) => true,
    position_changed: (e: GmapsPosition | null | undefined) => true,
    rightclick: (e: GmapsPosition | null) => true,
    shape_changed: () => true,
    title_changed: (e: string | null | undefined) => true,
    unmounted: (e: google.maps.Marker) => true,
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
          throttle((e: google.maps.MapMouseEvent) => emit('drag', e.latLng?.toJSON() || null), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttle((e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng?.toJSON() || null), d)
        ),
        ge.addListener(
          t,
          'position_changed',
          throttle(() => emit('position_changed', t.getPosition()?.toJSON()), d)
        ),
        // Not throttled
        ge.addListener(t, 'animation_changed', () => emit('animation_changed')),
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) => emit('click', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'clickable_changed', () => emit('clickable_changed', t.getClickable())),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) =>
          emit('contextmenu', e.latLng?.toJSON() || null)
        ),
        ge.addListener(t, 'cursor_changed', () => emit('cursor_changed', t.getCursor())),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) => emit('dragend', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'draggable_changed', () => emit('draggable_changed', t.getDraggable())),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) => emit('dragstart', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'flat_changed', () => emit('flat_changed')),
        ge.addListener(t, 'icon_changed', () => emit('icon_changed')),
        ge.addListener(t, 'mousedown', (e: google.maps.MapMouseEvent) => emit('mousedown', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) => emit('mouseup', e.latLng?.toJSON() || null)),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) =>
          emit('rightclick', e.latLng?.toJSON() || null)
        ),
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
    if (marker) {
      setListeners(marker)
      emit('mounted', marker)
    }
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
      if (marker) emit('unmounted', marker)
      listeners.forEach((e) => e.remove())
      if (marker) marker.setMap(null)
      if (marker) getAPI().event.clearInstanceListeners(marker)
    })

    // Render (nothing)
    return () => {}
  },
})
</script>
