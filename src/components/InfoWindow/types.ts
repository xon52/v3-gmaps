import type { GmPosition } from '../../types';

/**
 * Props for the InfoWindow component
 */
export interface InfoWindowProps {
	// Core properties
	position?: GmPosition;

	// Styling/Content
	content?: string | HTMLElement | Text;
	disableAutoPan?: boolean;
	headerContent?: string;
	headerDisabled?: boolean;
	maxWidth?: number;
	minWidth?: number;
	zIndex?: number;

	// Options - for any other properties
	options?: google.maps.InfoWindowOptions;
}

/**
 * Events for the InfoWindow component
 * Each event corresponds to a native Google Maps event
 */
export interface InfoWindowEvents {
	// Close events
	closeclick: [];

	// Content events
	content_changed: [content: string | HTMLElement | Text];
	domready: [dom: HTMLElement];

	// Property change events
	position_changed: [position: GmPosition | null];
	zindex_changed: [zIndex: number | null];

	// Lifecycle events
	mounted: [infoWindow: google.maps.InfoWindow];
	unmounted: [infoWindow: google.maps.InfoWindow];
}

/**
 * Open options for InfoWindow
 */
export interface InfoWindowOpenOptions {
	anchor?: google.maps.marker.AdvancedMarkerElement;
	map?: google.maps.Map;
	shouldFocus?: boolean;
}
