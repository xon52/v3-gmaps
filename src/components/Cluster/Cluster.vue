<template />

<script setup lang="ts">
/**
 * Google Maps Cluster Component
 *
 * Implements marker clustering with dynamic grouping based on zoom level and bounds.
 *
 * @see https://developers.google.com/maps/documentation/javascript/marker-clustering
 */
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { useMapContext } from '../';
import { throttle } from '../../helpers';
import { organiseClusters } from './utils';
import { updateMarkerVisibility, clearClusters } from './markerUtils';
import type { ClusterEvents, ClusterGroup } from './types';
import type { GmClusterItem, GmPin } from '../../types';

// Props
const props = withDefaults(
	defineProps<{
		items: GmClusterItem[];
		maxZoom?: number;
		pin?: GmPin;
	}>(),
	{
		items: () => [],
		maxZoom: 20,
	}
);

// Events
const emit = defineEmits<ClusterEvents>();

// Get context from parent Map component
const { getMap } = useMapContext();

// Non-reactive instances
let listeners: google.maps.MapsEventListener[] = [];
let clusterItems: ClusterGroup[] = [];

// Function to reorganize clusters (called on zoom changes)
const reorganizeClusters = async () => {
	const map = getMap();
	const zoom = map.getZoom() || 0;

	clearClusters(clusterItems);
	clusterItems = await organiseClusters(props.items, zoom, props.maxZoom, map, props.pin);
	updateMarkerVisibility(map, clusterItems);
};

// Initialize on mount
onMounted(() => {
	const map = getMap();
	reorganizeClusters();

	// Set up map event listeners with throttling for better performance
	const throttledReorganize = throttle(reorganizeClusters, 100);
	const throttledUpdateVisibility = throttle(() => updateMarkerVisibility(map, clusterItems), 100);

	listeners = [
		map.addListener('zoom_changed', throttledReorganize),
		map.addListener('idle', throttledUpdateVisibility),
	];

	emit('mounted', {});
});

// Watch for changes in items or options
watch(() => props.items, reorganizeClusters, { deep: true });
watch(() => props.maxZoom, reorganizeClusters);
watch(() => props.pin, reorganizeClusters);

// Clean up on unmount
onBeforeUnmount(() => {
	clearClusters(clusterItems);
	listeners.forEach((listener) => listener.remove());
	listeners = [];
	emit('unmounted', {});
});
</script>
