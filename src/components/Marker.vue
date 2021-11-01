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
  GmapsPoint,
  GmapsCollisionBehavior,
} from '../types/types'

export default defineComponent({
  name: 'GmapsMarker',

  props: {
    anchorPoint: { type: Object as PropType<GmapsPoint>, default: undefined },
    animation: { type: String as PropType<GmapsAnimation>, default: undefined },
    clickable: { type: Boolean, default: true },
    collisionBehavior: { type: String as PropType<GmapsCollisionBehavior>, default: undefined },
    crossOnDrag: { type: Boolean, default: true },
    cursor: { type: String, default: undefined },
    draggable: { type: Boolean, default: false },
    icon: { type: [String, Object] as PropType<string | GmapsIcon | GmapsSymbol | null>, default: undefined },
    label: { type: [String, Object] as PropType<GmapsMarkerLabel>, default: null },
    opacity: { type: Number, default: undefined },
    position: { type: Object as PropType<GmapsPosition>, default: undefined },
    shape: { type: Object as PropType<GmapsMarkerShape>, default: undefined },
    title: { type: String, default: undefined },
    visible: { type: Boolean, default: true },
    zIndex: { type: Number, default: undefined },
  },

  emits: {
    animation_changed: (e: GmapsAnimation | null | undefined) => true,
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
    icon_changed: (e: string | GmapsIcon | GmapsSymbol | null | undefined) => true,
    mousedown: (e: GmapsPosition) => true,
    mouseout: (e: GmapsPosition) => true,
    mouseover: (e: GmapsPosition) => true,
    mouseup: (e: GmapsPosition) => true,
    position_changed: (e: GmapsPosition | null | undefined) => true,
    rightclick: (e: GmapsPosition) => true,
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
          throttleTool((e: google.maps.MapMouseEvent) => emit('drag', e.latLng.toJSON()), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng.toJSON()), d)
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
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) => emit('click', e.latLng.toJSON())),
        ge.addListener(t, 'clickable_changed', () => emit('clickable_changed', t.getClickable())),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) => emit('contextmenu', e.latLng.toJSON())),
        ge.addListener(t, 'cursor_changed', () => emit('cursor_changed', t.getCursor())),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng.toJSON())),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) => emit('dragend', e.latLng.toJSON())),
        ge.addListener(t, 'draggable_changed', () => emit('draggable_changed', t.getDraggable())),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) => emit('dragstart', e.latLng.toJSON())),
        ge.addListener(t, 'flat_changed', () => emit('flat_changed')),
        ge.addListener(t, 'icon_changed', () => emit('icon_changed', getIcon())),
        ge.addListener(t, 'mousedown', (e: google.maps.MapMouseEvent) => emit('mousedown', e.latLng.toJSON())),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e.latLng.toJSON())),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) => emit('mouseup', e.latLng.toJSON())),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) => emit('rightclick', e.latLng.toJSON())),
        ge.addListener(t, 'shape_changed', () => emit('shape_changed', getShape())),
        ge.addListener(t, 'title_changed', () => emit('title_changed', t.getTitle())),
        ge.addListener(t, 'visible_changed', () => emit('visible_changed', t.getVisible())),
        ge.addListener(t, 'zindex_changed', () => emit('zindex_changed', t.getZIndex()))
      )
    }

    // On Created
    const map = getMap()
    const api = getAPI()
    const options = { map, ...toRaw(props) }
    marker = new api.Marker(options as any)
    if (marker) setListeners(marker)
    else handleLocalError(new Error('There was a problem creating the marker.'))

    // Watchers
    watch(
      () => props.animation,
      (v) => marker?.setAnimation(v as any)
    )
    watch(
      () => props.clickable,
      (v) => marker?.setClickable(v)
    )
    watch(
      () => props.cursor,
      (v) => marker?.setCursor(v ? v : null)
    )
    watch(
      () => props.draggable,
      (v) => marker?.setDraggable(v)
    )
    watch(
      () => props.icon,
      (v) => marker?.setIcon(v ? (v as any) : null)
    )
    watch(
      () => props.label,
      (v) => {
        marker?.setLabel(v ? v : null)
      },
      { deep: true }
    )
    watch(
      () => props.opacity,
      (v) => marker?.setOpacity(v ? v : null)
    )
    watch(
      () => props.position,
      (v) => marker?.setPosition(v ? v : null),
      { deep: true }
    )
    watch(
      () => props.shape,
      (v) => marker?.setShape(v ? (v as any) : null),
      { deep: true }
    )
    watch(
      () => props.title,
      (v) => marker?.setTitle(v ? v : null)
    )
    watch(
      () => props.visible,
      (v) => marker?.setVisible(v)
    )
    watch(
      () => props.zIndex,
      (v) => marker?.setZIndex(v ? v : null)
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
