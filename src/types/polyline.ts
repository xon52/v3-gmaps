import type { GmPosition } from '.';

// Icon sequence for polylines
export interface GmIconSequence {
	icon: {
		path: string | number;
		fillColor?: string;
		fillOpacity?: number;
		scale?: number;
		strokeColor?: string;
		strokeOpacity?: number;
		strokeWeight?: number;
	};
	offset?: string;
	repeat?: string;
}

/**
 * Props for the Polyline component
 */
export interface GmPolylineProps {
	// Core properties
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;

	// Styling
	strokeColor?: string;
	strokeOpacity?: number;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;

	// Polyline specific properties
	path?: GmPosition[] | GmPosition[][];
	geodesic?: boolean;
	icons?: GmIconSequence[];

	// Pass any additional options directly to the Polyline constructor
	options?: google.maps.PolylineOptions;
}

/**
 * Events for the Polyline component
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
 */
export interface GmPolylineEvents {
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
	strokecolor_changed: [strokeColor: string];
	strokeopacity_changed: [strokeOpacity: number];
	strokeweight_changed: [strokeWeight: number];

	// Polyline specific events
	path_changed: [path: GmPosition[] | GmPosition[][]];

	// Custom lifecycle events
	mounted: [polyline: google.maps.Polyline];
	unmounted: [polyline: google.maps.Polyline];
}
