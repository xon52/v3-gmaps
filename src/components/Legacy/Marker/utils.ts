import type { LegacyMarkerProps } from './types.js';

/**
 * Converts the animation string to the Google Maps Animation enum
 */
export function convertAnimation(animation?: string): google.maps.Animation | null {
	if (!animation) return null;
	if (animation === 'BOUNCE') return google.maps.Animation.BOUNCE;
	if (animation === 'DROP') return google.maps.Animation.DROP;
	return null;
}

/**
 * Creates the final options object for the Legacy Marker constructor
 * Combines options and props while handling special cases
 *
 * @param props - Component props
 * @param map - The Google Map instance (optional)
 * @returns Combined and processed options for Google Maps Marker constructor
 */
export function getOptions(props: LegacyMarkerProps, map?: google.maps.Map): google.maps.MarkerOptions {
	// Start with default options
	const result: google.maps.MarkerOptions = {};

	// Add map if provided
	if (map) {
		result.map = map;
	}

	// Process user-provided options first
	if (props.options) {
		Object.assign(result, props.options);
	}

	// Apply individual props, which take precedence over options object
	if (props.animation) result.animation = convertAnimation(props.animation);
	if (props.clickable !== undefined) result.clickable = props.clickable;
	if (props.cursor !== undefined) result.cursor = props.cursor;
	if (props.draggable !== undefined) result.draggable = props.draggable;
	if (props.icon !== undefined) result.icon = props.icon as string | google.maps.Icon | google.maps.Symbol;
	if (props.label !== undefined) result.label = props.label as string | google.maps.MarkerLabel;
	if (props.opacity !== undefined) result.opacity = props.opacity;
	if (props.position !== undefined) result.position = props.position;
	if (props.shape !== undefined) result.shape = props.shape as google.maps.MarkerShape;
	if (props.title !== undefined) result.title = props.title;
	if (props.visible !== undefined) result.visible = props.visible;
	if (props.zIndex !== undefined) result.zIndex = props.zIndex;

	return result;
}

/**
 * Creates a Google Maps Legacy Marker
 */
export const createMarker = (props: LegacyMarkerProps, map: google.maps.Map): google.maps.Marker => {
	// Create marker options
	const options = getOptions(props, map);

	// Create and return the marker
	return new google.maps.Marker(options);
};

/**
 * Updates an existing marker with new properties
 * All properties can be updated in-place for the legacy marker
 */
export const updateMarker = (marker: google.maps.Marker, props: Partial<LegacyMarkerProps>): void => {
	if (props.animation !== undefined) marker.setAnimation(convertAnimation(props.animation));
	if (props.clickable !== undefined) marker.setClickable(props.clickable);
	if (props.cursor !== undefined) marker.setCursor(props.cursor);
	if (props.draggable !== undefined) marker.setDraggable(props.draggable);
	if (props.icon !== undefined) marker.setIcon(props.icon as string | google.maps.Icon | google.maps.Symbol);
	if (props.label !== undefined) marker.setLabel(props.label as string | google.maps.MarkerLabel);
	if (props.opacity !== undefined) marker.setOpacity(props.opacity);
	if (props.options !== undefined) marker.setOptions(props.options);
	if (props.position !== undefined) marker.setPosition(props.position);
	if (props.shape !== undefined) marker.setShape(props.shape as google.maps.MarkerShape);
	if (props.title !== undefined) marker.setTitle(props.title);
	if (props.visible !== undefined) marker.setVisible(props.visible);
	if (props.zIndex !== undefined) marker.setZIndex(props.zIndex);
};
