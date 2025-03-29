import { App, defineAsyncComponent } from 'vue';
import { ApiOptionsType } from './types/apiOptions';
import { getAPI, isLoaded, getMapsLib, getMarkersLib } from './install/api';
import { init } from './install/init';
import { GmapsError } from './types/errors';

// TODO: Custom prefix for components

// Plugin installation function
export const install = async (_app: App, options: ApiOptionsType): Promise<void> => {
	// Ensure we have options and a valid API key
	if (!options || !options.key) {
		throw new GmapsError('Missing API key, maps will not load correctly');
	}

	try {
		// Initialize Google Maps API through api.ts init function
		await init(options);
	} catch (err) {
		throw GmapsError.from(err);
	}
};

// Expose API access functions
export { getAPI, isLoaded, getMapsLib, getMarkersLib };

// Export types
export * from './types/apiOptions';
export * from './types/types';
export * from './types/enums';
export * from './types/errors';

// Asynchronously load components
export const gmapsMap = defineAsyncComponent(() => import('./components/Map'));
export const gmapsCircle = defineAsyncComponent(() => import('./components/Circle.vue'));
export const gmapsCluster = defineAsyncComponent(() => import('./components/Cluster.vue'));
export const gmapsRectangle = defineAsyncComponent(() => import('./components/Rectangle.vue'));
export const gmapsMarker = defineAsyncComponent(() => import('./components/Marker'));
export const gmapsPolyline = defineAsyncComponent(() => import('./components/Polyline.vue'));
export const gmapsPolygon = defineAsyncComponent(() => import('./components/Polygon.vue'));
export const gmapsPopup = defineAsyncComponent(() => import('./components/Popup.vue'));
export const gmapsInfoWindow = defineAsyncComponent(() => import('./components/InfoWindow.vue'));
export const gmapsHeatmap = defineAsyncComponent(() => import('./components/Heatmap.vue'));

// Default export for the plugin
export default install;
