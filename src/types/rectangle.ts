import type { GmBounds, GmPosition } from '.';

/**
 * Props for the Rectangle component
 * Properties are reactive and update the shape when changed
 */
export interface GmRectangleProps {
	// Core properties
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;

	// Styling
	fillColor?: string;
	fillOpacity?: number;
	strokeColor?: string;
	strokeOpacity?: number;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;

	// Rectangle specific properties
	bounds?: GmBounds;

	// Pass any additional options directly to the Rectangle constructor
	options?: google.maps.RectangleOptions;
}

/**
 * Events for the Rectangle component
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
 */
export interface GmRectangleEvents {
	// Click events
	click: [event: GmPosition];
	dblclick: [event: GmPosition];
	rightclick: [event: GmPosition];

	// Drag events
	drag: [event: GmPosition];
	dragend: [event: GmPosition];
	dragstart: [event: GmPosition];

	// Mouse events
	mousedown: [event: GmPosition];
	mousemove: [event: GmPosition];
	mouseout: [event: GmPosition];
	mouseover: [event: GmPosition];
	mouseup: [event: GmPosition];

	// Common property change events
	clickable_changed: [clickable: boolean];
	dblclick_changed: [dblclick: boolean];
	rightclick_changed: [rightclick: boolean];
	draggable_changed: [draggable: boolean];
	editable_changed: [editable: boolean];
	visible_changed: [visible: boolean];
	zindex_changed: [zIndex: number];

	// Style property change events
	fillcolor_changed: [fillColor: string];
	fillopacity_changed: [fillOpacity: number];
	strokecolor_changed: [strokeColor: string];
	strokeopacity_changed: [strokeOpacity: number];
	strokeweight_changed: [strokeWeight: number];

	// Rectangle specific events
	bounds_changed: [bounds: GmBounds];

	// Custom lifecycle events
	mounted: [rectangle: google.maps.Rectangle];
	unmounted: [rectangle: google.maps.Rectangle];
}
