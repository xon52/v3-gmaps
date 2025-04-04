<template>
	<div
		style="display: none"
		data-marker-instance>
		<!-- Hidden container to hold slot content -->
		<div ref="slotContainer">
			<slot></slot>
		</div>
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
 * - Support for custom content via slots
 * - Proper cleanup on component unmount
 *
 * IMPORTANT: Advanced Markers require the parent Map component to have a valid mapId set.
 * If no mapId is specified, the default 'DEMO_MAP_ID' will be used for testing purposes.
 * For production, create your own map ID in the Google Cloud Console.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/advanced-markers
 */
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useMapContext } from '../Map/useMapContext';
import { useMarkerEvents } from './useMarkerEvents';
import { useMarkerWatchers } from './useMarkerWatchers';
import { createMarker, recreateMarker } from './markerUtils';
import type { MarkerProps, MarkerEvents } from './types';

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

// Reference to slot container
const slotContainer = ref<HTMLElement | null>(null);

// Non-reactive instances
let markerInstance: google.maps.marker.AdvancedMarkerElement | null = null;

// Getter for marker instance
const getInstance = () => markerInstance;

// Expose marker instance and methods to parent components
defineExpose({
	getInstance,
	markerInstance: getInstance,
});

// Initialize events
const { setupEvents, cleanup: cleanupEvents } = useMarkerEvents(emit as any);

// Function to create or update marker with slot content
const updateMarkerWithSlotContent = async () => {
	if (!markerInstance) return;

	try {
		// Get first element from slot if it exists
		const slotContent = slotContainer.value?.firstElementChild as HTMLElement;

		if (slotContent) {
			// Clone the slot content to avoid Vue issues
			const contentClone = slotContent.cloneNode(true) as HTMLElement;
			markerInstance.content = contentClone;
		}
	} catch (e) {
		handleError(e as Error, 'Marker-SlotUpdate');
	}
};

// Initialize on mount
onMounted(async () => {
	try {
		// Get the map
		const map = getMap();

		// Get first element from slot if it exists
		const slotContent = slotContainer.value?.firstElementChild as HTMLElement;

		// Create marker using our consolidated helper
		markerInstance = await createMarker(props, map, slotContent);

		// Setup events and watchers
		await setupEvents(markerInstance, throttle.value);

		// Initialize watchers
		const { setupWatchers } = useMarkerWatchers(props, markerInstance);

		// Set up watchers now that marker is initialized
		setupWatchers();

		// Watch for styling prop changes that require marker recreation
		watch(
			() => props.pin,
			async () => {
				if (!markerInstance) return;

				try {
					// Get slot content (if any)
					const slotContent = slotContainer.value?.firstElementChild as HTMLElement;

					// Clean up old event listeners
					cleanupEvents(markerInstance);

					// Recreate the marker with new styling props
					markerInstance = await recreateMarker(markerInstance, props, slotContent);

					// Re-setup events
					await setupEvents(markerInstance, throttle.value);
				} catch (e) {
					handleError(e as Error, 'Marker-Recreate');
				}
			},
			{ deep: true }
		);

		// Watch slot content changes
		const observer = new MutationObserver(() => {
			updateMarkerWithSlotContent();
		});

		if (slotContainer.value) {
			observer.observe(slotContainer.value, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
			});
		}

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
