<template>
	<!-- Legacy Marker has no visible template -->
</template>

<script setup lang="ts">
/**
 * Google Maps Legacy Marker Component
 *
 * Wraps the Google Maps JavaScript API Marker with reactive controls and events.
 * This component uses the legacy marker API which is still supported but may be deprecated in the future.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/marker
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../../Map/useContext';
import { useLegacyMarkerEvents } from './useEvents';
import { useLegacyMarkerWatchers } from './useWatchers';
import { createMarker } from './utils';
import type { GmLegacyMarkerProps, GmLegacyMarkerEvents } from '../../../types';

// Props
const props = withDefaults(defineProps<GmLegacyMarkerProps>(), {
	options: () => ({}),
	clickable: true,
	visible: true,
	draggable: false,
});

// Events
const emit = defineEmits<GmLegacyMarkerEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let markerInstance: google.maps.Marker | null = null;

// Getter for marker instance
const getInstance = () => markerInstance;

// Expose marker instance and methods to parent components
defineExpose({
	getInstance,
	markerInstance: getInstance,
});

// Initialize on mount
onMounted(() => {
	try {
		if (import.meta.env.DEV) {
			console.warn('This component has been deprecated. Use the new Marker component instead.');
		}
		// Get the map
		const map = getMap();

		// Create marker using the options from props
		markerInstance = createMarker(props, map);

		// Initialize events
		const { setupEvents, cleanup: cleanupEvents } = useLegacyMarkerEvents(emit as any);

		// Setup events
		setupEvents(markerInstance, throttle.value);

		// Initialize watchers
		const { setupWatchers } = useLegacyMarkerWatchers(props, markerInstance);

		// Set up watchers now that marker is initialized
		setupWatchers();

		// Emit mounted event
		emit('mounted', markerInstance);
	} catch (e) {
		handleError(e as Error, 'LegacyMarker-Mounted');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (markerInstance) {
			// Clean up the marker by removing it from the map
			markerInstance.setMap(null);

			// Clean up event listeners
			google.maps.event.clearInstanceListeners(markerInstance);

			// Emit unmounted event
			emit('unmounted', markerInstance);

			// Clear the reference
			markerInstance = null;
		}
	} catch (e) {
		// Marker already cleaned up or not initialized
	}
});
</script>
