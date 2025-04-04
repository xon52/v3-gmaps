// Shape type enum for identifying shape classes
export enum ShapeType {
	CIRCLE = 'Circle',
	RECTANGLE = 'Rectangle',
	POLYGON = 'Polygon',
	POLYLINE = 'Polyline',
}

/**
 * Converts a polygon's path to an array of positions
 */
export function polygonPathsToPositions(polygon: google.maps.Polygon): google.maps.LatLngLiteral[][] {
	return polygon
		.getPaths()
		.getArray()
		.map((path) => path.getArray().map((point) => point.toJSON()));
}

/**
 * Converts a polyline's path to an array of positions
 */
export function polylinePathToPositions(polyline: google.maps.Polyline): google.maps.LatLngLiteral[] {
	return polyline
		.getPath()
		.getArray()
		.map((point) => point.toJSON());
}

/**
 * Utility to determine if a shape is a specific type
 */
export function isShapeType<T extends google.maps.MVCObject>(
	shape: any,
	constructor: new (...args: any[]) => T
): shape is T {
	return shape instanceof constructor;
}

/**
 * Creates and returns a complete options object for a shape by combining base options with component props
 * @param baseOptions Initial options object (like map instance)
 * @param props The component props containing shape properties
 * @param shapeType Type of shape to resolve options for
 * @returns A new options object with all properties resolved
 */
export function resolveOptions(
	baseOptions: Record<string, any>,
	props: Record<string, any>,
	shapeType: ShapeType
): Record<string, any> {
	// Start with base options and options from props.options
	const options = { ...baseOptions, ...props.options, ...props };

	// // Common properties for most shapes - these take priority over options
	// if (props.clickable !== undefined) options.clickable = props.clickable;
	// if (props.draggable !== undefined) options.draggable = props.draggable;
	// if (props.editable !== undefined) options.editable = props.editable;
	// if (props.fillColor) options.fillColor = props.fillColor;
	// if (props.fillOpacity !== undefined) options.fillOpacity = props.fillOpacity;
	// if (props.strokeColor) options.strokeColor = props.strokeColor;
	// if (props.strokeOpacity !== undefined) options.strokeOpacity = props.strokeOpacity;
	// if (props.strokePosition !== undefined) options.strokePosition = props.strokePosition;
	// if (props.strokeWeight !== undefined) options.strokeWeight = props.strokeWeight;
	// if (props.visible !== undefined) options.visible = props.visible;
	// if (props.zIndex !== undefined) options.zIndex = props.zIndex;

	// // Shape-specific properties - these take priority over options
	// if (shapeType === ShapeType.CIRCLE) {
	// 	if (props.center) options.center = props.center;
	// 	if (props.radius !== undefined) options.radius = props.radius;
	// } else if (shapeType === ShapeType.RECTANGLE) {
	// 	if (props.bounds) options.bounds = props.bounds;
	// } else if (shapeType === ShapeType.POLYGON) {
	// 	if (props.paths) options.paths = props.paths;
	// 	if (props.path) options.paths = props.path; // For backward compatibility
	// } else if (shapeType === ShapeType.POLYLINE) {
	// 	if (props.path) options.path = props.path;
	// }

	return options;
}
