import type { GmapsPosition } from '../../types/types';

/**
 * Props interface for the AdvancedMarker component
 * Most props are reactive and will update the marker when changed
 */
export interface MarkerProps {
	// Core properties
	position?: GmapsPosition;
	title?: string;
	clickable?: boolean;

	// Content/styling
	element?: HTMLElement;
	glyph?: string | HTMLElement;
	background?: string;
	borderColor?: string;
	glyphColor?: string;
	scale?: number;
	zIndex?: number;

	// State
	visible?: boolean;
	draggable?: boolean;

	// Collisions
	collisionBehavior?: google.maps.CollisionBehavior;

	// Options
	options?: google.maps.marker.AdvancedMarkerElementOptions;
}

/**
 * Events interface for the AdvancedMarker component
 * Each event corresponds to a native Google Maps event
 */
export interface MarkerEvents {
	// Click events
	click: [position: GmapsPosition | null];
	contextmenu: [position: GmapsPosition | null];
	dblclick: [position: GmapsPosition | null];

	// Drag events
	drag: [position: GmapsPosition | null];
	dragend: [position: GmapsPosition | null];
	dragstart: [position: GmapsPosition | null];

	// Mouse events
	mousedown: [position: GmapsPosition | null];
	mouseout: [position: GmapsPosition | null];
	mouseover: [position: GmapsPosition | null];
	mouseup: [position: GmapsPosition | null];
	rightclick: [position: GmapsPosition | null];

	// Property change events
	position_changed: [position: GmapsPosition | null];
	visible_changed: [visible: boolean];
	clickable_changed: [clickable: boolean];
	draggable_changed: [draggable: boolean];
	zindex_changed: [zIndex: number | null];

	// Error events
	error: [message: string];

	// Lifecycle events
	mounted: [marker: google.maps.marker.AdvancedMarkerElement];
	unmounted: [marker: google.maps.marker.AdvancedMarkerElement];
}

/**
 * Exposed interface for the AdvancedMarker component
 * These methods and properties are exposed to parent components
 */
export interface MarkerExposed {
	// Marker state
	marker: google.maps.marker.AdvancedMarkerElement | null;

	// Methods
	getPosition: () => GmapsPosition | null;
	getVisible: () => boolean;
	getZIndex: () => number | null;
	getClickable: () => boolean;
	getDraggable: () => boolean;
}
