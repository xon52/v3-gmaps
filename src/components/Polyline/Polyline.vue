<template></template>

<script setup lang="ts">
/**
 * Google Maps Polyline Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API Polyline object.
 * It provides a reactive interface to control the polyline and emits events when polyline interactions occur.
 *
 * Features:
 * - Reactive props that sync with the polyline state
 * - Events for all polyline interactions (click, drag, etc.)
 * - Throttling for high-frequency events
 * - Proper cleanup on component unmount
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { usePolylineEvents } from './usePolylineEvents';
import { usePolylineWatchers } from './usePolylineWatchers';
import { resolvePolylineOptions } from './polylineUtils';
import { getLibrary } from '../../install/api';
import type { PolylineProps, PolylineEvents } from './types';

// Props
const props = withDefaults(defineProps<PolylineProps>(), {
	clickable: true,
	draggable: false,
	editable: false,
	visible: true,
	geodesic: false,
	options: () => ({}),
});

// Events
const emit = defineEmits<PolylineEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let polylineInstance: google.maps.Polyline | null = null;

// Initialize events handler
const polylineEvents = usePolylineEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Create polyline options
		const options = resolvePolylineOptions({ map }, props);

		// Create polyline safely using the maps library
		const mapsLibrary = await getLibrary('maps');
		polylineInstance = new mapsLibrary.Polyline(options);

		// Setup events
		await polylineEvents.setupEvents(polylineInstance, throttle.value);

		// Set up watchers
		const { stopWatches } = usePolylineWatchers(polylineInstance, props);

		// Emit mounted event
		emit('mounted', polylineInstance);
	} catch (err) {
		handleError(err as Error, 'Polyline-Mounted');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (polylineInstance) {
			polylineEvents.cleanup();
			polylineInstance.setMap(null);
			emit('unmounted', polylineInstance);
			polylineInstance = null;
		}
	} catch (e) {
		// Polyline already cleaned up or not initialized
	}
});
</script>
