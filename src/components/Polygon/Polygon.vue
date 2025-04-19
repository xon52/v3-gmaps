<template />

<script setup lang="ts">
/**
 * Google Maps Polygon Component
 *
 * Wraps the Google Maps JavaScript API Polygon object with reactive controls and events.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../';
import { usePolygonEvents } from './useEvents';
import { usePolygonWatchers } from './useWatchers';
import { getLibrary } from '../..';
import { getOptions } from './utils';
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

		// Get processed options for polygon
		const options = getOptions(props, map);

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
