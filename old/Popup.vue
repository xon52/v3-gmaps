<template>
	<div
		ref="root"
		class="gmaps-popup-container"
		@click.prevent="handleClick"
		@dblclick.prevent="handleDblclick"
		@contextmenu="handleContextmenu">
		<div
			class="gmaps-popup-bubble-anchor"
			:style="`color: ${background};`">
			<div
				class="gmaps-popup-bubble"
				:style="`background: ${background}; maxWidth:${width}; maxHeight:${height};`">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, watch, inject, PropType, toRefs, ref, onMounted } from 'vue';
import { createPopup, PopupType } from './popupClass';
import { GmapsPosition } from '../types/types';
import { isEqual } from '../helpers';

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
		mounted: (e: google.maps.OverlayView) => true,
		unmounted: (e: google.maps.OverlayView) => true,
	},

	setup(props, { emit }) {
		// Inject
		const getAPI = inject('$getAPI') as () => Promise<typeof google.maps>;
		const getMap = inject('$getMap') as () => google.maps.Map;
		const handleError = inject('$handleError') as (e: Error, s: string) => void;
		const { background, width, height, position } = toRefs(props);

		// Data
		const handleLocalError = (err: Error) => handleError(err, `Popup`);
		const root = ref<HTMLDivElement>();
		let popup: PopupType | null = null;

		// Methods
		const handleClick = () => emit('click');
		const handleDblclick = () => emit('dblclick');
		const handleContextmenu = () => emit('contextmenu');

		// On Created
		const map = getMap();

		// Watchers
		watch(
			() => props.position,
			(v) => (v === undefined || isEqual(v, popup?.position) ? null : popup?.setPosition(v)),
			{ deep: true }
		);

		// Mounted
		onMounted(async () => {
			try {
				if (!root.value) return handleLocalError(new Error('No root node found.'));
				popup = await createPopup(position.value, root.value);
				popup.setMap(map);
				emit('mounted', popup);
			} catch (err) {
				handleLocalError(
					new Error(`There was a problem creating the popup: ${err instanceof Error ? err.message : String(err)}`)
				);
			}
		});

		// Unmount
		onBeforeUnmount(() => {
			if (popup) emit('unmounted', popup);
			if (popup) popup.setMap(null);
		});

		// Render (nothing)
		return { root, background, width, height, handleClick, handleDblclick, handleContextmenu };
	},
});
</script>

<style lang="scss">
.gmaps-popup-bubble {
	border-radius: 5px;
	box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.5);
	color: #444;
	cursor: pointer;
	font-family: sans-serif;
	left: 0;
	overflow-y: auto;
	padding: 5px;
	position: absolute;
	top: 0;
	transform: translate(-50%, -100%);
}
/* The parent of the bubble. A zero-height div at the top of the tip. */
.gmaps-popup-bubble-anchor {
	/* Position the div a fixed distance above the tip. */
	bottom: /* TIP_HEIGHT= */ 8px;
	left: 0;
	position: absolute;
	width: 100%;
}
/* This element draws the tip. */
.gmaps-popup-bubble-anchor::after {
	/* The tip is 8px high, and 12px wide. */
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: /* TIP_HEIGHT= */ 8px solid;
	/* Pseudo element inherits parent's color value */
	border-top-color: inherit !important;
	content: '';
	height: 0;
	left: 0;
	position: absolute;
	top: -1px;
	transform: translate(-50%, 0);
	/* The tip is a https://css-tricks.com/snippets/css/css-triangle/ */
	width: 0;
	cursor: pointer;
}
/* JavaScript will position this div at the bottom of the popup tip. */
.gmaps-popup-container {
	cursor: auto;
	height: 0;
	position: absolute;
	width: 100%;
}
</style>
