/**
 * Type definitions for the Heatmap component
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer
 */

/**
 * Weighted location in a heatmap
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#WeightedLocation
 */
interface WeightedLocation {
	location: google.maps.LatLngLiteral | null;
	weight?: number;
}

/**
 * Props for the Heatmap component
 */
export interface HeatmapProps {
	// Core data property
	data?: (google.maps.LatLngLiteral | WeightedLocation)[];

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
 * Events for the Heatmap component
 */
export interface HeatmapEvents {
	// Custom lifecycle events
	mounted: [heatmap: google.maps.visualization.HeatmapLayer];
	unmounted: [heatmap: google.maps.visualization.HeatmapLayer];
}

/**
 * Type helper for heatmap data points
 */
export type HeatmapDataPoint = google.maps.LatLngLiteral | WeightedLocation;
