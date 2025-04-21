import type { GmPosition } from '.';

/**
 * Props for the Circle component
 */
export interface GmCircleProps {
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

	// Circle specific properties
	center?: GmPosition;
	radius?: number;

	// Pass any additional options directly to the Circle constructor
	options?: google.maps.CircleOptions;
}

/**
 * Events for the Circle component
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
 */
export interface GmCircleEvents {
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

	// Circle specific events
	center_changed: [center: GmPosition];
	radius_changed: [radius: number];

	// Custom lifecycle events
	mounted: [circle: google.maps.Circle];
	unmounted: [circle: google.maps.Circle];
}
