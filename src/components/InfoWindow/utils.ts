/**
 * Utility functions for the InfoWindow component
 */
import { getLibrary } from '../../';
import type { InfoWindowProps } from './types';

/**
 * Creates and returns a complete options object for an InfoWindow by combining base options with component props
 * @param baseOptions Initial options object
 * @param props The component props containing InfoWindow properties
 * @returns A new options object with all properties resolved
 */
export function resolveOptions(baseOptions: Record<string, any>, props: InfoWindowProps): Record<string, any> {
	// Create a new options object, starting with base options and custom options
	const options = { ...baseOptions, ...props.options };

	// Add position if provided
	if (props.position) {
		options.position = props.position;
	}

	// Add content if provided in props
	if (props.content) {
		options.content = props.content;
	}

	// Add all other props to options
	if (props.disableAutoPan !== undefined) options.disableAutoPan = props.disableAutoPan;
	if (props.headerContent !== undefined) options.headerContent = props.headerContent;
	if (props.headerDisabled !== undefined) options.headerDisabled = props.headerDisabled;
	if (props.maxWidth !== undefined) options.maxWidth = props.maxWidth;
	if (props.minWidth !== undefined) options.minWidth = props.minWidth;
	if (props.zIndex !== undefined) options.zIndex = props.zIndex;

	return options;
}

/**
 * Create an InfoWindow instance
 *
 * @param props - InfoWindow component props
 * @param content - Content element to show in the info window
 * @returns New InfoWindow instance
 */
export const createInfoWindow = async (
	props: InfoWindowProps,
	content?: HTMLElement
): Promise<google.maps.InfoWindow> => {
	// Create options using the resolveOptions function
	const options = resolveOptions({}, props);

	// Add content if provided as parameter (slot content)
	if (content) {
		options.content = content;
	}

	// Create new InfoWindow instance
	const mapsLibrary = await getLibrary('maps');
	return new mapsLibrary.InfoWindow(options);
};

/**
 * Open an InfoWindow
 *
 * @param infoWindow - InfoWindow instance to open
 * @param map - Map instance
 * @param anchor - Optional anchor (marker) to attach to
 * @param shouldFocus - Whether to focus the InfoWindow
 */
export const openInfoWindow = (
	infoWindow: google.maps.InfoWindow,
	map: google.maps.Map | google.maps.StreetViewPanorama,
	anchor?: google.maps.MVCObject | google.maps.marker.AdvancedMarkerElement,
	shouldFocus?: boolean
): void => {
	const openOptions: google.maps.InfoWindowOpenOptions = {
		map,
	};

	if (anchor) {
		openOptions.anchor = anchor;
	}

	if (shouldFocus !== undefined) {
		openOptions.shouldFocus = shouldFocus;
	}

	infoWindow.open(openOptions);
};

/**
 * Close an InfoWindow
 *
 * @param infoWindow - InfoWindow instance to close
 */
export const closeInfoWindow = (infoWindow: google.maps.InfoWindow): void => {
	infoWindow.close();
};
