import type { Pin } from '../';

/**
 * Position type supported by Google Maps
 */
type MapPosition = google.maps.LatLngLiteral;

/**
 * Props for the Marker component
 */
export interface MarkerProps {
	// Core properties
	position?: MapPosition;
	title?: string;
	clickable?: boolean;
	zIndex?: number;

	// Pin configuration
	pin?: Pin;

	// State
	visible?: boolean;
	draggable?: boolean;

	// Collisions
	collisionBehavior?: google.maps.CollisionBehavior;

	// Options object
	options?: Record<string, any>;
}

/**
 * Events for the Marker component
 * Each event corresponds to a native Google Maps event
 */
export interface MarkerEvents {
	// Click events
	click: [position: MapPosition | null];
	contextmenu: [position: MapPosition | null];
	dblclick: [position: MapPosition | null];

	// Drag events
	drag: [position: MapPosition | null];
	dragend: [position: MapPosition | null];
	dragstart: [position: MapPosition | null];

	// Mouse events
	mousedown: [position: MapPosition | null];
	mouseout: [position: MapPosition | null];
	mouseover: [position: MapPosition | null];
	mouseup: [position: MapPosition | null];
	rightclick: [position: MapPosition | null];

	// Property change events
	position_changed: [position: MapPosition | null];
	visible_changed: [visible: boolean];
	clickable_changed: [clickable: boolean];
	draggable_changed: [draggable: boolean];
	zindex_changed: [zIndex: number | null];

	// Lifecycle events
	mounted: [marker: google.maps.marker.AdvancedMarkerElement];
	unmounted: [marker: google.maps.marker.AdvancedMarkerElement];
}
