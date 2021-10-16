<script lang="ts">
import { throttle as throttleTool } from '../tools'
import { Ref, defineComponent, onBeforeUnmount, onMounted, ref, watch, inject, toRefs, PropType } from 'vue'

const defaultOptions = {}

export default defineComponent({
  name: 'GmapsMarker',

  props: {
    throttle: { type: Number, default: 200 },
    options: { type: Object as PropType<google.maps.MarkerOptions>, required: true },
  },

  emits: {
    // https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events
    animation_changed: (e: google.maps.Animation | null | undefined) => true,
    click: (e: google.maps.MapMouseEvent) => true,
    clickable_changed: (e: boolean) => true,
    contextmenu: (e: google.maps.MapMouseEvent) => true,
    cursor_changed: (e: string | null | undefined) => true,
    dblclick: (e: google.maps.MapMouseEvent) => true,
    drag: (e: google.maps.MapMouseEvent) => true,
    dragend: (e: google.maps.MapMouseEvent) => true,
    draggable_changed: (e: boolean | null | undefined) => true,
    dragstart: (e: google.maps.MapMouseEvent) => true,
    flat_changed: () => true,
    icon_changed: (e: string | google.maps.ReadonlyIcon | google.maps.ReadonlySymbol | null | undefined) => true,
    mousedown: (e: google.maps.MapMouseEvent) => true,
    mouseout: (e: google.maps.MapMouseEvent) => true,
    mouseover: (e: google.maps.MapMouseEvent) => true,
    mouseup: (e: google.maps.MapMouseEvent) => true,
    position_changed: (e: google.maps.LatLngLiteral | null | undefined) => true,
    rightclick: (e: google.maps.MapMouseEvent) => true,
    shape_changed: (e: google.maps.MarkerShape | null | undefined) => true,
    title_changed: (e: string | null | undefined) => true,
    visible_changed: (e: boolean) => true,
    zindex_changed: (e: number | null | undefined) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const { throttle } = toRefs(props)
    const handleLocalError = (err: Error) => handleError(err, `Marker`)
    const listeners: google.maps.MapsEventListener[] = []
    let marker: Ref<google.maps.Marker | null> = ref(null)

    // Methods
    const checkOptions = () => {
      const isOK = !!props.options && props.options.position
      if (!isOK)
        handleLocalError(
          new Error(
            'A position is required by every marker. Set this as either a position prop, or a position property of the options prop.'
          )
        )
      return isOK
    }

    // Options
    watch(
      () => props.options,
      (newVal) => {
        if (marker.value && checkOptions())
          marker.value.setOptions({
            ...defaultOptions,
            ...newVal,
          })
      },
      { deep: true }
    )

    // Set Listeners
    const setListeners = (t: google.maps.Marker) => {
      const ge = google.maps.event
      const d = throttle ? +throttle.value : undefined
      listeners.push(
        // Throttled
        ge.addListener(
          t,
          'drag',
          throttleTool((e: google.maps.MapMouseEvent) => emit('drag', e), d)
        ),
        ge.addListener(
          t,
          'mouseover',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mouseover', e), d)
        ),
        ge.addListener(
          t,
          'position_changed',
          throttleTool(() => emit('position_changed', t.getPosition()?.toJSON()), d)
        ),
        // Not throttled
        ge.addListener(t, 'animation_changed', () => emit('animation_changed', t.getAnimation())),
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) => emit('click', e)),
        ge.addListener(t, 'clickable_changed', () => emit('clickable_changed', t.getClickable())),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) => emit('contextmenu', e)),
        ge.addListener(t, 'cursor_changed', () => emit('cursor_changed', t.getCursor())),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e)),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) => emit('dragend', e)),
        ge.addListener(t, 'draggable_changed', () => emit('draggable_changed', t.getDraggable())),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) => emit('dragstart', e)),
        ge.addListener(t, 'flat_changed', () => emit('flat_changed')),
        ge.addListener(t, 'icon_changed', () => emit('icon_changed', t.getIcon())),
        ge.addListener(t, 'mousedown', (e: google.maps.MapMouseEvent) => emit('mousedown', e)),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e)),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) => emit('mouseup', e)),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) => emit('rightclick', e)),
        ge.addListener(t, 'shape_changed', () => emit('shape_changed', t.getShape())),
        ge.addListener(t, 'title_changed', () => emit('title_changed', t.getTitle())),
        ge.addListener(t, 'visible_changed', () => emit('visible_changed', t.getVisible())),
        ge.addListener(t, 'zindex_changed', () => emit('zindex_changed', t.getZIndex()))
      )
    }

    // Mounted
    onMounted(() => {
      if (!checkOptions()) return handleLocalError(new Error('Invalid options'))
      const map = getMap()
      const api = getAPI()
      marker.value = new api.Marker({ map, ...props.options })
      if (marker.value) setListeners(marker.value)
      else handleLocalError(new Error('There was a problem creating the marker.'))
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      if (marker.value) marker.value.setMap(null)
      if (marker.value) getAPI().event.clearInstanceListeners(marker.value)
    })

    // Render (nothing)
    return () => {}
  },
})
</script>
