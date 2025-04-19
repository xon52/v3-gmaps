import type { GmPosition, GmPin } from '../../types';

/**
 * Props for the Marker component
 */
export interface MarkerProps {
	// Core properties
	position?: GmPosition;
	title?: string;
	clickable?: boolean;
	zIndex?: number;

	// Pin configuration
	pin?: GmPin;

	// State
	visible?: boolean;
	draggable?: boolean;

	// Options object
	options?: Record<string, any>;
}

/**
 * Events for the Marker component
 * Each event corresponds to a native Google Maps event
 */
export interface MarkerEvents {
	// Click events
	click: [position: GmPosition];
	contextmenu: [position: GmPosition];
	dblclick: [position: GmPosition];

	// Drag events
	drag: [position: GmPosition];
	dragend: [position: GmPosition];
	dragstart: [position: GmPosition];

	// Mouse events
	mousedown: [position: GmPosition];
	mouseout: [position: GmPosition];
	mouseover: [position: GmPosition];
	mouseup: [position: GmPosition];
	rightclick: [position: GmPosition];

	// Property change events
	position_changed: [position: GmPosition];
	visible_changed: [visible: boolean];
	clickable_changed: [clickable: boolean];
	draggable_changed: [draggable: boolean];
	zindex_changed: [zIndex: number];

	// Lifecycle events
	mounted: [marker: google.maps.marker.AdvancedMarkerElement];
	unmounted: [marker: google.maps.marker.AdvancedMarkerElement];
}
