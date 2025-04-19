<template>
	<GmRectangle
		:bounds="bounds"
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
		@bounds_changed="(b) => emit('bounds_changed', b)"
		@mounted="(r) => emit('mounted', r)"
		@unmounted="(r) => emit('unmounted', r)" />
</template>

<script setup lang="ts">
/**
 * Legacy Rectangle Component
 *
 * This component provides backward compatibility for projects using
 * the older GmapsRectangle component while leveraging the new GmRectangle component.
 *
 * It maps the old prop names and interfaces to the new component's API.
 */
import { PropType, computed } from 'vue';
import { GmRectangle } from '../';
import type { GmBounds } from '../../types';

// Define props using old interface names
const props = defineProps({
	bounds: { type: Object as PropType<GmBounds>, default: undefined },
	draggable: { type: Boolean, default: false },
	editable: { type: Boolean, default: false },
	options: { type: Object, default: undefined },
	visible: { type: Boolean, default: true },
});

// Define events that match the old component's emits
const emit = defineEmits([
	'bounds_changed',
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
	'rightclick',
	'unmounted',
]);

// Map old options object to new options format if needed
const mappedOptions = computed(() => {
	if (!props.options) return {};
	return props.options;
});
</script>
