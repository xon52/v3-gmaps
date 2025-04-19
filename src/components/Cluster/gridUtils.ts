import type { GmClusterItem } from '../../types';

// Cache for memoized functions
const memoizedResults = new Map<string, { x: number; y: number }>();

/**
 * Converts lat/lng to tile coordinates using Google Maps tile system
 * @param lat Latitude
 * @param lng Longitude
 * @param zoom Zoom level
 * @returns Tile coordinates {x, y}
 */
export const latLngToTile = (lat: number, lng: number, zoom: number): { x: number; y: number } => {
	// Create a cache key
	const cacheKey = `tile_${lat}_${lng}_${zoom}`;

	// Check if we have cached results
	if (memoizedResults.has(cacheKey)) {
		return memoizedResults.get(cacheKey)!;
	}

	const x = Math.floor(((lng + 180) / 360) * Math.pow(2, zoom));
	const y = Math.floor(
		((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
			Math.pow(2, zoom)
	);

	const result = { x, y };

	// Cache the result
	memoizedResults.set(cacheKey, result);

	return result;
};

/**
 * Creates a grid of cells for clustering based on Google Maps tiles
 * @param items The items to cluster
 * @param zoom The current zoom level
 * @returns A Map of cell keys to items in that cell
 */
export const createGridCells = (items: GmClusterItem[], zoom: number): Map<string, GmClusterItem[]> => {
	// Create a map to store items by cell
	const cells = new Map<string, GmClusterItem[]>();

	// Process each item
	for (const item of items) {
		// Convert lat/lng to tile coordinates
		const { x, y } = latLngToTile(item.position.lat, item.position.lng, zoom);

		// Create cell key and add item to cell
		const cellKey = `${x},${y}`;
		if (!cells.has(cellKey)) {
			cells.set(cellKey, []);
		}
		cells.get(cellKey)!.push(item);
	}

	return cells;
};
