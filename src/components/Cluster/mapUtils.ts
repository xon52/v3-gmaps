import type { GmBounds, GmPosition } from '../../types';

/**
 * Calculates expanded map bounds with a buffer margin
 */
export const getExpandedBounds = (map: google.maps.Map): GmBounds => {
	const bufferPercentage = 20;
	const bounds = map.getBounds()?.toJSON();
	if (!bounds) throw new Error('Map bounds not found');

	// Calculate the buffer to add to the bounds
	const latBuffer = Math.abs(bounds.north - bounds.south) * (bufferPercentage / 100);
	const lngBuffer = Math.abs(bounds.east - bounds.west) * (bufferPercentage / 100);

	// Create expanded bounds with limits to prevent exceeding world boundaries
	return {
		north: Math.min(bounds.north + latBuffer, 90),
		south: Math.max(bounds.south - latBuffer, -90),
		east: Math.min(bounds.east + lngBuffer, 180),
		west: Math.max(bounds.west - lngBuffer, -180),
	};
};

/**
 * Checks if a position is within bounds, handling map wrap-around
 */
export const boundsContains = (bounds: GmBounds, position: GmPosition): boolean => {
	// Check latitude bounds first (most common rejection case)
	if (position.lat > bounds.north || position.lat < bounds.south) {
		return false;
	}

	// Check if the map view crosses the 180° meridian (date line)
	const crossesDateLine = bounds.west > bounds.east;

	// Then check longitude bounds
	if (crossesDateLine) {
		// If the map view crosses the date line, we need to check two ranges:
		// 1. From west to 180° (or -180°)
		// 2. From -180° (or 180°) to east
		return position.lng >= bounds.west || position.lng <= bounds.east;
	} else {
		// Normal case: position is between west and east
		return position.lng >= bounds.west && position.lng <= bounds.east;
	}
};

/**
 * Zooms the map to fit a cluster group by centering on a position and increasing zoom level by 1
 */
export const zoomToPosition = (map: google.maps.Map, position: GmPosition): void => {
	// Zoom in 1 level
	const newZoom = (map.getZoom() || 0) + 1;

	// Center on the position and zoom in
	map.setCenter(position);
	map.setZoom(newZoom);
};
