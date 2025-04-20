<template>
	<GmInfoWindow
		:position="position"
		:options="mappedOptions"
		@closeclick="() => emit('closeclick')"
		@content_changed="() => emit('content_changed')"
		@domready="() => emit('domready')"
		@position_changed="(p) => emit('position_changed', p)"
		@zindex_changed="(z) => emit('zindex_changed', z)"
		@mounted="(iw) => emit('mounted', iw)"
		@unmounted="(iw) => emit('unmounted', iw)"
		ref="infoWindowRef">
		<div>
			<slot></slot>
		</div>
	</GmInfoWindow>
</template>

<script setup lang="ts">
/**
 * Legacy InfoWindow Component
 *
 * This component provides backward compatibility for projects using
 * the older GmapsInfoWindow component while leveraging the new GmInfoWindow component.
 *
 * It maps the old prop names and interfaces to the new component's API.
 *
 * Note: Some InfoWindow behaviors may differ between versions as the new component
 * might use different underlying APIs.
 */
import { PropType, computed, ref } from 'vue';
import GmInfoWindow from '../InfoWindow/InfoWindow.vue';
import type { GmPosition } from '../../types';

// Reference to the InfoWindow component
const infoWindowRef = ref<InstanceType<typeof GmInfoWindow> | null>(null);

// Define props using old interface names
const props = defineProps({
	options: { type: Object, default: undefined },
	pixelOffset: { type: Object, default: undefined },
	position: { type: Object as PropType<GmPosition>, default: undefined },
	maxWidth: { type: Number, default: undefined },
	zIndex: { type: Number, default: undefined },
});

// Define events that match the old component's emits
const emit = defineEmits([
	'closeclick',
	'content_changed',
	'domready',
	'position_changed',
	'zindex_changed',
	'mounted',
	'unmounted',
]);

// Map old options object to new options format
const mappedOptions = computed(() => {
	const options = props.options ? { ...props.options } : {};

	// Directly map properties from props to options if they're defined
	if (props.pixelOffset !== undefined) options.pixelOffset = props.pixelOffset;
	if (props.maxWidth !== undefined) options.maxWidth = props.maxWidth;
	if (props.zIndex !== undefined) options.zIndex = props.zIndex;

	return options;
});

// Methods to expose
const open = (options?: any) => {
	if (infoWindowRef.value) {
		infoWindowRef.value.open(options);
	}
};

const close = () => {
	if (infoWindowRef.value) {
		infoWindowRef.value.close();
	}
};

// Expose methods to parent components
defineExpose({
	open,
	close,
	isOpen: () => infoWindowRef.value?.isOpen?.(),
});
</script>
