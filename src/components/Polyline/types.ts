/**
 * Props for the Polyline component
 */
export interface PolylineProps {
	// Core properties
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;

	// Styling
	strokeColor?: string;
	strokeOpacity?: number;
	strokePosition?: google.maps.StrokePosition;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;

	// Polyline specific properties
	path?: google.maps.MVCArray<google.maps.LatLngLiteral> | google.maps.LatLngLiteral[];
	geodesic?: boolean;
	icons?: google.maps.IconSequence[];

	// Pass any additional options directly to the Polyline constructor
	options?: google.maps.PolylineOptions;
}

/**
 * Events for the Polyline component
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
 */
export interface PolylineEvents {
	// Click events
	click: [event: google.maps.MapMouseEvent];
	dblclick: [event: google.maps.MapMouseEvent];
	rightclick: [event: google.maps.MapMouseEvent];

	// Drag events
	drag: [event: google.maps.MapMouseEvent];
	dragend: [event: google.maps.MapMouseEvent];
	dragstart: [event: google.maps.MapMouseEvent];

	// Mouse events
	mousedown: [event: google.maps.MapMouseEvent];
	mousemove: [event: google.maps.MapMouseEvent];
	mouseout: [event: google.maps.MapMouseEvent];
	mouseover: [event: google.maps.MapMouseEvent];
	mouseup: [event: google.maps.MapMouseEvent];

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
	strokeposition_changed: [strokePosition: google.maps.StrokePosition];
	strokeweight_changed: [strokeWeight: number];

	// Polyline specific events
	path_changed: [path: google.maps.LatLngLiteral[]];

	// Custom lifecycle events
	mounted: [polyline: google.maps.Polyline];
	unmounted: [polyline: google.maps.Polyline];
}
