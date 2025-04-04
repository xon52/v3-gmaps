<template>
	<gmaps-marker
		:position="position"
		@click="handleClick"
		@dblclick="handleDblclick"
		@contextmenu="handleContextmenu"
		@mounted="handleMarkerMounted"
		@unmounted="handleMarkerUnmounted">
		<div class="legacy-popup-container">
			<div
				class="legacy-popup-content"
				:style="`background: ${background}; max-width: ${width}; max-height: ${height};`">
				<slot
					:click="handleClick"
					:dblclick="handleDblclick"
					:contextmenu="handleContextmenu"></slot>
			</div>
			<div
				class="legacy-popup-arrow"
				:style="`border-top-color: ${background};`"></div>
		</div>
	</gmaps-marker>
</template>

<script setup lang="ts">
/**
 * Legacy Popup Component
 *
 * This component recreates the popup experience by using an AdvancedMarker
 * from our Marker component as the underlying implementation.
 *
 * It provides backwards compatibility for projects using the older Popup
 * component while leveraging the new Advanced Marker API.
 *
 * Note: This implementation may differ from the original in the following ways:
 * - The original Popup used a custom OverlayView, this uses AdvancedMarkerElement
 * - The exact positioning and z-index behaviors might be slightly different
 * - The types for the mounted/unmounted events are now AdvancedMarkerElement instead of OverlayView
 * - The popup's DOM structure is slightly different but visually should appear the same
 *
 * The component exposes event handlers and the marker instance via scoped slots that can be accessed like this:
 *
 * <gmaps-popup :position="position">
 *   <template v-slot="{ click, dblclick, contextmenu, marker }">
 *     <button @click="click">Custom Click Handler</button>
 *     <div v-if="marker">Marker is mounted!</div>
 *   </template>
 * </gmaps-popup>
 */
import { PropType } from 'vue';
import { GmapsPosition } from '../../types';
import { gmapsMarker } from '../../index';

// Props - matching the original Popup component
const props = defineProps({
	background: { type: String, default: '#EEEEEE' },
	width: { type: String, default: '200px' },
	height: { type: String, default: '60px' },
	position: { type: Object as PropType<GmapsPosition>, required: true },
});

// Events
const emit = defineEmits(['click', 'contextmenu', 'dblclick', 'mounted', 'unmounted']);

// Event handlers
const handleClick = () => emit('click');
const handleDblclick = () => emit('dblclick');
const handleContextmenu = () => emit('contextmenu');
const handleMarkerMounted = (marker: google.maps.marker.AdvancedMarkerElement) => {
	emit('mounted', marker);
};
const handleMarkerUnmounted = (marker: google.maps.marker.AdvancedMarkerElement) => {
	emit('unmounted', marker);
};
</script>

<style lang="scss">
.legacy-popup-container {
	position: relative;
	/* Prevent pointer events from reaching the map */
	pointer-events: auto;
}

.legacy-popup-content {
	position: relative;
	border-radius: 5px;
	padding: 5px;
	box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.5);
	color: #444;
	cursor: pointer;
	font-family: sans-serif;
	overflow-y: auto;
}

.legacy-popup-arrow {
	position: absolute;
	left: 50%;
	bottom: -8px;
	transform: translateX(-50%);
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 8px solid; /* Color is set inline */
}
</style>
