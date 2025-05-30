<template />

<script setup lang="ts">
/**
 * Google Maps Polyline Component
 *
 * Wraps the Google Maps JavaScript API Polyline object with reactive controls and events.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useContext';
import { usePolylineEvents } from './useEvents';
import { usePolylineWatchers } from './useWatchers';
import { getLibrary } from '../../';
import { getOptions } from './utils';
import type { GmPolylineProps, GmPolylineEvents } from '../../types';

// Props
const props = withDefaults(defineProps<GmPolylineProps>(), {
	clickable: true,
	draggable: false,
	editable: false,
	visible: true,
	geodesic: false,
	options: () => ({}),
});

// Events
const emit = defineEmits<GmPolylineEvents>();

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

		// Get processed options for polyline
		const options = getOptions(props, map);

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
