<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  watch
} from 'vue'
import { getMaps } from '../src/api'
import { debounce } from '../src/tools'

export default defineComponent({
  name: 'gmapsPolygon',

  props: {
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    fillColor: { type: String, default: 'black' },
    fillOpacity: { type: [String, Number], default: 0.3 },
    geodesic: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    paths: { type: Array, default: undefined },
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
    // https://developers.google.com/maps/documentation/javascript/reference/shape#Polygon-Events
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
    'rightclick',
    // Special
    'path_changed'
  ],

  setup(props, { emit }) {
    // Data
    let shape: google.maps.Polygon | null = null
    const listeners: google.maps.MapsEventListener[] = []
    const getMap = inject('$getmap') as () => google.maps.Map
    const _handleError = inject('$gmapHandleError') as (
      e: Error,
      s: string
    ) => {}
    const handleError = (err: Error) => _handleError(err, 'Polygon')

    // Options (computed)
    const options = computed(() => {
      const options: google.maps.PolygonOptions = { ...props.options }
      if (props.clickable !== undefined) options.clickable = props.clickable
      if (props.draggable !== undefined) options.draggable = props.draggable
      if (props.editable !== undefined) options.editable = props.editable
      if (props.fillColor !== undefined) options.fillColor = props.fillColor
      if (props.fillOpacity !== undefined)
        options.fillOpacity = +props.fillOpacity
      if (props.geodesic !== undefined) options.geodesic = props.geodesic
      if (props.paths !== undefined)
        options.paths = props.paths as google.maps.LatLngLiteral[][]
      if (props.strokeColor !== undefined)
        options.strokeColor = props.strokeColor
      if (props.strokeOpacity !== undefined)
        options.strokeOpacity = +props.strokeOpacity
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
    const setListeners = (t: google.maps.Polygon) => {
      const ge = google.maps.event
      const pathChanged = () =>
        emit(
          'path_changed',
          t
            .getPaths()
            .getArray()
            .map((e) => e.getArray().map((e) => e.toJSON()))
        )
      listeners.push(
        // Debounced
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
        ge.addListener(t, 'mousemove', (e: google.maps.MapMouseEvent) =>
          debounce(() => emit('mousemove', e.latLng.toJSON()), 100)
        ),
        ge.addListener(t, 'mouseout', (e: google.maps.MapMouseEvent) =>
          emit('mouseout', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseover', (e: google.maps.MapMouseEvent) =>
          emit('mouseover', e.latLng.toJSON())
        ),
        ge.addListener(t, 'mouseup', (e: google.maps.MapMouseEvent) => {
          emit('mouseup', e.latLng.toJSON())
          // NOTE: path events insert_at and set_at only fired once so mouse up is more reliable (but mouse up doesn't trigger for remove event)
          pathChanged()
        }),
        ge.addListener(t, 'rightclick', (e: google.maps.MapMouseEvent) =>
          emit('rightclick', e.latLng.toJSON())
        ),
        t.getPath().addListener('remove_at', () => pathChanged()),
        t.getPath().addListener('insert_at', () => pathChanged()),
        t.getPath().addListener('set_at', () => pathChanged())
      )
    }

    // Mounted
    onMounted(() => {
      if (!options.value.paths)
        return handleError(
          new Error(
            'A paths property is required by every polyline. Set this as either a position prop, or a position property of the options prop.'
          )
        )
      getMaps()
        .then((maps) => {
          const map = getMap()
          console.log('polygon map', map)
          shape = new maps.Polygon({ map, ...options.value })
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
