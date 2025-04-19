/**
 * Type definitions for the Heatmap component
 * @see https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayer
 */

import type { GmWeightedPosition } from '../../types';

/**
 * Props for the Heatmap component
 */
export interface HeatmapProps {
	// Core data property
	items: GmWeightedPosition[];

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
