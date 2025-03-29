import { getMarkersLib } from '../../install/api';
import type { MarkerProps } from './types';

/**
 * Creates a Google Maps Advanced Marker
 * Handles all setup of marker options, pin elements, and properties
 */
export const createMarker = async (
	props: MarkerProps,
	map: google.maps.Map
): Promise<google.maps.marker.AdvancedMarkerElement> => {
	// Create marker options object
	const options: google.maps.marker.AdvancedMarkerElementOptions = {
		...props.options,
		map,
	};

	// Get the marker library
	const markerLibrary = await getMarkersLib();

	// Set core properties
	if (props.position) options.position = props.position;
	if (props.title !== undefined) options.title = props.title;
	if (props.clickable !== undefined) options.gmpClickable = props.clickable;
	if (props.draggable !== undefined) options.gmpDraggable = props.draggable;
	if (props.zIndex !== undefined) options.zIndex = props.zIndex;
	if (props.collisionBehavior !== undefined) {
		options.collisionBehavior = props.collisionBehavior as google.maps.CollisionBehavior;
	}

	// Check if we need a pin element
	const needsPinElement =
		props.background || props.borderColor || props.glyphColor || props.scale !== undefined || props.glyph;

	// Create pin element if needed
	if (needsPinElement) {
		const pinOptions: google.maps.marker.PinElementOptions = {};

		if (props.background) pinOptions.background = props.background;
		if (props.borderColor) pinOptions.borderColor = props.borderColor;
		if (props.glyphColor) pinOptions.glyphColor = props.glyphColor;
		if (props.scale !== undefined) pinOptions.scale = props.scale;

		// Handle glyph
		if (props.glyph) {
			if (typeof props.glyph === 'string') {
				try {
					// Try to parse as URL first
					const url = new URL(props.glyph);
					pinOptions.glyph = url;
				} catch (e) {
					// Otherwise set as string
					pinOptions.glyph = props.glyph;
				}
			} else {
				pinOptions.glyph = props.glyph;
			}
		}

		// Create the pin and set as content
		const pinElement = new markerLibrary.PinElement(pinOptions);
		options.content = pinElement.element;
	}

	// Set custom element if provided (overrides pin element)
	if (props.element) {
		options.content = props.element;
	}

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
		marker.collisionBehavior = props.collisionBehavior as google.maps.CollisionBehavior;
	}

	// Note: Updating content/pin element requires recreating the marker
	// This function only handles properties that can be updated in-place
};
