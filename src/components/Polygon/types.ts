import type { GmPosition } from '../../types';

/**
 * Props for the Polygon component
 */
export interface PolygonProps {
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

	// Polygon specific properties
	paths?: GmPosition[] | GmPosition[][];
	geodesic?: boolean;

	// Pass any additional options directly to the Polygon constructor
	options?: google.maps.PolygonOptions;
}

/**
 * Events for the Polygon component
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
 */
export interface PolygonEvents {
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

	// Polygon specific events
	paths_changed: [paths: GmPosition[][] | GmPosition[]];

	// Custom lifecycle events
	mounted: [polygon: google.maps.Polygon];
	unmounted: [polygon: google.maps.Polygon];
}
