import type { GmPosition } from '../../types';
import { convertStrokePosition } from '../../types';
import type { PolylineProps } from './types';

/**
 * Converts a polyline's path to an array of positions
 */
export function polylinePathToPositions(polyline: google.maps.Polyline): GmPosition[] {
	return polyline
		.getPath()
		.getArray()
		.map((point) => point.toJSON() as GmPosition);
}

/**
 * Creates the final options object for the Polyline constructor
 * Combines options and props while handling special cases like strokePosition
 *
 * @param props - Component props
 * @param map - The Google Map instance (optional)
 * @returns Combined and processed options for Google Maps Polyline constructor
 */
export function getOptions(props: PolylineProps, map?: google.maps.Map): google.maps.PolylineOptions {
	// Start with default options
	const result: Record<string, any> = {};

	// Add map if provided
	if (map) {
		result.map = map;
	}

	// Process user-provided options first
	if (props.options) {
		Object.assign(result, props.options);

		// Convert strokePosition if present in options
		if (result.strokePosition) {
			result.strokePosition = convertStrokePosition(result.strokePosition);
		}
	}

	// Apply individual props, which take precedence over options object
	// Filter out options and properties that need special handling
	Object.entries(props).forEach(([key, value]) => {
		if (key !== 'options' && value !== undefined) {
			result[key] = value;
		}
	});

	return result as google.maps.PolylineOptions;
}
