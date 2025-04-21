import { App, defineAsyncComponent } from 'vue';
import { GmApiOptions } from './types/install';
import { getAPI, getLibrary, waitForReady } from './install/api';
import { init } from './install/init';

// TODO: Custom prefix for components

// Plugin installation function
export const install = async (_app: App, options: GmApiOptions): Promise<void> => {
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

// New components
export const gmCircle = defineAsyncComponent(() => import('./components/Circle/Circle.vue'));
export const gmCluster = defineAsyncComponent(() => import('./components/Cluster/Cluster.vue'));
export const gmHeatmap = defineAsyncComponent(() => import('./components/Heatmap/Heatmap.vue'));
export const gmInfoWindow = defineAsyncComponent(() => import('./components/InfoWindow/InfoWindow.vue'));
export const gmMap = defineAsyncComponent(() => import('./components/Map/Map.vue'));
export const gmMarker = defineAsyncComponent(() => import('./components/Marker/Marker.vue'));
export const gmPolygon = defineAsyncComponent(() => import('./components/Polygon/Polygon.vue'));
export const gmPolyline = defineAsyncComponent(() => import('./components/Polyline/Polyline.vue'));
export const gmRectangle = defineAsyncComponent(() => import('./components/Rectangle/Rectangle.vue'));

// Legacy components - no changes (aliases)
export const gmapsMap = gmMap;
export const gmapsCircle = gmCircle;
export const gmapsCluster = gmCluster;
export const gmapsRectangle = gmRectangle;
export const gmapsPolyline = gmPolyline;
export const gmapsPolygon = gmPolygon;
export const gmapsHeatmap = gmHeatmap;
export const gmapsInfoWindow = gmInfoWindow;

// Legacy marker uses different API, and popup is not replaced in new API
export const gmapsMarker = defineAsyncComponent(() => import('./components/Legacy/Marker/Marker.vue'));
export const gmapsPopup = defineAsyncComponent(() => import('./components/Legacy/Popup.vue'));

// Default export for the plugin
export default install;
