/**
 * Position type supported by Google Maps
 */
type MapPosition = google.maps.LatLngLiteral;

/**
 * Bounds type supported by Google Maps
 */
type MapBounds = google.maps.LatLngBoundsLiteral;

/**
 * Props for the Map component
 */
export interface MapProps {
	// Basic map properties (commonly used, exposed as direct props)
	center?: google.maps.LatLngLiteral;
	zoom?: number;
	mapTypeId?: google.maps.MapTypeId;
	mapId?: string; // For Advanced Markers support

	// Common UI control (most frequently toggled)
	disableDefaultUI?: boolean;
	clickableIcons?: boolean;

	// Restriction options
	restriction?: google.maps.MapRestriction;

	// Pass any additional options directly
	options?: google.maps.MapOptions;

	// Component-specific props (not related to Google Maps API)
	throttle?: number;
}

/**
 * Events for the Map component
 * Each event corresponds to a native Google Maps event
 */
export interface MapEvents {
	// Position events
	click: [position: MapPosition | null];
	contextmenu: [position: MapPosition | null];
	dblclick: [position: MapPosition | null];
	mousemove: [position: MapPosition | null];
	mouseout: [position: MapPosition | null];
	mouseover: [position: MapPosition | null];
	rightclick: [position: MapPosition | null];
	center_changed: [center: MapPosition | null];

	// Value events
	bounds_changed: [bounds: MapBounds | null];
	heading_changed: [heading: number | null];
	isfractionalzoomenabled_changed: [value: number | null];
	tilt_changed: [tilt: number | null];
	zoom_changed: [zoom: number | null];
	maptypeid_changed: [type: string | null];
	error: [message: string | undefined];
	capabilities_changed: [capabilities: google.maps.MapCapabilities];
	visible_region_changed: [region: google.maps.VisibleRegion];

	// Empty events
	drag: [];
	dragend: [];
	dragstart: [];
	idle: [];
	projection_changed: [];
	renderingtype_changed: [];
	tilesloaded: [];

	// Map lifecycle events
	mounted: [map: google.maps.Map];
	unmounted: [map: google.maps.Map];
}
