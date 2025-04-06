/**
 * Converts a polyline's path to an array of positions
 */
export function polylinePathToPositions(polyline: google.maps.Polyline): google.maps.LatLngLiteral[] {
	return polyline
		.getPath()
		.getArray()
		.map((point) => point.toJSON());
}
