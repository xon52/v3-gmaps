<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  watch
} from 'vue'
import { getMaps } from '../api'
import { debounce } from '../tools'

export default defineComponent({
  name: 'gmapsRectangle',

  props: {
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions
    bounds: { type: Object, default: undefined },
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    fillColor: { type: String, default: 'black' },
    fillOpacity: { type: [String, Number], default: 0.3 },
    options: { type: Object, default: () => ({}) },
    strokeColor: { type: String, default: 'black' },
    strokeOpacity: { type: [String, Number], default: 1 },
    strokePosition: { type: [String, Number], default: 0 },
    strokeWeight: { type: [String, Number], default: 3 },
    visible: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: 0 },
    // Special
    delay: { type: [Number, String], default: 15 }
  },

  emits: [
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle-Events
    'bounds_changed',
    'click',
    'contextmenu',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'rightclick'
  ],

  setup(props, { emit }) {
    // Data
    let shape: google.maps.Rectangle | null = null
    const listeners: google.maps.MapsEventListener[] = []
    const getMap = inject('$getmap') as () => google.maps.Map
    const _handleError = inject('$gmapHandleError') as (
      e: Error,
      s: string
    ) => {}
    const handleError = (err: Error) => _handleError(err, 'Rectangle')

    // Options (computed)
    const options = computed(() => {
      const options: google.maps.RectangleOptions = { ...props.options }
      if ('bounds' in props)
        options.bounds = props.bounds as google.maps.LatLngBoundsLiteral
      if (props.clickable !== undefined) options.clickable = props.clickable
      if (props.draggable !== undefined) options.draggable = props.draggable
      if (props.editable !== undefined) options.editable = props.editable
      if (props.fillColor !== undefined) options.fillColor = props.fillColor
      if (props.fillOpacity !== undefined)
        options.fillOpacity = +props.fillOpacity
      if (props.strokeColor !== undefined)
        options.strokeColor = props.strokeColor
      if (props.strokeOpacity !== undefined)
        options.strokeOpacity = +props.strokeOpacity
      // TODO: Stroke position constants https://developers.google.com/maps/documentation/javascript/reference/polygon#StrokePosition
      if (props.strokePosition !== undefined)
        options.strokePosition = +props.strokePosition
      if (props.strokeWeight !== undefined)
        options.strokeWeight = +props.strokeWeight
      if (props.visible !== undefined) options.visible = props.visible
      if (props.zIndex !== undefined) options.zIndex = +props.zIndex
      return options
    })
    // Options (watcher)
    // TODO: Can this be rolled into options?
    watch(
      () => props,
      () => {
        if (shape) shape.setOptions(options.value)
      },
      { deep: true }
    )

    // Set Listeners Method
    const setListeners = (t: google.maps.Rectangle) => {
      const ge = google.maps.event
      listeners.push(
        // Debounced
        ge.addListener(
          t,
          'bounds_changed',
          debounce(() => emit('bounds_changed', t.getBounds()), +props.delay)
        ),
        ge.addListener(
          t,
          'drag',
          debounce((e: google.maps.MapMouseEvent) =>
            emit('drag', e.latLng.toJSON(), +props.delay)
          )
        ),
        ge.addListener(
          t,
          'mousemove',
          debounce(
            (e: google.maps.MapMouseEvent) => emit('mousemove', e),
            +props.delay
          )
        ),
        // Not Debounced
        ge.addListener(t, 'click', (e: google.maps.MapMouseEvent) =>
          emit('click', e.latLng.toJSON())
        ),
        ge.addListener(t, 'contextmenu', (e: google.maps.MapMouseEvent) =>
          emit('contextmenu', e.latLng.toJSON())
        ),
        ge.addListener(t, 'dblclick', (e: google.maps.MapMouseEvent) =>
          emit('dblclick', e.latLng.toJSON())
        ),
        ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) =>
          emit('dragend', e.latLng.toJSON())
        ),
        ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) =>
          emit('dragstart', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mousedown', (e: google.maps.MapMouseEvent) =>
          emit('mousedown', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) =>
          emit('mouseout', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseover', (e: google.maps.MapMouseEvent) =>
          emit('mouseover', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) =>
          emit('mouseup', e.latLng.toJSON())
        ),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) =>
          emit('rightclick', e.latLng.toJSON())
        )
      )
    }

    // Mounted
    onMounted(() => {
      if (!options.value.bounds)
        return handleError(
          new Error(
            'A bounds property is required by every rectangle. Set this as either a position prop, or a position property of the options prop.'
          )
        )
      getMaps()
        .then((maps) => {
          const map = getMap()
          shape = new maps.Rectangle({ map, ...options.value })
          if (shape) setListeners(shape)
          else handleError(new Error('There was a problem creating the shape.'))
        })
        .catch((err) => handleError(err))
    })

    // Unmount
    onBeforeUnmount(() => {
      listeners.forEach((e) => e.remove())
      getMaps()
        .then((maps) => {
          if (shape) shape.setMap(null)
          maps.event.clearInstanceListeners(shape)
        })
        .catch((err) => handleError(err))
    })

    // Render (nothing)
    return () => {}
  }
})
</script>
