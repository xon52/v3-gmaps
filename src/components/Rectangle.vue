<script lang="ts">
import { throttle as throttleTool } from '../tools'
import { Ref, defineComponent, onBeforeUnmount, onMounted, ref, watch, inject, toRefs, PropType } from 'vue'

export default defineComponent({
  name: 'GmapsRectangle',

  props: {
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions
    throttle: { type: Number, default: 200 },
    options: { type: Object as PropType<google.maps.RectangleOptions>, required: true },
  },

  emits: {
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle-Events
    bounds_changed: (e: google.maps.LatLngBoundsLiteral) => true,
    click: (e: google.maps.MapMouseEvent) => true,
    contextmenu: (e: google.maps.MapMouseEvent) => true,
    dblclick: (e: google.maps.MapMouseEvent) => true,
    drag: (e: google.maps.MapMouseEvent) => true,
    dragend: (e: google.maps.MapMouseEvent) => true,
    dragstart: (e: google.maps.MapMouseEvent) => true,
    mousedown: (e: google.maps.MapMouseEvent) => true,
    mousemove: (e: google.maps.MapMouseEvent) => true,
    mouseout: (e: google.maps.MapMouseEvent) => true,
    mouseover: (e: google.maps.MapMouseEvent) => true,
    mouseup: (e: google.maps.MapMouseEvent) => true,
    rightclick: (e: google.maps.MapMouseEvent) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const { throttle } = toRefs(props)
    const handleLocalError = (err: Error) => handleError(err, `Rectangle`)
    const listeners: google.maps.MapsEventListener[] = []
    let shape: Ref<google.maps.Rectangle | null> = ref(null)

    // Methods
    const checkOptions = () => {
      const isOK = !!props.options
      if (!isOK) handleLocalError(new Error('A rectangle requires options.'))
      return isOK
    }

    // Options
    watch(
      () => props.options,
      (newVal) => {
        if (shape.value && checkOptions()) shape.value.setOptions(newVal)
      },
      { deep: true }
    )

    // Set Listeners
    const setListeners = (t: google.maps.Rectangle) => {
      const d = +throttle.value
      listeners.push(
        // Throttled
        t.addListener(
          'bounds_changed',
          throttleTool(() => emit('bounds_changed', t.getBounds().toJSON()), d)
        ),
        t.addListener(
          'drag',
          throttleTool((e: google.maps.MapMouseEvent) => emit('drag', e), d)
        ),
        t.addListener(
          'mousemove',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mousemove', e), d)
        ),
        t.addListener(
          'mouseover',
          throttleTool((e: google.maps.MapMouseEvent) => emit('mouseover', e), d)
        ),
        // Not throttled
        t.addListener('click', (e: google.maps.MapMouseEvent) => emit('click', e)),
        t.addListener('contextmenu', (e: google.maps.MapMouseEvent) => emit('contextmenu', e)),
        t.addListener('dblclick', (e: google.maps.MapMouseEvent) => emit('dblclick', e)),
        t.addListener('dragend', (e: google.maps.MapMouseEvent) => emit('dragend', e)),
        t.addListener('dragstart', (e: google.maps.MapMouseEvent) => emit('dragstart', e)),
        t.addListener('mousedown', (e: google.maps.MapMouseEvent) => emit('mousedown', e)),
        t.addListener('mouseout', (e: google.maps.MapMouseEvent) => emit('mouseout', e)),
        t.addListener('mouseup', (e: google.maps.MapMouseEvent) => emit('mouseup', e)),
        t.addListener('rightclick', (e: google.maps.MapMouseEvent) => emit('rightclick', e))
      )
    }

    // Mounted
    onMounted(() => {
      if (!checkOptions()) return handleLocalError(new Error('Invalid options'))
      const map = getMap()
      const api = getAPI()
      shape.value = new api.Rectangle({ map, ...props.options })
      if (shape.value) setListeners(shape.value)
      else handleLocalError(new Error('There was a problem creating the shape.'))
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      if (shape.value) shape.value.setMap(null)
      if (shape.value) getAPI().event.clearInstanceListeners(shape.value)
    })

    // Render (nothing)
    return () => {}
  },
})
</script>
