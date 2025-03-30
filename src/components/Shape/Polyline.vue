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
import { useShapeEvents } from './useShapeEvents';
import { useShapeWatchers } from './useShapeWatchers';
import { resolveOptions, ShapeType } from './shapeUtils';
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
const shapeEvents = useShapeEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Create polyline options using the pure resolveOptions function
		const options = resolveOptions({ map }, props, ShapeType.POLYLINE);

		// Create polyline safely using the maps library
		const mapsLibrary = await getLibrary('maps');
		polylineInstance = new mapsLibrary.Polyline(options);

		// Setup events
		await shapeEvents.setupEvents(polylineInstance, ShapeType.POLYLINE, throttle.value);

		// Set up watchers
		const { stopWatches } = useShapeWatchers(polylineInstance, props, ShapeType.POLYLINE);

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
			shapeEvents.cleanup();
			polylineInstance.setMap(null);
			emit('unmounted', polylineInstance);
			polylineInstance = null;
		}
	} catch (e) {
		// Polyline already cleaned up or not initialized
	}
});
</script>
