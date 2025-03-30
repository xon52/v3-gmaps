/**
 * Utility functions for the Heatmap component
 */
import { getLibrary } from '../..';
import type { HeatmapProps, WeightedLocation, HeatmapDataPoint } from './types';

/**
 * Converts a raw data point to a Google Maps MVCArray or array format required by HeatmapLayer
 * @param dataPoint The data point to convert
 * @returns Converted data point in the format expected by Google Maps
 */
export function formatDataPoint(
	dataPoint: HeatmapDataPoint
): google.maps.LatLng | google.maps.visualization.WeightedLocation {
	// If it's already a weighted location with location field, return as is
	if (typeof dataPoint === 'object' && 'location' in dataPoint && dataPoint.location !== undefined) {
		return dataPoint as google.maps.visualization.WeightedLocation;
	}

	// If it's a LatLng object, return as is
	if (dataPoint instanceof google.maps.LatLng) {
		return dataPoint;
	}

	// If it's a LatLngLiteral, convert to LatLng
	if (typeof dataPoint === 'object' && 'lat' in dataPoint && 'lng' in dataPoint) {
		return new google.maps.LatLng(dataPoint.lat, dataPoint.lng);
	}

	// Fallback (should not happen with proper typing)
	console.warn('Invalid data point format', dataPoint);
	return new google.maps.LatLng(0, 0);
}

/**
 * Formats an array of data points for use with the HeatmapLayer
 * @param data Array of data points to format
 * @returns MVCArray or array of formatted data points
 */
export function formatHeatmapData(
	data: HeatmapDataPoint[]
):
	| google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation>
	| (google.maps.LatLng | google.maps.visualization.WeightedLocation)[] {
	if (!data || !Array.isArray(data)) {
		return [];
	}

	return data.map((point) => formatDataPoint(point));
}

/**
 * Creates and returns a complete options object for a Heatmap by combining base options with component props
 * @param baseOptions Initial options object (like map instance)
 * @param props The component props containing heatmap properties
 * @returns A new options object with all properties resolved
 */
export function resolveOptions(
	baseOptions: Record<string, any>,
	props: HeatmapProps
): google.maps.visualization.HeatmapLayerOptions {
	// Create a new options object, starting with base options and custom options
	const options = { ...baseOptions, ...props.options } as google.maps.visualization.HeatmapLayerOptions;

	// Handle data separately to ensure proper formatting
	if (props.data) {
		options.data = formatHeatmapData(props.data);
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
	props: HeatmapProps,
	map: google.maps.Map
): Promise<google.maps.visualization.HeatmapLayer> => {
	// Create options using the resolveOptions function
	const options = resolveOptions({ map }, props);

	// Create new InfoWindow instance
	const visualizationLibrary = await getLibrary('visualization');
	return new visualizationLibrary.HeatmapLayer(options);

	// Create new HeatmapLayer instance
	return new google.maps.visualization.HeatmapLayer(options);
};

/**
 * Check if the visualization library is loaded
 * @returns True if the visualization library is loaded
 */
export const isVisualizationLoaded = (): boolean => {
	return typeof google !== 'undefined' && google.maps !== undefined && google.maps.visualization !== undefined;
};
