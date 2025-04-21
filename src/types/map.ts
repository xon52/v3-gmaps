import type { GmBounds, GmPosition } from '.';

// Map type ID
export type GmMapTypeId = 'hybrid' | 'roadmap' | 'satellite' | 'terrain';

// Map restriction
export interface GmMapRestriction {
	latLngBounds: GmBounds;
	strictBounds?: boolean;
}

/**
 * Props for the Map component
 */
export interface GmMapProps {
	// Basic map properties (commonly used, exposed as direct props)
	center?: GmPosition;
	zoom?: number;
	mapTypeId?: GmMapTypeId;
	mapId?: string; // For Advanced Markers support

	// Common UI control (most frequently toggled)
	disableDefaultUI?: boolean;
	clickableIcons?: boolean;

	// Restriction options
	restriction?: GmMapRestriction;

	// Pass any additional options directly
	options?: google.maps.MapOptions;

	// Component-specific props (not related to Google Maps API)
	throttle?: number;
}

/**
 * Events for the Map component
 * Each event corresponds to a native Google Maps event
 */
export interface GmMapEvents {
	// Position events
	click: [position: GmPosition | null];
	contextmenu: [position: GmPosition | null];
	dblclick: [position: GmPosition | null];
	mousemove: [position: GmPosition | null];
	mouseout: [position: GmPosition | null];
	mouseover: [position: GmPosition | null];
	rightclick: [position: GmPosition | null];
	center_changed: [center: GmPosition | null];

	// Value events
	bounds_changed: [bounds: GmBounds | null];
	heading_changed: [heading: number | null];
	tilt_changed: [tilt: number | null];
	zoom_changed: [zoom: number | null];
	maptypeid_changed: [type: string | null];
	error: [message: string | undefined];
	visible_region_changed: [region: google.maps.VisibleRegion];

	// Empty events
	drag: [];
	dragend: [];
	dragstart: [];
	idle: [];
	projection_changed: [];
	tilesloaded: [];

	// Map lifecycle events
	mounted: [map: google.maps.Map];
	unmounted: [map: google.maps.Map];
}
