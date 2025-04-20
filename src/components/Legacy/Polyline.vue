<template>
	<GmPolyline
		:path="path"
		:draggable="draggable"
		:editable="editable"
		:visible="visible"
		:options="mappedOptions"
		@click="(p) => emit('click', p)"
		@dblclick="(p) => emit('dblclick', p)"
		@rightclick="(p) => emit('rightclick', p)"
		@drag="(p) => emit('drag', p)"
		@dragend="(p) => emit('dragend', p)"
		@dragstart="(p) => emit('dragstart', p)"
		@mousedown="(p) => emit('mousedown', p)"
		@mousemove="(p) => emit('mousemove', p)"
		@mouseout="(p) => emit('mouseout', p)"
		@mouseover="(p) => emit('mouseover', p)"
		@mouseup="(p) => emit('mouseup', p)"
		@path_changed="(p) => emit('path_changed', p)"
		@mounted="(poly) => emit('mounted', poly)"
		@unmounted="(poly) => emit('unmounted', poly)" />
</template>

<script setup lang="ts">
/**
 * Legacy Polyline Component
 *
 * This component provides backward compatibility for projects using
 * the older GmapsPolyline component while leveraging the new GmPolyline component.
 *
 * It maps the old prop names and interfaces to the new component's API.
 */
import { PropType, computed } from 'vue';
import GmPolyline from '../Polyline/Polyline.vue';
import type { GmPosition } from '../../types';

// Define props using old interface names
const props = defineProps({
	path: { type: Object as PropType<GmPosition[]>, default: undefined },
	draggable: { type: Boolean, default: false },
	editable: { type: Boolean, default: false },
	options: { type: Object, default: undefined },
	visible: { type: Boolean, default: true },
});

// Define events that match the old component's emits
const emit = defineEmits([
	'click',
	'dblclick',
	'drag',
	'dragend',
	'dragstart',
	'mounted',
	'mousedown',
	'mousemove',
	'mouseout',
	'mouseover',
	'mouseup',
	'path_changed',
	'rightclick',
	'unmounted',
]);

// Map old options object to new options format if needed
const mappedOptions = computed(() => {
	if (!props.options) return {};
	return props.options;
});
</script>
