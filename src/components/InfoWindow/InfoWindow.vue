<template>
	<div style="display: none">
		<!-- Hidden container to hold slot content -->
		<div ref="slotContainer">
			<slot
				:close="close"
				:open="open"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * Google Maps InfoWindow Component
 *
 * Wraps the Google Maps JavaScript API InfoWindow object with reactive controls and events.
 * The InfoWindow displays content in a floating window above the map.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window
 */
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useMapContext } from '../';
import { useInfoWindowEvents } from './useEvents';
import { useInfoWindowWatchers } from './useWatchers';
import { createInfoWindow, openInfoWindow, closeInfoWindow } from './utils';
import type { InfoWindowProps, InfoWindowEvents, InfoWindowOpenOptions } from './types';

// Props
const props = withDefaults(defineProps<InfoWindowProps>(), {
	options: () => ({}),
	disableAutoPan: undefined,
	headerDisabled: undefined,
});

// Events
const emit = defineEmits<InfoWindowEvents>();

// Get context from parent Map component
const { getMap, throttle, handleError } = useMapContext();

// Reference to slot container
const slotContainer = ref<HTMLElement | null>(null);

// Non-reactive instances
let infoWindowInstance: google.maps.InfoWindow | null = null;

// Exported methods
const open = (options?: InfoWindowOpenOptions) => {
	if (!infoWindowInstance) return;

	try {
		const map = options?.map || getMap();
		openInfoWindow(infoWindowInstance, map, options?.anchor, options?.shouldFocus);
	} catch (e) {
		handleError(e as Error, 'InfoWindow-Open');
	}
};

const close = () => {
	if (!infoWindowInstance) return;
	closeInfoWindow(infoWindowInstance);
};

// Function to update info window with slot content
const updateInfoWindowWithSlotContent = async () => {
	if (!infoWindowInstance) return;

	try {
		// Get first element from slot if it exists
		const slotContent = slotContainer.value?.firstElementChild as HTMLElement;

		if (slotContent) {
			// Clone the slot content to avoid Vue issues
			const contentClone = slotContent.cloneNode(true) as HTMLElement;
			infoWindowInstance.setContent(contentClone);
		}
	} catch (e) {
		handleError(e as Error, 'InfoWindow-SlotUpdate');
	}
};

// Initialize events
const { setupEvents, cleanup: cleanupEvents } = useInfoWindowEvents(emit as any);

// Expose methods to parent components
defineExpose({
	open,
	close,
	isOpen: () => infoWindowInstance?.isOpen,
});

// Initialize on mount
onMounted(async () => {
	try {
		// Get first element from slot if it exists
		const slotContent = slotContainer.value?.firstElementChild as HTMLElement;

		// Create info window
		infoWindowInstance = await createInfoWindow(props, slotContent);

		// Setup events
		setupEvents(infoWindowInstance, throttle.value);

		// Initialize watchers
		const { setupWatchers } = useInfoWindowWatchers(props, infoWindowInstance);
		setupWatchers();

		// Watch slot content changes
		const observer = new MutationObserver(() => {
			updateInfoWindowWithSlotContent();
		});

		if (slotContainer.value) {
			observer.observe(slotContainer.value, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true,
			});
		}

		// Open by default (if not using the open/close API)
		if (!props.position && !props.options?.position) {
			// Only auto-open if position is provided
			// Otherwise user needs to call open() manually
		} else {
			open();
		}

		// Emit mounted event
		emit('mounted', infoWindowInstance);
	} catch (e) {
		handleError(e as Error, 'InfoWindow-Mounted');
	}
});

// Clean up on unmount
onBeforeUnmount(() => {
	try {
		if (infoWindowInstance) {
			emit('unmounted', infoWindowInstance);
			cleanupEvents(infoWindowInstance);
			close();
			google.maps.event.clearInstanceListeners(infoWindowInstance);
			infoWindowInstance = null;
		}
	} catch (e) {
		// Info window already cleaned up or not initialized
	}
});
</script>
