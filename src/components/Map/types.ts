import type { GmapsMapOptions, GmapsMapTypeId, GmapsPosition, GmapsBounds } from '../../types/types';

/**
 * Props interface for the Google Maps component
 * Most props are reactive and will update the map when changed
 */
export interface MapProps {
	// Basic map properties
	center?: GmapsPosition;
	clickableIcons?: boolean;
	heading?: number;
	mapTypeId?: string | GmapsMapTypeId;
	mapId?: string; // Map ID for Advanced Markers support
	options?: GmapsMapOptions;
	tilt?: number;
	zoom?: number;
	throttle?: number;

	// Camera options - Google Maps API specific type
	camera?: google.maps.CameraOptions;

	// Restriction options
	restriction?: google.maps.MapRestriction;

	// Styling options
	styles?: google.maps.MapTypeStyle[];

	// Control options
	fullscreenControl?: boolean;
	fullscreenControlOptions?: google.maps.FullscreenControlOptions;
	mapTypeControl?: boolean;
	streetViewControl?: boolean;
	zoomControl?: boolean;

	// Gesture handling
	gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
}

/**
 * Events interface for the Google Maps component
 * Each event corresponds to a native Google Maps event
 */
export interface MapEvents {
	// Position events
	click: [position: GmapsPosition | null];
	contextmenu: [position: GmapsPosition | null];
	dblclick: [position: GmapsPosition | null];
	mousemove: [position: GmapsPosition | null];
	mouseout: [position: GmapsPosition | null];
	mouseover: [position: GmapsPosition | null];
	rightclick: [position: GmapsPosition | null];
	center_changed: [center: GmapsPosition | null];

	// Value events
	bounds_changed: [bounds: GmapsBounds | null];
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

/**
 * Exposed interface for the Google Maps component
 * These methods and properties are exposed to parent components
 */
export interface MapExposed {
	// Map state
	map: google.maps.Map | null;
	ready: boolean;
	error: string | null;

	// Map methods
	fitBounds: (
		bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
		padding?: number | google.maps.Padding
	) => void;
	panTo: (latLng: google.maps.LatLng | google.maps.LatLngLiteral) => void;
	panBy: (x: number, y: number) => void;
	setZoom: (zoom: number) => void;
	getZoom: () => number | null;
	getCenter: () => GmapsPosition | null;
	getBounds: () => GmapsBounds | null;
	setStyles: (styles: google.maps.MapTypeStyle[]) => void;
	getMapType: () => string | null;
}
