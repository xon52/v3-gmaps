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
 * Wraps the Google Maps JavaScript API AdvancedMarkerElement with reactive controls and events.
 * Requires a valid mapId on the parent Map component.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/advanced-markers
 */
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useMapContext } from '../Map/useContext';
import { useMarkerEvents } from './useEvents';
import { useMarkerWatchers } from './useWatchers';
import { createMarker, recreateMarker } from './utils';
import type { GmMarkerProps, GmMarkerEvents, GmPin } from '../../types';

// Props
const props = withDefaults(defineProps<GmMarkerProps>(), {
	options: () => ({}),
	clickable: undefined,
	visible: undefined,
	draggable: undefined,
});

// Events
const emit = defineEmits<GmMarkerEvents>();

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
 * Gets element from slot reference
 * @param slotRef Slot container reference
 * @returns First HTML element in the slot or undefined
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
 * Gets pin content from slot or props
 * @returns HTMLElement or Pin configuration
 */
const getPinContent = (): HTMLElement | GmPin | undefined => {
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
