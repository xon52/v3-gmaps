/**
 * Converts a polygon's path to an array of positions
 */
export function polygonPathsToPositions(polygon: google.maps.Polygon): google.maps.LatLngLiteral[][] {
	return polygon
		.getPaths()
		.getArray()
		.map((path) => path.getArray().map((point) => point.toJSON()));
}
