<template>
	<GmMap
		:center="center"
		:zoom="zoom"
		:options="mappedOptions"
		@click="(p) => emit('click', p)"
		@dblclick="(p) => emit('dblclick', p)"
		@rightclick="(p) => emit('rightclick', p)"
		@center_changed="(p) => emit('center_changed', p)"
		@zoom_changed="(z) => emit('zoom_changed', z)"
		@bounds_changed="(b) => emit('bounds_changed', b)"
		@idle="() => emit('idle')"
		@tilesloaded="() => emit('tilesloaded')"
		@mousemove="(p) => emit('mousemove', p)"
		@mouseout="(p) => emit('mouseout', p)"
		@mouseover="(p) => emit('mouseover', p)"
		@mounted="(m) => emit('mounted', m)"
		@unmounted="(m) => emit('unmounted', m)">
		<slot></slot>
	</GmMap>
</template>

<script setup lang="ts">
/**
 * Legacy Map Component
 *
 * This component provides backward compatibility for projects using
 * the older GmapsMap component while leveraging the new GmMap component.
 *
 * It maps the old prop names and interfaces to the new component's API.
 */
import { PropType, computed } from 'vue';
import GmMap from '../Map/Map.vue';
import type { GmPosition, GmBounds } from '../../types';

// Define props using old interface names
const props = defineProps({
	backgroundColor: { type: String, default: undefined },
	center: { type: Object as PropType<GmPosition>, default: undefined },
	clickableIcons: { type: Boolean, default: undefined },
	disableDefaultUI: { type: Boolean, default: undefined },
	disableDoubleClickZoom: { type: Boolean, default: undefined },
	draggable: { type: Boolean, default: undefined },
	fullscreenControl: { type: Boolean, default: undefined },
	heading: { type: [String, Number], default: undefined },
	keyboardShortcuts: { type: Boolean, default: undefined },
	mapTypeControl: { type: Boolean, default: undefined },
	mapTypeId: { type: [String, Object], default: undefined },
	maxZoom: { type: [String, Number], default: undefined },
	minZoom: { type: [String, Number], default: undefined },
	options: { type: Object, default: undefined },
	streetViewControl: { type: Boolean, default: undefined },
	tilt: { type: [String, Number], default: undefined },
	zoom: { type: [String, Number], default: undefined },
	zoomControl: { type: Boolean, default: undefined },
});

// Define events that match the old component's emits
const emit = defineEmits([
	'bounds_changed',
	'center_changed',
	'click',
	'contextmenu',
	'dblclick',
	'drag',
	'dragend',
	'dragstart',
	'heading_changed',
	'idle',
	'maptypeid_changed',
	'mousemove',
	'mouseout',
	'mouseover',
	'rightclick',
	'tilesloaded',
	'tilt_changed',
	'zoom_changed',
	'mounted',
	'unmounted',
]);

// Map old options object to new options format
const mappedOptions = computed(() => {
	const options = props.options ? { ...props.options } : {};

	// Directly map properties from props to options if they're defined
	if (props.backgroundColor !== undefined) options.backgroundColor = props.backgroundColor;
	if (props.clickableIcons !== undefined) options.clickableIcons = props.clickableIcons;
	if (props.disableDefaultUI !== undefined) options.disableDefaultUI = props.disableDefaultUI;
	if (props.disableDoubleClickZoom !== undefined) options.disableDoubleClickZoom = props.disableDoubleClickZoom;
	if (props.draggable !== undefined) options.draggable = props.draggable;
	if (props.fullscreenControl !== undefined) options.fullscreenControl = props.fullscreenControl;
	if (props.heading !== undefined) options.heading = +props.heading;
	if (props.keyboardShortcuts !== undefined) options.keyboardShortcuts = props.keyboardShortcuts;
	if (props.mapTypeControl !== undefined) options.mapTypeControl = props.mapTypeControl;
	if (props.mapTypeId !== undefined) options.mapTypeId = props.mapTypeId;
	if (props.maxZoom !== undefined) options.maxZoom = +props.maxZoom;
	if (props.minZoom !== undefined) options.minZoom = +props.minZoom;
	if (props.streetViewControl !== undefined) options.streetViewControl = props.streetViewControl;
	if (props.tilt !== undefined) options.tilt = +props.tilt;
	if (props.zoomControl !== undefined) options.zoomControl = props.zoomControl;

	return options;
});

// Convert string values to numbers for zoom
const zoom = computed(() => (props.zoom !== undefined ? +props.zoom : undefined));
</script>
