<template />

<script setup lang="ts">
/**
 * Google Maps Circle Component
 *
 * Wraps the Google Maps JavaScript API Circle object with reactive controls and events.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useContext';
import { useCircleEvents } from './useEvents';
import { useCircleWatchers } from './useWatchers';
import { getLibrary } from '../../';
import { getOptions } from './utils';
import type { GmCircleProps, GmCircleEvents } from '../../types';

// Props
const props = withDefaults(defineProps<GmCircleProps>(), {
	clickable: true,
	draggable: false,
	editable: false,
	visible: true,
	options: () => ({}),
});

// Events
const emit = defineEmits<GmCircleEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let circleInstance: google.maps.Circle | null = null;

// Initialize events handler
const circleEvents = useCircleEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Get processed options for circle
		const options = getOptions(props, map);

		// Create circle safely using the maps library
		const mapsLibrary = await getLibrary('maps');
		circleInstance = new mapsLibrary.Circle(options);

		// Setup events
		await circleEvents.setupEvents(circleInstance, throttle.value);

		// Set up watchers
		const { stopWatches } = useCircleWatchers(circleInstance, props);

		// Emit mounted event
		emit('mounted', circleInstance);
	} catch (err) {
		handleError(err as Error, 'Circle-Mounted');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (circleInstance) {
			circleEvents.cleanup();
			circleInstance.setMap(null);
			emit('unmounted', circleInstance);
			circleInstance = null;
		}
	} catch (e) {
		// Circle already cleaned up or not initialized
	}
});
</script>
