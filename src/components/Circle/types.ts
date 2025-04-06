/**
 * Props for the Circle component
 */
export interface CircleProps {
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

	// Circle specific properties
	center?: google.maps.LatLngLiteral;
	radius?: number;

	// Pass any additional options directly to the Circle constructor
	options?: google.maps.CircleOptions;
}

/**
 * Events for the Circle component
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
 */
export interface CircleEvents {
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

	// Circle specific events
	center_changed: [center: google.maps.LatLngLiteral];
	radius_changed: [radius: number];

	// Custom lifecycle events
	mounted: [circle: google.maps.Circle];
	unmounted: [circle: google.maps.Circle];
}
