<template>
  <div
    ref="root"
    class="gmaps-cluster-marker"
    @click.prevent="handleClick"
    @dblclick.prevent="handleDblclick"
    @contextmenu="handleContextmenu"
  >
    <div class="gmaps-cluster-center" :style="{ background }">
      <span>
        {{ count }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watch, inject, PropType, toRefs, ref, onMounted } from 'vue'
import { PopupClass, PopupType } from './popupClass'
import { GmapsPosition } from '../types/types'
import { isEqual } from '../helpers'

export default defineComponent({
  name: 'gmapsClusterMarker',

  props: {
    background: { type: String, default: '#EEEEEE' },
    count: { type: [String, Number], required: true },
    position: { type: Object as PropType<GmapsPosition>, required: true },
  },

  emits: {
    click: (e: Event) => true,
    contextmenu: (e: Event) => true,
    dblclick: (e: Event) => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const handleError = inject('$handleError') as (e: Error, s: string) => void
    const { background, count, position } = toRefs(props)

    // Data
    const handleLocalError = (err: Error) => handleError(err, `ClusterMarker`)
    const root = ref<HTMLDivElement>()
    let popup: PopupType | null = null

    // Methods
    const handleClick = (e: Event) => emit('click', e)
    const handleDblclick = (e: Event) => emit('dblclick', e)
    const handleContextmenu = (e: Event) => emit('contextmenu', e)

    // On Created
    const map = getMap()
    const api = getAPI()

    // Watchers
    watch(
      () => props.position,
      (v) => (v === undefined || isEqual(v, popup?.position) ? null : popup?.setPosition(v)),
      { deep: true }
    )

    // Mounted
    onMounted(() => {
      try {
        popup = new PopupClass(position.value, root.value!, api)
        console.log(popup)
        popup.setMap(map)
      } catch (err) {
        handleLocalError(new Error('There was a problem creating the popup.'))
      }
    })

    // Unmount
    onBeforeUnmount(() => {
      if (popup) popup.setMap(null)
    })

    // Render (nothing)
    return { root, background, count, handleClick, handleDblclick, handleContextmenu }
  },
})
</script>

<style lang="scss">
.gmaps-cluster-center {
  color: #444;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 18px;
  left: 0;
  overflow-y: auto;
  padding: 5px;
  position: absolute;
  text-align: center;
  vertical-align: middle;
  top: 0;
  transform: translate(-50%, -100%);
  min-width: 40px;
  border-radius: 50%;
  background-color: var(--background);
  box-shadow: 0 0 10px 10px var(--background);
  pointer-events: all;
}
.gmaps-cluster-pin {
  pointer-events: none;
  cursor: auto;
  height: 0;
  position: absolute;
  width: 100%;
}
</style>
