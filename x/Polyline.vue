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
  name: 'gmapsPolyline',

  props: {
    // TODO: Should all of these be undefined for defaults?
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    geodesic: { type: Boolean, default: false },
    icons: { type: Array, default: undefined },
    options: { type: Object, default: () => ({}) },
    path: { type: Array, default: undefined },
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
    // https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline-Events
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
    let shape: google.maps.Polyline | null = null
    const listeners: google.maps.MapsEventListener[] = []
    const getMap = inject('$getmap') as () => google.maps.Map
    const _handleError = inject('$gmapHandleError') as (
      e: Error,
      s: string
    ) => {}
    const handleError = (err: Error) => _handleError(err, 'Polyline')

    // Options (computed)
    const options = computed(() => {
      const options: google.maps.PolylineOptions = { ...props.options }
      if (props.clickable !== undefined) options.clickable = props.clickable
      if (props.draggable !== undefined) options.draggable = props.draggable
      if (props.editable !== undefined) options.editable = props.editable
      if (props.geodesic !== undefined) options.geodesic = props.geodesic
      if (props.icons !== undefined)
        options.icons = props.icons as google.maps.IconSequence[]
      if (props.path !== undefined)
        options.path = props.path as google.maps.LatLngLiteral[]
      if (props.strokeColor !== undefined)
        options.strokeColor = props.strokeColor
      if (props.strokeOpacity !== undefined)
        options.strokeOpacity = +props.strokeOpacity
      if (props.strokeWeight !== undefined)
        options.strokeWeight = +props.strokeWeight
      if (props.visible !== undefined) options.visible = props.visible
      if (props.zIndex !== undefined) options.zIndex = +props.zIndex
      return options
    })
    // Options (watcher)
    // TODO: Should this be broken up to each prop?
    // TODO: Can this be rolled into options?
    watch(
      () => props,
      () => {
        if (shape) {
          shape.setOptions(options.value)
        }
      },
      { deep: true }
    )

    // Set Listeners Method
    const setListeners = (t: google.maps.Polyline) => {
      const ge = google.maps.event
      const pathChanged = () =>
        emit(
          'path_changed',
          t
            .getPath()
            .getArray()
            .map((e) => e.toJSON())
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
      if (!options.value.path)
        return handleError(
          new Error(
            'A path property is required by every polyline. Set this as either a position prop, or a position property of the options prop.'
          )
        )
      getMaps()
        .then((maps) => {
          const map = getMap()
          shape = new maps.Polyline({ map, ...options.value })
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
