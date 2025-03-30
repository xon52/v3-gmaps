<template></template>

<script setup lang="ts">
/**
 * Google Maps Circle Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API Circle object.
 * It provides a reactive interface to control the circle and emits events when circle interactions occur.
 *
 * Features:
 * - Reactive props that sync with the circle state
 * - Events for all circle interactions (click, drag, etc.)
 * - Throttling for high-frequency events
 * - Proper cleanup on component unmount
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { useShapeEvents } from './useShapeEvents';
import { useShapeWatchers } from './useShapeWatchers';
import { resolveOptions, ShapeType } from './shapeUtils';
import { getLibrary } from '../../install/api';
import type { CircleProps, CircleEvents } from './types';

// Props
const props = withDefaults(defineProps<CircleProps>(), {
	clickable: true,
	draggable: false,
	editable: false,
	visible: true,
	options: () => ({}),
});

// Events
const emit = defineEmits<CircleEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let circleInstance: google.maps.Circle | null = null;

// Initialize events handler
const shapeEvents = useShapeEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Create circle options using the pure resolveOptions function
		const options = resolveOptions({ map }, props, ShapeType.CIRCLE);

		// Create circle safely using the maps library
		const mapsLibrary = await getLibrary('maps');
		circleInstance = new mapsLibrary.Circle(options);

		// Setup events
		await shapeEvents.setupEvents(circleInstance, ShapeType.CIRCLE, throttle.value);

		// Set up watchers
		const { stopWatches } = useShapeWatchers(circleInstance, props, ShapeType.CIRCLE);

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
			shapeEvents.cleanup();
			circleInstance.setMap(null);
			emit('unmounted', circleInstance);
			circleInstance = null;
		}
	} catch (e) {
		// Circle already cleaned up or not initialized
	}
});
</script>
