<template>
  <div ref="root" class="gmaps-popup-container" @click.prevent="click" @dblclick.prevent="dblclick">
    <div class="gmaps-popup-bubble-anchor" :style="`color: ${background};`">
      <div class="gmaps-popup-bubble" :style="`background: ${background}; maxWidth:${width}; maxHeight:${height};`">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeUnmount, onMounted, ref, Ref, reactive, watch } from 'vue'
import { PopupClass, PopupType } from './popupClass'

export default defineComponent({
  name: 'gmapsPopup',

  // TODO: Change to options prop alternative
  props: {
    background: { type: String, default: '#EEEEEE' },
    width: { type: String, default: '200px' },
    height: { type: String, default: '60px' },
    position: { type: Object, required: true },
  },

  emits: ['click', 'dblclick'],

  setup(props, { emit }) {
    let popup: PopupType | null = null
    let map = reactive(inject('$gmap') as google.maps.Map)
    const _handleError = inject('$gmapHandleError') as (e: Error, s: string) => {}
    const handleError = (err: Error) => _handleError(err, 'Popup')
    const root = ref<HTMLDivElement>()

    const click = (e: google.maps.MapMouseEvent) => emit('click', e.latLng.toJSON())
    const dblclick = (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng.toJSON())

    // TODO: Should this include all the other props?
    watch(
      () => props.position,
      (newVal) => {
        if (newVal && popup) popup.setPosition(props.position as google.maps.LatLngLiteral)
      }
    )

    onMounted(() => {
      // TODO: Check if waiting for maps is needed
      // getMaps().then((maps: any) => {
      console.log('root.value', root.value)
      try {
        popup = new PopupClass(props.position as google.maps.LatLngLiteral, root.value!)
        popup.setMap(map)
      } catch (err) {
        handleError(err)
      }
      // });
    })

    onBeforeUnmount(() => {
      try {
        if (popup) popup.setMap(null)
      } catch (e) {
        handleError(e)
      }
    })

    return {
      background: props.background,
      width: props.width,
      height: props.height,
      root,
      map,
      click,
      dblclick,
    }
  },
})
</script>

<style lang="sass">
@import url('../styles/popup.scss')
</style>
