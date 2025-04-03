<template>
	<div>
		<!-- Markers are created and managed by clusterUtils.ts -->
	</div>
</template>

<script setup lang="ts">
/**
 * Google Maps Cluster Component
 *
 * A Vue 3 component that implements marker clustering for Google Maps.
 * It groups markers together based on zoom level and map bounds, and provides
 * a clean interface for handling clustered and individual markers.
 *
 * Features:
 * - Dynamic clustering based on zoom level and map bounds
 * - Customizable cluster appearance and behavior
 * - Support for individual marker customization
 * - Proper cleanup on component unmount
 */
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { organiseClusters, updateMarkerVisibility } from './clusterUtils';
import type { ClusterItem, ClusterEvents } from './types';
import type { Pin } from '../Pin/types';

// Props
const props = withDefaults(
	defineProps<{
		items: ClusterItem[];
		maxZoom?: number;
		highPercentage?: number;
		lowPercentage?: number;
		tileSize?: number;
		pin?: Pin;
	}>(),
	{
		items: () => [],
		maxZoom: 20,
		tileSize: 256,
	}
);

// Events
const emit = defineEmits<ClusterEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let listeners: google.maps.MapsEventListener[] = [];

// Function to handle map events
const handleZoomEvent = async () => {
	try {
		const map = getMap();
		const zoom = map.getZoom() || 0;
		await organiseClusters(props.items, zoom, props.maxZoom, map, props.tileSize, props.pin);
		console.log('Cluster-Zoom-Update');
	} catch (e) {
		handleError(e as Error, 'Cluster-Update');
	}
};

// Function to handle pan events
const handlePanEvents = async () => {
	try {
		const map = getMap();
		await updateMarkerVisibility(map);
		console.log('Cluster-Pan-Update');
	} catch (e) {
		handleError(e as Error, 'Cluster-Pan-Update');
	}
};

// Initialize on mount
onMounted(() => {
	try {
		const map = getMap();

		// Initial cluster update
		handleZoomEvent();

		// Set up map event listeners - separate handlers for zoom and pan
		listeners = [
			map.addListener('zoom_changed', () => handleZoomEvent()),
			map.addListener('idle', () => handlePanEvents()),
		];

		// Emit mounted event
		emit('mounted', {});
	} catch (e) {
		handleError(e as Error, 'Cluster-Mounted');
	}
});

// Watch for changes in items or options
watch(
	() => [props.items, props.maxZoom, props.tileSize, props.pin],
	() => {
		handleZoomEvent();
	},
	{ deep: true }
);

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		listeners.forEach((listener) => listener.remove());
		emit('unmounted', {});
	} catch (e) {
		// Already cleaned up or not initialized
	}
});
</script>
