<template></template>

<script setup lang="ts">
/**
 * Google Maps Heatmap Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API HeatmapLayer.
 * It provides a reactive interface to control the heatmap and emits events when interactions occur.
 *
 * Features:
 * - Reactive props that sync with the heatmap state
 * - Proper cleanup on component unmount
 * - Support for weighted data points
 *
 * @see https://developers.google.com/maps/documentation/javascript/heatmaplayer
 */
import { onMounted, onBeforeUnmount } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { useHeatmapEvents } from './useHeatmapEvents';
import { useHeatmapWatchers } from './useHeatmapWatchers';
import { createHeatmap, isVisualizationLoaded } from './heatmapUtils';
import type { HeatmapProps, HeatmapEvents } from './types';

// Props
const props = withDefaults(defineProps<HeatmapProps>(), {
	dissipating: undefined,
	options: () => ({}),
});

// Events
const emit = defineEmits<HeatmapEvents>();

// Get context from parent Map component
const { getMap, handleError } = useMapContext();

// Non-reactive instances
let heatmapInstance: google.maps.visualization.HeatmapLayer | null = null;

// Initialize events handler
const heatmapEvents = useHeatmapEvents(emit as any);

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Create heatmap
		heatmapInstance = await createHeatmap(props, map);

		// Setup events
		heatmapEvents.setupEvents(heatmapInstance);

		// Set up watchers
		const { setupWatchers, stopWatches } = useHeatmapWatchers(heatmapInstance, props);
		setupWatchers();

		// Emit mounted event
		emit('mounted', heatmapInstance);
	} catch (err) {
		handleError(err as Error, 'Heatmap-Mounted');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (heatmapInstance) {
			heatmapEvents.cleanup(heatmapInstance);
			heatmapInstance.setMap(null);
			emit('unmounted', heatmapInstance);
			heatmapInstance = null;
		}
	} catch (e) {
		// Heatmap already cleaned up or not initialized
	}
});
</script>
