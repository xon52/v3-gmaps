import { convertStrokePosition } from '../../types';
import type { GmCircleProps } from '../../types';

/**
 * Creates the final options object for the Circle constructor
 * Combines options and props while handling special cases like strokePosition
 *
 * @param props - Component props
 * @param map - The Google Map instance (optional)
 * @returns Combined and processed options for Google Maps Circle constructor
 */
export function getOptions(props: GmCircleProps, map?: google.maps.Map): google.maps.CircleOptions {
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

	return result as google.maps.CircleOptions;
}
