<script lang="ts">
import { throttle as throttleTool } from '../tools'
import { Ref, defineComponent, onBeforeUnmount, onMounted, ref, watch, inject, toRefs, PropType, toRaw } from 'vue'

export default defineComponent({
  name: 'GmapsCircle',

  props: {
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions
    throttle: { type: Number, default: 200 },
    options: { type: Object as PropType<google.maps.CircleOptions>, required: true },
  },

  emits: {
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle-Events
    center_changed: (e: google.maps.LatLngLiteral) => true,
    click: (e: google.maps.MapMouseEvent) => true,
    dblclick: (e: google.maps.MapMouseEvent) => true,
    drag: (e: google.maps.MapMouseEvent) => true,
    dragend: (e: google.maps.MapMouseEvent) => true,
    dragstart: (e: google.maps.MapMouseEvent) => true,
    mousedown: (e: google.maps.MapMouseEvent) => true,
    mousemove: (e: google.maps.MapMouseEvent) => true,
    mouseout: (e: google.maps.MapMouseEvent) => true,
    mouseover: (e: google.maps.MapMouseEvent) => true,
    mouseup: (e: google.maps.MapMouseEvent) => true,
    radius_changed: (e: number) => true,
    rightclick: (e: google.maps.MapMouseEvent) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const { throttle } = toRefs(props)
    const handleLocalError = (err: Error) => handleError(err, `Circle`)
    const listeners: google.maps.MapsEventListener[] = []
    let shape: Ref<google.maps.Circle | null> = ref(null)

    // Methods
    const checkOptions = () => {
      const isOK = !!props.options
      if (!isOK) handleLocalError(new Error('A circle requires options.'))
      return isOK
    }

    // Options
    watch(
      () => props.options,
      (newVal) => {
        console.log('newVal', newVal)
        if (shape.value && checkOptions()) shape.value.setOptions(newVal)
      },
      { deep: true }
    )

    // Set Listeners
    const setListeners = (t: google.maps.Circle) => {
      const d = +throttle.value
      listeners.push(
        // Throttled
        t.addListener(
          'center_changed',
          throttleTool(() => emit('center_changed', t.getCenter().toJSON()), d)
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
        t.addListener(
          'radius_changed',
          throttleTool(() => emit('radius_changed', t.getRadius()), d)
        ),
        // Not throttled
        t.addListener('click', (e: google.maps.MapMouseEvent) => emit('click', e)),
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
      shape.value = new api.Circle({ map, ...props.options })
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
