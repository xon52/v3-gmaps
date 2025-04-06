/**
 * Props for the Rectangle component
 * Properties are reactive and update the shape when changed
 */
export interface RectangleProps {
	// Core properties
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;

	// Styling
	fillColor?: string;
	fillOpacity?: number;
	strokeColor?: string;
	strokeOpacity?: number;
	strokePosition?: google.maps.StrokePosition;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;

	// Rectangle specific properties
	bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;

	// Pass any additional options directly to the Rectangle constructor
	options?: google.maps.RectangleOptions;
}

/**
 * Events for the Rectangle component
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
 */
export interface RectangleEvents {
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
	fillcolor_changed: [fillColor: string];
	fillopacity_changed: [fillOpacity: number];
	strokecolor_changed: [strokeColor: string];
	strokeopacity_changed: [strokeOpacity: number];
	strokeposition_changed: [strokePosition: google.maps.StrokePosition];
	strokeweight_changed: [strokeWeight: number];

	// Rectangle specific events
	bounds_changed: [bounds: google.maps.LatLngBoundsLiteral];

	// Custom lifecycle events
	mounted: [rectangle: google.maps.Rectangle];
	unmounted: [rectangle: google.maps.Rectangle];
}
