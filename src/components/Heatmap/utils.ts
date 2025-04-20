/**
 * Utility functions for the Heatmap component
 */
import { getLibrary } from '../../';
import type { GmWeightedPosition, GmHeatmapProps } from '../../types';

/**
 * Converts a raw data point to a Google Maps MVCArray or array format required by HeatmapLayer
 * @param dataPoint The data point to convert
 * @returns Converted data point in the format expected by Google Maps
 */
export function formatDataPoint(
	dataPoint: GmWeightedPosition
): google.maps.LatLng | google.maps.visualization.WeightedLocation {
	// If it's already a weighted location with location field, return as is
	if (typeof dataPoint === 'object' && 'location' in dataPoint && dataPoint.location !== undefined) {
		return dataPoint as google.maps.visualization.WeightedLocation;
	}

	// If it's a LatLng object, return as is
	if (dataPoint instanceof google.maps.LatLng) {
		return dataPoint;
	}

	// If it's a LatLngLiteral with lat/lng and weight, convert to WeightedLocation
	if (typeof dataPoint === 'object' && 'lat' in dataPoint && 'lng' in dataPoint && 'weight' in dataPoint) {
		return {
			location: new google.maps.LatLng(dataPoint.lat, dataPoint.lng),
			weight: dataPoint.weight || 1,
		};
	}

	// If it's a LatLngLiteral without weight, convert to LatLng
	if (typeof dataPoint === 'object' && 'lat' in dataPoint && 'lng' in dataPoint) {
		return new google.maps.LatLng(dataPoint.lat, dataPoint.lng);
	}

	// Fallback (should not happen with proper typing)
	return new google.maps.LatLng(0, 0);
}

/**
 * Resolves the options for the heatmap layer
 * @param props The component props
 * @param baseOptions Base options to merge with
 * @returns Resolved options for the heatmap layer
 */
export function resolveOptions(
	props: GmHeatmapProps,
	baseOptions: google.maps.visualization.HeatmapLayerOptions
): google.maps.visualization.HeatmapLayerOptions {
	const options: google.maps.visualization.HeatmapLayerOptions = {
		...baseOptions,
		...props.options,
	};

	// Handle data points with items prop
	if (props.items?.length > 0) {
		options.data = props.items.map(formatDataPoint);
	}

	// Add all other props to options if they are defined
	if (props.dissipating !== undefined) options.dissipating = props.dissipating;
	if (props.gradient !== undefined) options.gradient = props.gradient;
	if (props.maxIntensity !== undefined) options.maxIntensity = props.maxIntensity;
	if (props.opacity !== undefined) options.opacity = props.opacity;
	if (props.radius !== undefined) options.radius = props.radius;

	return options;
}

/**
 * Create a Heatmap instance
 * @param props - Heatmap component props
 * @param map - Google Maps instance
 * @returns New HeatmapLayer instance
 */
export const createHeatmap = async (
	props: GmHeatmapProps,
	map: google.maps.Map
): Promise<google.maps.visualization.HeatmapLayer> => {
	const baseOptions: google.maps.visualization.HeatmapLayerOptions = { map };
	const options = resolveOptions(props, baseOptions);
	const visualizationLibrary = await getLibrary('visualization');

	const heatmap = new visualizationLibrary.HeatmapLayer({ map });

	if (options.data) {
		heatmap.setData(options.data);
	}

	// Set other options
	const { data, ...otherOptions } = options;

	// Ensure gradient is properly handled
	if (props.gradient === undefined) {
		delete otherOptions.gradient;
	}

	if (Object.keys(otherOptions).length > 0) {
		heatmap.setOptions(otherOptions);
	}

	return heatmap;
};

/**
 * Check if the visualization library is loaded
 * @returns True if the visualization library is loaded
 */
export const isVisualizationLoaded = (): boolean => {
	return typeof google !== 'undefined' && google.maps !== undefined && google.maps.visualization !== undefined;
};
