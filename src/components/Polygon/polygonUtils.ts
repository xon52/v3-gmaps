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
 * Creates and returns a complete options object for a polygon by combining base options with component props
 * @param baseOptions Initial options object (like map instance)
 * @param props The component props containing polygon properties
 * @returns A new options object with all properties resolved
 */
export function resolvePolygonOptions(
	baseOptions: Record<string, any>,
	props: Record<string, any>
): Record<string, any> {
	// Start with base options and options from props.options
	const options = { ...baseOptions, ...props.options, ...props };

	return options;
}
