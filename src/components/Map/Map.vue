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
import { getMapsLib } from '../../index';
import { useMapEvents } from './useMapEvents';
import { useMapMethods } from './useMapMethods';
import { useMapOptions } from './useMapOptions';
import { useMapState } from './useMapState';
import { useMapWatchers } from './useMapWatchers';
import type { MapProps, MapEvents, MapExposed } from './types';
import { createMapContext } from './useMapContext';

// Props
const props = withDefaults(defineProps<MapProps>(), {
	throttle: 100,
	options: () => ({}),
	fullscreenControl: false,
	mapTypeControl: true,
	streetViewControl: true,
	zoomControl: true,
});

// Events
const emit = defineEmits<MapEvents>();

// Compute throttle value
const throttle = computed(() => +props.throttle);

// Map state for UI elements
const { mapEl, error, ready, capabilities, visibleRegion, renderingType, handleError, updateCapabilities } =
	useMapState(emit);

// Non-reactive map instance
let mapInstance: google.maps.Map | null = null;

// Map-related composables
const { buildMapOptions } = useMapOptions(props);
const { setupEvents, cleanup: cleanupEvents } = useMapEvents(emit);

// Initialize map methods and watchers after the map is created
let mapMethods: ReturnType<typeof useMapMethods>;
let mapWatchers: ReturnType<typeof useMapWatchers>;

// Map getter - throws if not available
const getMap = (): google.maps.Map => {
	if (!mapInstance) throw new Error('Map not loaded');
	return mapInstance;
};

// Create map context instead of using provide/inject
createMapContext({
	getMap,
	throttle,
	handleError,
});

// @TODO: A hard refresh causes an error.

// Initialize map and setup watchers on mount
onMounted(async () => {
	try {
		// Get Maps Library
		const mapsLibrary = await getMapsLib();

		// Configure options
		const options = buildMapOptions();

		// Create map
		if (!mapEl.value) throw new Error('Map container not available');
		mapInstance = new mapsLibrary.Map(mapEl.value, options);

		// Initialize methods with the actual map instance
		mapMethods = useMapMethods(mapInstance);
		mapWatchers = useMapWatchers(props, mapInstance);

		// Setup events and capabilities
		await setupEvents(mapInstance, throttle.value);
		updateCapabilities(mapInstance);
		emit('mounted', mapInstance);
		ready.value = true;

		// Setup watchers now that map is initialized
		mapWatchers.setupCameraWatcher(mapMethods.moveCamera);
		mapWatchers.setupRestrictionWatcher();
	} catch (e) {
		handleError(e as Error, 'Map-Init');
	}
});

// Cleanup on unmount
onBeforeUnmount(() => {
	try {
		if (mapInstance) {
			emit('unmounted', mapInstance);
			cleanupEvents(mapInstance);
			mapInstance = null;
		}
	} catch (e) {
		// Map already cleaned up or not initialized
	}
});

// Expose state and methods to parent components
defineExpose<MapExposed>({
	get map() {
		return mapInstance;
	},
	get ready() {
		return ready.value;
	},
	get error() {
		return error.value;
	},
	fitBounds: (...args: Parameters<typeof mapMethods.fitBounds>) => mapMethods?.fitBounds(...args),
	panTo: (latLng: google.maps.LatLng | google.maps.LatLngLiteral) => mapMethods?.panTo(latLng),
	panBy: (x: number, y: number) => mapMethods?.panBy(x, y),
	setZoom: (zoom: number) => mapMethods?.setZoom(zoom),
	getZoom: () => mapMethods?.getZoom() ?? null,
	getCenter: () => mapMethods?.getCenter() ?? null,
	getBounds: () => mapMethods?.getBounds() ?? null,
	setStyles: (styles: google.maps.MapTypeStyle[]) => mapMethods?.setStyles(styles),
	getMapType: () => mapMethods?.getMapType() ?? null,
});
</script>
