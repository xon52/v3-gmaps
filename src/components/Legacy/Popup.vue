<template>
	<GmMarker
		:position="position"
		@click="handleClick"
		@dblclick="handleDblclick"
		@contextmenu="handleContextmenu"
		@mounted="handleMarkerMounted"
		@unmounted="handleMarkerUnmounted">
		<div
			:style="`
				background: ${background};
				max-width: ${width};
				max-height: ${height};
				border-radius: 5px;
				box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.5);
				padding: 5px;
				position: relative;
			`">
			<slot
				:click="handleClick"
				:dblclick="handleDblclick"
				:contextmenu="handleContextmenu">
			</slot>
			<div
				:style="`
				content: '';
				position: absolute;
				bottom: -8px;
				left: 50%;
				transform: translateX(-50%);
				border-left: 8px solid transparent;
				border-right: 8px solid transparent;
				border-top: 8px solid ${background};
			`"></div>
		</div>
	</GmMarker>
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
 *
 * The component exposes event handlers via scoped slots that can be accessed like this:
 *
 * <gmaps-popup :position="position">
 *   <template v-slot="{ click, dblclick, contextmenu }">
 *     <button @click="click">Custom Click Handler</button>
 *   </template>
 * </gmaps-popup>
 */
import { PropType } from 'vue';
import GmMarker from '../Marker/Marker.vue';
import type { GmPosition } from '../../types';

// Props - matching the original Popup component
const props = defineProps({
	background: { type: String, default: '#EEEEEE' },
	width: { type: String, default: '200px' },
	height: { type: String, default: '60px' },
	position: { type: Object as PropType<GmPosition>, required: true },
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
