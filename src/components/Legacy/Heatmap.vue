<template>
	<GmHeatmap
		:items="data"
		:options="mappedOptions"
		@mounted="(h) => emit('mounted', h)"
		@unmounted="(h) => emit('unmounted', h)" />
</template>

<script setup lang="ts">
/**
 * Legacy Heatmap Component
 *
 * This component provides backward compatibility for projects using
 * the older GmapsHeatmap component while leveraging the new GmHeatmap component.
 *
 * It maps the old prop names and interfaces to the new component's API.
 */
import { PropType, computed } from 'vue';
import { GmHeatmap } from '../';
import type { GmWeightedPosition } from '../../types';

// Define props using old interface names
const props = defineProps({
	data: { type: Array as PropType<GmWeightedPosition[]>, default: () => [] },
	options: { type: Object, default: undefined },
	dissipating: { type: Boolean, default: undefined },
	maxIntensity: { type: Number, default: undefined },
	opacity: { type: Number, default: undefined },
	radius: { type: Number, default: undefined },
});

// Define events that match the old component's emits
const emit = defineEmits(['mounted', 'unmounted']);

// Map old options object to new options format
const mappedOptions = computed(() => {
	const options = props.options ? { ...props.options } : {};

	// Directly map properties from props to options if they're defined
	if (props.dissipating !== undefined) options.dissipating = props.dissipating;
	if (props.maxIntensity !== undefined) options.maxIntensity = props.maxIntensity;
	if (props.opacity !== undefined) options.opacity = props.opacity;
	if (props.radius !== undefined) options.radius = props.radius;

	return options;
});
</script>
