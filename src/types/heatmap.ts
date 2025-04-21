/**
 * Type definitions for the Heatmap component
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer
 */

// Weighted location for heatmaps
export interface GmWeightedPosition {
	lat: number;
	lng: number;
	weight?: number;
}

/**
 * Props for the Heatmap component
 */
export interface GmHeatmapProps {
	// Core data property
	data: GmWeightedPosition[];

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
export interface GmHeatmapEvents {
	// Custom lifecycle events
	mounted: [heatmap: google.maps.visualization.HeatmapLayer];
	unmounted: [heatmap: google.maps.visualization.HeatmapLayer];
}
