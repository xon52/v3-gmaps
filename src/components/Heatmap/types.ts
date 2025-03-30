/**
 * Type definitions for the Heatmap component
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer
 */

/**
 * Type definition for weighted location in a heatmap
 * Matches Google's WeightedLocation interface
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#WeightedLocation
 */
export interface WeightedLocation {
	location: google.maps.LatLng | null;
	weight?: number;
}

/**
 * Props interface for the Heatmap component
 * Most props are reactive and will update the heatmap when changed
 */
export interface HeatmapProps {
	// Core data property
	data?: (google.maps.LatLng | google.maps.LatLngLiteral | WeightedLocation)[];

	// Display properties
	dissipating?: boolean;
	gradient?: string[];
	maxIntensity?: number;
	opacity?: number;
	radius?: number;

	// Options - for any other properties
	options?: google.maps.visualization.HeatmapLayerOptions;
}

/**
 * Events interface for the Heatmap component
 * Includes lifecycle events for component integration
 */
export interface HeatmapEvents {
	// Custom lifecycle events
	mounted: [heatmap: google.maps.visualization.HeatmapLayer];
	unmounted: [heatmap: google.maps.visualization.HeatmapLayer];
}

/**
 * Type helper for converting our simplified data format to Google's format
 */
export type HeatmapDataPoint = google.maps.LatLng | google.maps.LatLngLiteral | WeightedLocation;
