<template>
	<div style="width: 100%; height: 100%">
		<!-- Error -->
		<map-error v-if="error">{{ error }}</map-error>
		<!-- Loading -->
		<map-spinner v-else-if="!ready" />
		<!-- Map -->
		<div
			v-show="ready && !error"
			ref="mapEl"
			style="width: 100%; height: 100%"></div>
		<!-- Components -->
		<template v-if="ready && !error">
			<slot></slot>
		</template>
	</div>
</template>

<script setup lang="ts">
/**
 * Google Maps Map Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API Map object.
 * It provides a reactive interface to control the map and emits events when map interactions occur.
 *
 * Features:
 * - Reactive props that sync with the map state
 * - Events for all map interactions (click, drag, zoom, etc.)
 * - Throttling for high-frequency events
 * - Support for both legacy and modern Google Maps JS API
 * - Proper cleanup on component unmount
 * - Error handling and loading states
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/map
 */
import { computed, onMounted, onBeforeUnmount } from 'vue';
import MapError from './MapError.vue';
import MapSpinner from './MapSpinner.vue';
import { getLibrary, waitForReady } from '../../index';
import { useMapEvents } from './useMapEvents';
import { resolveOptions } from './useMapOptions';
import { useMapState } from './useMapState';
import { useMapWatchers } from './useMapWatchers';
import type { MapProps, MapEvents } from './types';
import { createMapContext } from './useMapContext';

// Props
const props = withDefaults(defineProps<MapProps>(), {
	center: () => ({ lat: 0, lng: 0 }),
	zoom: 2,
	options: () => ({}),
	disableDefaultUI: undefined,
	clickableIcons: undefined,
});

// Events
const emit = defineEmits<MapEvents>();

// Compute throttle value
const throttle = computed(() => props.throttle || 100);

// Map state for UI elements
const { mapEl, error, ready, handleError } = useMapState(emit);

// Non-reactive map instance
let mapInstance: google.maps.Map | null = null;

// Map-related composables
const { setupEvents, cleanup: cleanupEvents } = useMapEvents(emit);

// Map getter - throws if not available
const getMap = (): google.maps.Map => {
	if (!mapInstance) throw new Error('Map not loaded');
	return mapInstance;
};

// Create map context
createMapContext({ getMap, throttle, handleError });

// Initialize map and setup watchers on mount
onMounted(async () => {
	try {
		// Wait explicitly for the API to be fully ready
		await waitForReady();

		const mapsLibrary = await getLibrary('maps');
		// Use resolveOptions directly instead of buildMapOptions
		const options = resolveOptions({}, props);

		if (!mapEl.value) throw new Error('Map container not available');
		mapInstance = new mapsLibrary.Map(mapEl.value, options);

		// Setup watchers, events and capabilities
		const mapWatchers = useMapWatchers(props, mapInstance);
		await setupEvents(mapInstance, throttle.value);

		// Apply restriction watcher and update state
		mapWatchers.setupRestrictionWatcher();
		emit('mounted', mapInstance);
		ready.value = true;
	} catch (e) {
		handleError(e as Error, 'Map-Mounted');
	}
});

// Cleanup on unmount
onBeforeUnmount(() => {
	if (mapInstance) {
		emit('unmounted', mapInstance);
		cleanupEvents(mapInstance);
		mapInstance = null;
	}
});
</script>
