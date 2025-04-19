import { App, defineAsyncComponent } from 'vue';
import { ApiOptions } from './types/install';
import { getAPI, getLibrary, waitForReady } from './install/api';
import { init } from './install/init';

// TODO: Custom prefix for components

// Plugin installation function
export const install = async (_app: App, options: ApiOptions): Promise<void> => {
	// Ensure we have options and a valid API key
	if (!options || !options.key) {
		throw new Error('v3-gmaps :: Missing API key, maps will not load correctly');
	}

	try {
		// Initialize Google Maps API through api.ts init function
		await init(options);
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(`v3-gmaps :: ${e.message}`);
		} else {
			throw new Error('v3-gmaps :: An unknown error occurred');
		}
	}
};

// Expose API access functions
export { getAPI, waitForReady, getLibrary };

// Export types
export * from './types/install';
export * from './types'; // Export all types

// Export component prop and event types directly
export type { CircleProps, CircleEvents } from './components/Circle/types';

// Asynchronously load components
// export const gmapsMap = defineAsyncComponent(() => import('./components/old/Map.vue'));
// export const gmapsCircle = defineAsyncComponent(() => import('./components/old/Circle.vue'));
// export const gmapsCluster = defineAsyncComponent(() => import('./components/old/Cluster.vue'));
// export const gmapsRectangle = defineAsyncComponent(() => import('./components/old/Rectangle.vue'));
// export const gmapsMarker = defineAsyncComponent(() => import('./components/old/Marker.vue'));
// export const gmapsPolyline = defineAsyncComponent(() => import('./components/old/Polyline.vue'));
// export const gmapsPolygon = defineAsyncComponent(() => import('./components/old/Polygon.vue'));
// export const gmapsPopup = defineAsyncComponent(() => import('./components/old/Popup.vue'));
// export const gmapsInfoWindow = defineAsyncComponent(() => import('./components/old/InfoWindow.vue'));
// export const gmapsHeatmap = defineAsyncComponent(() => import('./components/old/Heatmap.vue'));
export const gmCircle = defineAsyncComponent(() => import('./components/Circle/Circle.vue'));
export const gmCluster = defineAsyncComponent(() => import('./components/Cluster/Cluster.vue'));
export const gmHeatmap = defineAsyncComponent(() => import('./components/Heatmap/Heatmap.vue'));
export const gmInfoWindow = defineAsyncComponent(() => import('./components/InfoWindow/InfoWindow.vue'));
export const gmMap = defineAsyncComponent(() => import('./components/Map/Map.vue'));
export const gmMarker = defineAsyncComponent(() => import('./components/Marker/Marker.vue'));
export const gmPolygon = defineAsyncComponent(() => import('./components/Polygon/Polygon.vue'));
export const gmPolyline = defineAsyncComponent(() => import('./components/Polyline/Polyline.vue'));
export const gmRectangle = defineAsyncComponent(() => import('./components/Rectangle/Rectangle.vue'));

// Default export for the plugin
export default install;
