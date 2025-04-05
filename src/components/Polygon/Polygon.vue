<template></template>

<script setup lang="ts">
/**
 * Google Maps Polygon Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API Polygon object.
 * It provides a reactive interface to control the polygon and emits events when polygon interactions occur.
 *
 * Features:
 * - Reactive props that sync with the polygon state
 * - Events for all polygon interactions (click, drag, etc.)
 * - Throttling for high-frequency events
 * - Proper cleanup on component unmount
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { usePolygonEvents } from './usePolygonEvents';
import { usePolygonWatchers } from './usePolygonWatchers';
import { resolvePolygonOptions } from './polygonUtils';
import { getLibrary } from '../../install/api';
import type { PolygonProps, PolygonEvents } from './types';

// Props
const props = withDefaults(defineProps<PolygonProps>(), {
	clickable: true,
	draggable: false,
	editable: false,
	visible: true,
	geodesic: false,
	options: () => ({}),
});

// Events
const emit = defineEmits<PolygonEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let polygonInstance: google.maps.Polygon | null = null;

// Initialize events handler
const polygonEvents = usePolygonEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Create polygon options
		const options = resolvePolygonOptions({ map }, props);

		// Create polygon safely using the maps library
		const mapsLibrary = await getLibrary('maps');
		polygonInstance = new mapsLibrary.Polygon(options);

		// Setup events
		await polygonEvents.setupEvents(polygonInstance, throttle.value);

		// Set up watchers
		const { stopWatches } = usePolygonWatchers(polygonInstance, props);

		// Emit mounted event
		emit('mounted', polygonInstance);
	} catch (err) {
		handleError(err as Error, 'Polygon-Mounted');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (polygonInstance) {
			polygonEvents.cleanup();
			polygonInstance.setMap(null);
			emit('unmounted', polygonInstance);
			polygonInstance = null;
		}
	} catch (e) {
		// Polygon already cleaned up or not initialized
	}
});
</script>
