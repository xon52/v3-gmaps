<template></template>

<script setup lang="ts">
/**
 * Google Maps Rectangle Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API Rectangle object.
 * It provides a reactive interface to control the rectangle and emits events when rectangle interactions occur.
 *
 * Features:
 * - Reactive props that sync with the rectangle state
 * - Events for all rectangle interactions (click, drag, etc.)
 * - Throttling for high-frequency events
 * - Proper cleanup on component unmount
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { useShapeEvents } from './useShapeEvents';
import { useShapeWatchers } from './useShapeWatchers';
import { resolveOptions, ShapeType } from './shapeUtils';
import { getLibrary } from '../../install/api';
import type { RectangleProps, RectangleEvents } from './types';

// Props
const props = withDefaults(defineProps<RectangleProps>(), {
	clickable: true,
	draggable: false,
	editable: false,
	visible: true,
	options: () => ({}),
});

// Events
const emit = defineEmits<RectangleEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let rectangleInstance: google.maps.Rectangle | null = null;

// Initialize events handler
const shapeEvents = useShapeEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Create rectangle options using the pure resolveOptions function
		const options = resolveOptions({ map }, props, ShapeType.RECTANGLE);

		// Create rectangle safely using the maps library
		const mapsLibrary = await getLibrary('maps');
		rectangleInstance = new mapsLibrary.Rectangle(options);

		// Setup events
		await shapeEvents.setupEvents(rectangleInstance, ShapeType.RECTANGLE, throttle.value);

		// Set up watchers
		const { stopWatches } = useShapeWatchers(rectangleInstance, props, ShapeType.RECTANGLE);

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
			shapeEvents.cleanup();
			rectangleInstance.setMap(null);
			emit('unmounted', rectangleInstance);
			rectangleInstance = null;
		}
	} catch (e) {
		// Rectangle already cleaned up or not initialized
	}
});
</script>
