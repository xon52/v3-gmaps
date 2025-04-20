<template />

<script setup lang="ts">
/**
 * Google Maps Rectangle Component
 *
 * Wraps the Google Maps JavaScript API Rectangle object with reactive controls and events.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useContext';
import { useRectangleEvents } from './useEvents';
import { useRectangleWatchers } from './useWatchers';
import { getLibrary } from '../../';
import { getOptions } from './utils';
import type { GmRectangleProps, GmRectangleEvents } from '../../types';

// Props
const props = withDefaults(defineProps<GmRectangleProps>(), {
	clickable: true,
	draggable: false,
	editable: false,
	visible: true,
	options: () => ({}),
});

// Events
const emit = defineEmits<GmRectangleEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let rectangleInstance: google.maps.Rectangle | null = null;

// Initialize events handler
const rectangleEvents = useRectangleEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Get processed options for rectangle
		const options = getOptions(props, map);

		// Create rectangle safely using the maps library
		const mapsLibrary = await getLibrary('maps');
		rectangleInstance = new mapsLibrary.Rectangle(options);

		// Setup events
		await rectangleEvents.setupEvents(rectangleInstance, throttle.value);

		// Set up watchers
		const { stopWatches } = useRectangleWatchers(rectangleInstance, props);

		// Emit mounted event
		emit('mounted', rectangleInstance);
	} catch (err) {
		handleError(err as Error, 'Rectangle-Mounted');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (rectangleInstance) {
			rectangleEvents.cleanup();
			rectangleInstance.setMap(null);
			emit('unmounted', rectangleInstance);
			rectangleInstance = null;
		}
	} catch (e) {
		// Rectangle already cleaned up or not initialized
	}
});
</script>
