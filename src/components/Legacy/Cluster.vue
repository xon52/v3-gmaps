<template>
	<GmCluster
		:items="items"
		:maxZoom="maxZoom"
		:pin="clusterPin"
		@click="(p) => emit('click', p)"
		@mounted="(c) => emit('mounted', c)"
		@unmounted="(c) => emit('unmounted', c)" />
</template>

<script setup lang="ts">
/**
 * Legacy Cluster Component
 *
 * This component provides backward compatibility for projects using
 * the older GmapsCluster component while leveraging the new GmCluster component.
 *
 * It maps the old prop names and interfaces to the new component's API.
 */
import { PropType, computed } from 'vue';
import { GmCluster } from '../';
import type { GmClusterItem, GmPin } from '../../types';

// Define props using old interface names
const props = defineProps({
	items: { type: Array as PropType<GmClusterItem[]>, required: true },
	options: { type: Object, default: undefined },
});

// Define events that match the old component's emits
const emit = defineEmits(['click', 'mounted', 'unmounted']);

// Extract maxZoom from the options
const maxZoom = computed(() => {
	return props.options?.maxZoom ?? 20;
});

// Prepare pin configuration
const clusterPin = computed<GmPin | undefined>(() => {
	return props.options?.pin;
});
</script>
