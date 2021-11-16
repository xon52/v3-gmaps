<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/visualization
import { defineComponent, onBeforeUnmount, watch, inject, PropType, toRaw, onMounted } from 'vue'
import { GmapsHeatmapOptions, GmapsWeightedPosition } from '../types/types'
import { isEqual } from '../helpers'

export default defineComponent({
  name: 'GmapsHeatmap',

  props: {
    data: { type: Object as PropType<GmapsWeightedPosition[]>, default: undefined },
    options: { type: Object as PropType<GmapsHeatmapOptions>, default: undefined },
  },

  setup(props) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const handleError = inject('$handleError') as (e: Error, s: string) => void

    // Data
    const handleLocalError = (err: Error) => handleError(err, `Heatmap`)
    let heatmap: google.maps.visualization.HeatmapLayer | null = null

    // Methods
    const getData = (e: GmapsWeightedPosition[]) =>
      e.map((d) => ({
        location: new google.maps.LatLng(d.lat, d.lng),
        weight: d.weight || 1,
      }))
    const getOptions = (): google.maps.visualization.HeatmapLayerOptions => ({
      map: getMap(),
      data: props.data ? getData(props.data) : props.options?.data ? getData(props.options.data) : [],
      dissipating: props.options?.dissipating === undefined ? undefined : props.options?.dissipating,
      gradient: props.options?.gradient || undefined,
      maxIntensity: props.options?.maxIntensity || undefined,
      opacity: props.options?.opacity || undefined,
      radius: props.options?.radius || undefined,
    })

    // Created
    if (!getAPI().visualization) {
      handleLocalError(new Error('Visualization library not included in initial setup (main.ts)'))
      return () => {}
    }

    // Watchers
    watch(
      () => props.options,
      (v) => (v === undefined ? null : heatmap?.setOptions(getOptions())),
      { deep: true }
    )
    watch(
      () => props.data,
      (v) => (v === undefined || isEqual(v, heatmap?.getData()) ? null : heatmap?.setData(getData(v))),
      { deep: true }
    )

    // OnMounted
    onMounted(() => {
      try {
        heatmap = new (getAPI().visualization.HeatmapLayer)(getOptions())
      } catch (err) {
        handleLocalError(new Error('There was a problem creating the heatmap.'))
      }
    })

    // Unmount
    onBeforeUnmount(() => {
      if (heatmap) heatmap.setMap(null)
    })

    // Render (nothing)
    return () => {}
  },
})
</script>
