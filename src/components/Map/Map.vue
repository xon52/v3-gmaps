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
 * Wraps the Google Maps JavaScript API Map object with reactive controls and events.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/map
 */
import { computed, onMounted, onBeforeUnmount } from 'vue';
import MapError from './MapError.vue';
import MapSpinner from './MapSpinner.vue';
import { getLibrary, waitForReady } from '../../';
import { useMapEvents } from './useEvents';
import { resolveOptions } from './useOptions';
import { useMapState } from './useState';
import { useMapWatchers } from './useWatchers';
import type { GmMapProps, GmMapEvents } from '../../types/map';
import { createMapContext } from './useContext';

// Props
const props = withDefaults(defineProps<GmMapProps>(), {
	options: () => ({}),
	disableDefaultUI: undefined,
	clickableIcons: undefined,
});

// Events
const emit = defineEmits<GmMapEvents>();

// Compute throttle value
const throttle = computed(() => props.throttle || 200);

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
		const options = {
			...resolveOptions({}, props),
			noClear: true, // Add this to help with marker wrap-around
		};

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
