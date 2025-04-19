import { getLibrary } from '../../';
import type { MarkerProps } from './types';
import type { GmPin } from '../../types';
import { createPinElement } from '../';

/**
 * Creates and returns a complete options object for a marker by combining base options with component props
 * @param baseOptions Initial options object (like map instance)
 * @param props The component props containing marker properties
 * @returns A new options object with all properties resolved
 */
export function resolveOptions(baseOptions: Record<string, any>, props: MarkerProps): Record<string, any> {
	// Create a new options object, starting with base options
	const options = { ...baseOptions };

	// Apply core marker properties
	if (props.position) options.position = props.position;
	if (props.title !== undefined) options.title = props.title;
	if (props.clickable !== undefined) options.gmpClickable = props.clickable;
	if (props.draggable !== undefined) options.gmpDraggable = props.draggable;
	if (props.zIndex !== undefined) options.zIndex = props.zIndex;
	if (props.collisionBehavior !== undefined) {
		options.collisionBehavior = google.maps.CollisionBehavior[props.collisionBehavior];
	}

	return options;
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
	// Create marker options using the resolveOptions function
	const options = resolveOptions({ map }, props);

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
	if (props.collisionBehavior !== undefined) {
		marker.collisionBehavior = google.maps.CollisionBehavior[props.collisionBehavior];
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
