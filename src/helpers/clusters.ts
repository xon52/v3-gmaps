import { GmapsClusterGroup, GmapsClusterItem, GmapsPosition } from '../types';

/**
 * Calculate the average position from an array of positions
 * @param positions - Array of positions to average
 * @returns The average position
 * @throws Error if positions array is empty
 */
export const getAveragePosition = (positions: GmapsPosition[]): GmapsPosition => {
	if (!positions.length) {
		throw new Error('Cannot calculate average of empty position array');
	}

	const sum = positions.reduce(
		(acc, cur) => ({
			lat: acc.lat + cur.lat,
			lng: acc.lng + cur.lng,
		}),
		{ lat: 0, lng: 0 }
	);

	// Round to 3 decimal places to avoid floating-point precision issues
	return {
		lat: Math.round((sum.lat / positions.length) * 1000) / 1000,
		lng: Math.round((sum.lng / positions.length) * 1000) / 1000,
	};
};

/**
 * Calculate distance between two geographical points using Haversine formula
 * @param pos1 - First position
 * @param pos2 - Second position
 * @returns Distance in kilometers
 */
const calculateDistance = (pos1: GmapsPosition, pos2: GmapsPosition): number => {
	const R = 6371; // Earth's radius in km
	const dLat = ((pos2.lat - pos1.lat) * Math.PI) / 180;
	const dLng = ((pos2.lng - pos1.lng) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((pos1.lat * Math.PI) / 180) *
			Math.cos((pos2.lat * Math.PI) / 180) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
};

/**
 * Organise a given set of positions into tiles of given size and appropriate for a given zoom
 * @param positions - Array of positions to organize into clusters
 * @param zoom - Current map zoom level
 * @param maxZoom - Maximum zoom level before clustering is disabled
 * @param tileSize - Size of the tiles for clustering
 * @returns Record of cluster groups indexed by tile coordinates
 */
export const organiseClusters = (
	positions: GmapsClusterItem[],
	zoom: number,
	maxZoom: number,
	tileSize: number
): Record<string, GmapsClusterGroup> => {
	if (!positions.length) {
		return {};
	}

	const result: Record<string, GmapsClusterGroup> = {};

	// If zoom exceeds maxZoom, do not cluster
	if (zoom >= maxZoom) {
		positions.forEach((position, index) => {
			result[index.toString()] = { position, items: [position] };
		});
		return result;
	}

	// Define grid size based on zoom level
	// At zoom 0, we might divide into 4 quadrants, and increase grid density with zoom
	const gridDivisions = Math.pow(2, Math.min(zoom, 5)); // Limit to avoid too many divisions

	// Find the bounding box for all positions
	let minLat = Infinity,
		maxLat = -Infinity,
		minLng = Infinity,
		maxLng = -Infinity;
	positions.forEach((pos) => {
		minLat = Math.min(minLat, pos.lat);
		maxLat = Math.max(maxLat, pos.lat);
		minLng = Math.min(minLng, pos.lng);
		maxLng = Math.max(maxLng, pos.lng);
	});

	// Add a small buffer to avoid edge issues
	const latBuffer = (maxLat - minLat) * 0.05;
	const lngBuffer = (maxLng - minLng) * 0.05;
	minLat -= latBuffer;
	maxLat += latBuffer;
	minLng -= lngBuffer;
	maxLng += lngBuffer;

	// Calculate cell size for the grid
	const latStep = (maxLat - minLat) / gridDivisions;
	const lngStep = (maxLng - minLng) / gridDivisions;

	// Group positions into grid cells
	const grid: Record<string, GmapsClusterItem[]> = {};

	positions.forEach((position) => {
		// Determine which grid cell this position belongs to
		const latIndex = Math.floor((position.lat - minLat) / latStep);
		const lngIndex = Math.floor((position.lng - minLng) / lngStep);
		const cellKey = `${latIndex}_${lngIndex}`;

		if (!grid[cellKey]) {
			grid[cellKey] = [];
		}

		grid[cellKey].push(position);
	});

	// Create cluster groups from grid cells
	Object.entries(grid).forEach(([cellKey, items], index) => {
		if (items.length > 0) {
			const avgPosition = getAveragePosition(items);
			result[cellKey] = {
				position: avgPosition,
				items: items,
				weight: Math.round((items.length / positions.length) * 100),
			};
		}
	});

	return result;
};
