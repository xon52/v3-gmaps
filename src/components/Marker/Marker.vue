<template>
	<!-- The Marker has no visual rendering in the template -->
</template>

<script setup lang="ts">
/**
 * Google Maps Advanced Marker Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API AdvancedMarkerElement object.
 * It provides a reactive interface to control the marker and emits events when marker interactions occur.
 *
 * Features:
 * - Reactive props that sync with the marker state
 * - Events for all marker interactions (click, drag, etc.)
 * - Throttling for high-frequency events
 * - Support for custom styling via PinElement
 * - Proper cleanup on component unmount
 *
 * IMPORTANT: Advanced Markers require the parent Map component to have a valid mapId set.
 * If no mapId is specified, the default 'DEMO_MAP_ID' will be used for testing purposes.
 * For production, create your own map ID in the Google Cloud Console.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/advanced-markers
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { useMarkerEvents } from './useMarkerEvents';
import { useMarkerWatchers } from './useMarkerWatchers';
import { createMarker } from './markerUtils';
import type { MarkerProps, MarkerEvents, MarkerExposed } from './types';
import type { GmapsPosition } from '../../types/types';

// Props
const props = withDefaults(defineProps<MarkerProps>(), {
	position: undefined,
	title: undefined,
	element: undefined,
	glyph: undefined,
	background: undefined,
	borderColor: undefined,
	glyphColor: undefined,
	scale: undefined,
	zIndex: undefined,
	clickable: true,
	draggable: false,
	visible: true,
	collisionBehavior: undefined,
	options: () => ({}),
});

// Events
const emit = defineEmits<MarkerEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let markerInstance: google.maps.marker.AdvancedMarkerElement | null = null;

// Initialize events
const { setupEvents, cleanup: cleanupEvents } = useMarkerEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Create marker using our consolidated helper
		markerInstance = await createMarker(props, map);

		// Setup events and watchers
		await setupEvents(markerInstance, throttle.value);

		// Initialize watchers
		const { setupWatchers } = useMarkerWatchers(props, markerInstance);

		// Set up watchers now that marker is initialized
		setupWatchers();

		// Emit mounted event
		emit('mounted', markerInstance);
	} catch (e) {
		handleError(e as Error, 'Marker-Init');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (markerInstance) {
			emit('unmounted', markerInstance);
			cleanupEvents(markerInstance);
			markerInstance.map = null;
			markerInstance = null;
		}
	} catch (e) {
		// Marker already cleaned up or not initialized
	}
});
</script>
