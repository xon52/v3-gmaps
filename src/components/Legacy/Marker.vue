<template>
	<GmMarker
		:position="position"
		:title="title"
		:draggable="draggable"
		:visible="visible"
		:zIndex="zIndex"
		:options="mappedOptions"
		:pin="resolvedPin"
		@click="(p) => emit('click', p)"
		@dblclick="(p) => emit('dblclick', p)"
		@rightclick="(p) => emit('rightclick', p)"
		@drag="(p) => emit('drag', p)"
		@dragend="(p) => emit('dragend', p)"
		@dragstart="(p) => emit('dragstart', p)"
		@mousedown="(p) => emit('mousedown', p)"
		@mouseout="(p) => emit('mouseout', p)"
		@mouseover="(p) => emit('mouseover', p)"
		@mouseup="(p) => emit('mouseup', p)"
		@position_changed="(p) => emit('position_changed', p)"
		@mounted="(m) => emit('mounted', m)"
		@unmounted="(m) => emit('unmounted', m)">
		<slot></slot>
	</GmMarker>
</template>

<script setup lang="ts">
/**
 * Legacy Marker Component
 *
 * This component provides backward compatibility for projects using
 * the older GmapsMarker component while leveraging the new GmMarker component.
 *
 * It maps the old prop names and interfaces to the new component's API.
 *
 * Note: The original marker used the Google Maps JavaScript API Marker,
 * while the new implementation uses the Advanced Marker Element.
 * Some behaviors and styling options may be different.
 */
import { PropType, computed, onMounted } from 'vue';
import { GmMarker } from '../';
import type { GmPosition } from '../../types';

// Define interface for MarkerLabel
interface MarkerLabel {
	text: string;
	color?: string;
	fontFamily?: string;
	fontSize?: string;
	fontWeight?: string;
}

// Define interface for Icon
interface Icon {
	url: string;
	size?: { width: number; height: number };
	anchor?: { x: number; y: number };
	scaledSize?: { width: number; height: number };
	origin?: { x: number; y: number };
}

// Define props using old interface names
const props = defineProps({
	animation: { type: Number, default: undefined },
	clickable: { type: Boolean, default: true },
	cursor: { type: String, default: undefined },
	draggable: { type: Boolean, default: false },
	icon: { type: [String, Object] as PropType<string | Icon>, default: undefined },
	label: { type: [String, Object] as PropType<string | MarkerLabel>, default: undefined },
	opacity: { type: Number, default: undefined },
	options: { type: Object, default: undefined },
	position: { type: Object as PropType<GmPosition>, default: undefined },
	shape: { type: Object, default: undefined },
	title: { type: String, default: undefined },
	visible: { type: Boolean, default: true },
	zIndex: { type: Number, default: undefined },
});

// Define events that match the old component's emits
const emit = defineEmits([
	'animation_changed',
	'click',
	'clickable_changed',
	'contextmenu',
	'cursor_changed',
	'dblclick',
	'drag',
	'dragend',
	'draggable_changed',
	'dragstart',
	'flat_changed',
	'icon_changed',
	'mousedown',
	'mouseout',
	'mouseover',
	'mouseup',
	'position_changed',
	'rightclick',
	'shape_changed',
	'title_changed',
	'visible_changed',
	'zindex_changed',
	'mounted',
	'unmounted',
]);

// Handle deprecated properties
onMounted(() => {
	if (import.meta.env.DEV) {
		if (props.label) {
			console.warn(
				'Legacy Marker: "label" property is deprecated. Use the pin prop or slot content in the new Marker component.'
			);
		}
		if (props.icon) {
			console.warn(
				'Legacy Marker: "icon" property is deprecated. Use the pin prop or slot content in the new Marker component.'
			);
		}
		if (props.opacity !== undefined) {
			console.warn('Legacy Marker: "opacity" property is no longer supported in the new Marker component.');
		}
	}
});
// Resolve pin from label or icon
const resolvedPin = computed(() => {
	// Priority: label first, then icon
	if (props.label) {
		if (typeof props.label === 'string') {
			return props.label;
		} else if (props.label && 'text' in props.label) {
			return props.label.text;
		}
	}

	// If no label, try to use icon
	if (props.icon) {
		if (typeof props.icon === 'string') {
			return props.icon;
		} else if (props.icon && 'url' in props.icon) {
			return props.icon.url;
		}
	}

	return undefined;
});

// Map old options object to new options format if needed
const mappedOptions = computed(() => {
	if (!props.options) return {};

	// Create a new options object
	const newOptions = { ...props.options };

	return newOptions;
});
</script>
