/**
 * Base props interface for all Shape components
 * Most props are reactive and will update the shape when changed
 */
export interface ShapeProps {
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
}

/**
 * Props interface for Circle shape
 * Based on Google Maps CircleOptions interface
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions
 */
export interface CircleProps extends ShapeProps {
	center?: google.maps.LatLng | google.maps.LatLngLiteral;
	radius?: number;
	// Pass any additional options directly to the Circle constructor
	options?: google.maps.CircleOptions;
}

/**
 * Props interface for Rectangle shape
 * Based on Google Maps RectangleOptions interface
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions
 */
export interface RectangleProps extends ShapeProps {
	bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
	options?: google.maps.RectangleOptions;
}

/**
 * Props interface for Polygon shape
 * Based on Google Maps PolygonOptions interface
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions
 */
export interface PolygonProps extends ShapeProps {
	paths?:
		| google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
		| google.maps.MVCArray<google.maps.LatLng>
		| google.maps.LatLng[]
		| google.maps.LatLngLiteral[]
		| google.maps.LatLng[][]
		| google.maps.LatLngLiteral[][];
	geodesic?: boolean;
	options?: google.maps.PolygonOptions;
}

/**
 * Props interface for Polyline shape
 * Based on Google Maps PolylineOptions interface
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions
 */
export interface PolylineProps extends ShapeProps {
	path?: google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[] | google.maps.LatLngLiteral[];
	geodesic?: boolean;
	icons?: google.maps.IconSequence[];
	options?: google.maps.PolylineOptions;
}

/**
 * Base events interface for all Shape components
 * Each event corresponds to a native Google Maps event
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon
 */
export interface ShapeEvents {
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
	clickable_changed: [];
	dblclick_changed: [];
	rightclick_changed: [];
	draggable_changed: [];
	editable_changed: [];
	visible_changed: [];
	zindex_changed: [];

	// Style property change events
	fillcolor_changed: [];
	fillopacity_changed: [];
	strokecolor_changed: [];
	strokeopacity_changed: [];
	strokeposition_changed: [];
	strokeweight_changed: [];
}

/**
 * Events specific to Circle shapes
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
 */
export interface CircleEvents extends ShapeEvents {
	// Circle specific events
	center_changed: [];
	radius_changed: [];

	// Custom lifecycle events
	mounted: [circle: google.maps.Circle];
	unmounted: [circle: google.maps.Circle];
}

/**
 * Events specific to Rectangle shapes
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
 */
export interface RectangleEvents extends ShapeEvents {
	// Rectangle specific events
	bounds_changed: [];

	// Custom lifecycle events
	mounted: [rectangle: google.maps.Rectangle];
	unmounted: [rectangle: google.maps.Rectangle];
}

/**
 * Events specific to Polygon shapes
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
 */
export interface PolygonEvents extends ShapeEvents {
	// Polygon specific events - paths_changed not explicitly documented but follows convention
	paths_changed: [];

	// Custom lifecycle events
	mounted: [polygon: google.maps.Polygon];
	unmounted: [polygon: google.maps.Polygon];
}

/**
 * Events specific to Polyline shapes
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
 */
export interface PolylineEvents extends ShapeEvents {
	// Polyline specific events - path_changed not explicitly documented but follows convention
	path_changed: [];

	// Custom lifecycle events
	mounted: [polyline: google.maps.Polyline];
	unmounted: [polyline: google.maps.Polyline];
}
