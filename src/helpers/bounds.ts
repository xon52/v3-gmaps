import { GmapsBounds, GmapsPosition } from '../types/types';

/**
 * Get the bounds of an array of positions
 * @param positions Array of positions to calculate bounds from
 * @returns GmapsBounds object representing the bounding box
 * @throws Error if positions array is empty
 */
export const getBounds = (positions: GmapsPosition[]): GmapsBounds => {
	if (!positions.length) {
		throw new Error('Cannot calculate bounds of empty position array');
	}

	// Use destructuring for first position for cleaner initialization
	const [first, ...rest] = positions;

	return rest.reduce(
		(acc, pos) => ({
			north: Math.max(acc.north, pos.lat),
			south: Math.min(acc.south, pos.lat),
			east: Math.max(acc.east, pos.lng),
			west: Math.min(acc.west, pos.lng),
		}),
		{ north: first.lat, south: first.lat, east: first.lng, west: first.lng }
	);
};

/**
 * Extend a bounds object by a given factor
 * @param bounds The bounds to extend
 * @param extend Extension factor (0.1 = 10% extension)
 * @returns New GmapsBounds object with extended boundaries
 * @throws Error if extension factor is negative
 */
export const extendBounds = (bounds: GmapsBounds, extend: number = 0.1): GmapsBounds => {
	if (extend < 0) {
		throw new Error('Extension factor cannot be negative');
	}

	// Constants for maximum valid coordinates
	const MAX_LAT = 89.99999;
	const MAX_LNG = 179.99999;

	const span = {
		lat: bounds.north - bounds.south,
		lng: bounds.east - bounds.west,
	};

	const extension = {
		lat: extend * span.lat,
		lng: extend * span.lng,
	};

	return {
		north: Math.min(bounds.north + extension.lat, MAX_LAT),
		south: Math.max(bounds.south - extension.lat, -MAX_LAT),
		east: Math.min(bounds.east + extension.lng, MAX_LNG),
		west: Math.max(bounds.west - extension.lng, -MAX_LNG),
	};
};

/**
 * Check if a position is contained within bounds
 * @param bounds The bounds to check
 * @param position The position to test
 * @returns true if the position is within the bounds, false otherwise
 */
export const boundsContains = (bounds: GmapsBounds, position: GmapsPosition): boolean => {
	// Constants for longitude normalization
	const FULL_CIRCLE = 360;
	const MAX_LNG = 180;

	// Normalize longitude to range [-180, 180]
	const normalizeLng = (lng: number): number => {
		lng = lng % FULL_CIRCLE;
		return lng > MAX_LNG ? lng - FULL_CIRCLE : lng < -MAX_LNG ? lng + FULL_CIRCLE : lng;
	};

	const normalizedPositionLng = normalizeLng(position.lng);
	const normalizedWest = normalizeLng(bounds.west);
	const normalizedEast = normalizeLng(bounds.east);

	// Check latitude bounds first (most common rejection case)
	if (position.lat > bounds.north || position.lat < bounds.south) {
		return false;
	}

	// Handle longitude check including date line crossing
	return normalizedEast > normalizedWest
		? normalizedPositionLng <= normalizedEast && normalizedPositionLng >= normalizedWest
		: normalizedPositionLng <= normalizedEast || normalizedPositionLng >= normalizedWest;
};
