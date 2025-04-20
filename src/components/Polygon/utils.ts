import type { GmPosition } from '../../types';
import { convertStrokePosition } from '../../types';
import type { GmPolygonProps } from '../../types';

/**
 * Converts a polygon's path to an array of positions
 */
export function polygonPathsToPositions(polygon: google.maps.Polygon): GmPosition[][] {
	return polygon
		.getPaths()
		.getArray()
		.map((path) => path.getArray().map((point) => point.toJSON() as GmPosition));
}

/**
 * Creates the final options object for the Polygon constructor
 * Combines options and props while handling special cases like strokePosition
 *
 * @param props - Component props
 * @param map - The Google Map instance (optional)
 * @returns Combined and processed options for Google Maps Polygon constructor
 */
export function getOptions(props: GmPolygonProps, map?: google.maps.Map): google.maps.PolygonOptions {
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

	return result as google.maps.PolygonOptions;
}
