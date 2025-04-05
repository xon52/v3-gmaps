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
 * Creates and returns a complete options object for a polyline by combining base options with component props
 * @param baseOptions Initial options object (like map instance)
 * @param props The component props containing polyline properties
 * @returns A new options object with all properties resolved
 */
export function resolvePolylineOptions(
	baseOptions: Record<string, any>,
	props: Record<string, any>
): Record<string, any> {
	// Start with base options and options from props.options
	const options = { ...baseOptions, ...props.options, ...props };

	return options;
}
