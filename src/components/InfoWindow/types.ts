/**
 * Type alias for position types supported by Google Maps
 */
type MapPosition = google.maps.LatLng | google.maps.LatLngLiteral;

/**
 * Props interface for the InfoWindow component
 * Most props are reactive and will update the InfoWindow when changed
 */
export interface InfoWindowProps {
	// Core properties
	position?: MapPosition;

	// Styling/Content
	ariaLabel?: string;
	content?: string | HTMLElement | Text;
	disableAutoPan?: boolean;
	headerContent?: string | HTMLElement | Text;
	headerDisabled?: boolean;
	maxWidth?: number;
	minWidth?: number;
	pixelOffset?: google.maps.Size;
	zIndex?: number;

	// Options - for any other properties
	options?: google.maps.InfoWindowOptions;
}

/**
 * Events interface for the InfoWindow component
 * Each event corresponds to a native Google Maps event
 */
export interface InfoWindowEvents {
	// Close events
	closeclick: [];

	// Content events
	content_changed: [];
	domready: [];

	// Property change events
	position_changed: [position: MapPosition | null];
	zindex_changed: [zIndex: number | null];

	// Lifecycle events
	mounted: [infoWindow: google.maps.InfoWindow];
	unmounted: [infoWindow: google.maps.InfoWindow];
}

/**
 * Open options for InfoWindow
 */
export interface InfoWindowOpenOptions {
	anchor?: google.maps.MVCObject | google.maps.marker.AdvancedMarkerElement;
	map?: google.maps.Map | google.maps.StreetViewPanorama;
	shouldFocus?: boolean;
}
