<template>
	<div
		ref="defaultSlotRef"
		style="display: none">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
/**
 * Google Maps Advanced Marker Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API AdvancedMarkerElement object.
 * It provides a reactive interface to control the marker and emits events when marker interactions occur.
 *
 * Features:
 * - Reactive props that sync with the marker state
 * - Events for all marker interactions (click, drag, etc.)
 * - Throttling for high-frequency events
 * - Support for custom styling via PinElement
 * - Default slot: Content is used as the marker's content
 * - Proper cleanup on component unmount
 *
 * IMPORTANT: Advanced Markers require the parent Map component to have a valid mapId set.
 * If no mapId is specified, the default 'DEMO_MAP_ID' will be used for testing purposes.
 * For production, create your own map ID in the Google Cloud Console.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/advanced-markers
 */
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { useMarkerEvents } from './useMarkerEvents';
import { useMarkerWatchers } from './useMarkerWatchers';
import { createMarker, recreateMarker } from './markerUtils';
import type { MarkerProps, MarkerEvents } from './types';
import type { Pin, PinStyle } from '../Pin/types';

// Props
const props = withDefaults(defineProps<MarkerProps>(), {
	options: () => ({}),
	clickable: undefined,
	visible: undefined,
	draggable: undefined,
});

// Events
const emit = defineEmits<MarkerEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Non-reactive instances
let markerInstance: google.maps.marker.AdvancedMarkerElement | null = null;

// Refs for slot content
const defaultSlotRef = ref<HTMLDivElement | null>(null);

// Getter for marker instance
const getInstance = () => markerInstance;

// Expose marker instance and methods to parent components
defineExpose({
	getInstance,
	markerInstance: getInstance,
});

// Initialize events
const { setupEvents, cleanup: cleanupEvents } = useMarkerEvents(emit as any);

/**
 * Get element from a specified slot ref
 * @param slotRef The ref for the slot container
 * @returns The first HTML element in the slot, or undefined if not found
 */
const getElementFromSlotRef = (slotRef: HTMLDivElement | null): HTMLElement | undefined => {
	if (slotRef && slotRef.children.length > 0) {
		// Find the first actual child element (skipping empty text nodes)
		for (let i = 0; i < slotRef.children.length; i++) {
			const child = slotRef.children[i];
			if (child instanceof HTMLElement) {
				return child;
			}
		}
	}
	return undefined;
};

/**
 * Get the pin content based on default slot and props
 * @returns The pin content information with HTMLElement content and/or pin configuration
 */
const getPinContent = (): HTMLElement | Pin | undefined => {
	// Check for element from the default slot
	const slotElement = getElementFromSlotRef(defaultSlotRef.value);
	if (slotElement) {
		return slotElement;
	}

	// Fallback to props.pin if no slot content is provided
	return props.pin;
};

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Create marker using the pin content
		markerInstance = await createMarker(props, map, getPinContent());

		// Setup events and watchers
		await setupEvents(markerInstance, throttle.value);

		// Initialize watchers
		const { setupWatchers } = useMarkerWatchers(props, markerInstance);

		// Set up watchers now that marker is initialized
		setupWatchers();

		// Watch for pin content changes
		watch(
			() => props.pin,
			async () => {
				if (!markerInstance) return;

				try {
					// Clean up old event listeners
					cleanupEvents(markerInstance);

					// Recreate the marker with new styling props
					markerInstance = await recreateMarker(markerInstance, props, getPinContent());

					// Re-setup events
					await setupEvents(markerInstance, throttle.value);
				} catch (e) {
					handleError(e as Error, 'Marker-Recreate');
				}
			},
			{ deep: true }
		);

		// Emit mounted event
		emit('mounted', markerInstance);
	} catch (e) {
		handleError(e as Error, 'Marker-Mounted');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (markerInstance) {
			cleanupEvents(markerInstance);
			markerInstance.map = null;
			emit('unmounted', markerInstance);
			markerInstance = null;
		}
	} catch (e) {
		// Marker already cleaned up or not initialized
	}
});
</script>
