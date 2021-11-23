<template>
  <div
    ref="root"
    class="gmaps-popup-container"
    @click.prevent="handleClick"
    @dblclick.prevent="handleDblclick"
    @contextmenu="handleContextmenu"
  >
    <div class="gmaps-popup-bubble-anchor" :style="`color: ${background};`">
      <div class="gmaps-popup-bubble" :style="`background: ${background}; maxWidth:${width}; maxHeight:${height};`">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watch, inject, PropType, toRefs, ref, onMounted } from 'vue'
import { PopupClass, PopupType } from './popupClass'
import { GmapsPosition } from '../types/types'
import { isEqual } from '../helpers'

export default defineComponent({
  name: 'GmapsPopup',

  props: {
    background: { type: String, default: '#EEEEEE' },
    width: { type: String, default: '200px' },
    height: { type: String, default: '60px' },
    position: { type: Object as PropType<GmapsPosition>, required: true },
  },

  emits: {
    click: () => true,
    contextmenu: () => true,
    dblclick: () => true,
  },

  setup(props, { emit }) {
    // Inject
    const getAPI = inject('$getAPI') as () => typeof google.maps
    const getMap = inject('$getMap') as () => google.maps.Map
    const handleError = inject('$handleError') as (e: Error, s: string) => void
    const { background, width, height, position } = toRefs(props)

    // Data
    const handleLocalError = (err: Error) => handleError(err, `Popup`)
    const root = ref<HTMLDivElement>()
    let popup: PopupType | null = null

    // Methods
    const handleClick = () => emit('click')
    const handleDblclick = () => emit('dblclick')
    const handleContextmenu = () => emit('contextmenu')

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
        if (!root.value) return handleLocalError(new Error('No root node found.'))
        popup = new PopupClass(position.value, root.value, api)
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
    return { root, background, width, height, handleClick, handleDblclick, handleContextmenu }
  },
})
</script>
