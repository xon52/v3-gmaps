import { getLibrary } from '../../';
import type { MarkerProps } from './types';
import type { GmPin } from '../../types';
import { createPinElement } from '../';

/**
 * Creates the final options object for the Marker constructor
 * Combines options and props while handling special cases
 *
 * @param props - Component props
 * @param map - The Google Map instance (optional)
 * @returns Combined and processed options for Google Maps Marker constructor
 */
export function getOptions(props: MarkerProps, map?: google.maps.Map): Record<string, any> {
	// Start with default options
	const result: Record<string, any> = {};

	// Add map if provided
	if (map) {
		result.map = map;
	}

	// Process user-provided options first
	if (props.options) {
		Object.assign(result, props.options);
	}

	// Apply individual props, which take precedence over options object
	// Filter out options and properties that need special handling
	Object.entries(props).forEach(([key, value]) => {
		if (key !== 'options' && value !== undefined) {
			result[key] = value;
		}
	});

	return result;
}

/**
 * Creates a Google Maps Advanced Marker
 * Handles all setup of marker options, pin elements, and properties
 */
export const createMarker = async (
	props: MarkerProps,
	map: google.maps.Map,
	pin?: GmPin
): Promise<google.maps.marker.AdvancedMarkerElement> => {
	// Create marker options using the getOptions function
	const options = getOptions(props, map);

	// Get the marker library
	const markerLibrary = await getLibrary('marker');

	// Use slot content if provided (highest priority)
	options.content = await createPinElement(pin);

	// Create and return the marker
	const marker = new markerLibrary.AdvancedMarkerElement(options);

	// Set visibility separately (needs to be set after creation)
	if (props.visible !== undefined) {
		marker.setAttribute('gmp-visible', props.visible.toString());
	}

	return marker;
};

/**
 * Updates an existing marker with new properties
 */
export const updateMarker = (marker: google.maps.marker.AdvancedMarkerElement, props: Partial<MarkerProps>): void => {
	// Update core properties
	if (props.position) marker.position = props.position;
	if (props.title !== undefined) marker.title = props.title;
	if (props.zIndex !== undefined) marker.zIndex = props.zIndex;
	if (props.visible !== undefined) {
		marker.hidden = !props.visible;
	}
	if (props.clickable !== undefined) {
		marker.gmpClickable = props.clickable;
	}
	if (props.draggable !== undefined) {
		marker.gmpDraggable = props.draggable;
	}

	// Note: Updating content/pin element requires recreating the marker
	// This function only handles properties that can be updated in-place
};

/**
 * Updates a marker by recreating it with new properties
 * This is necessary when changing styling properties that can't be updated in-place
 */
export const recreateMarker = async (
	marker: google.maps.marker.AdvancedMarkerElement,
	props: MarkerProps,
	pin?: GmPin
): Promise<google.maps.marker.AdvancedMarkerElement> => {
	// Get the current map
	const currentMap = marker.map;

	// Clean up current marker
	marker.map = null;

	// Create a new marker with the provided props
	return await createMarker(props, currentMap as google.maps.Map, pin);
};
