import { getLibrary } from '../../install/api';
import type { ClusterItem, ClusterGroupOptions, ClusterGroup, ActiveClusterGroup } from './types';
import type { Pin } from '../Pin/types';
import { createPinElement } from '../Pin/pinUtils';

const clusterItems: ClusterGroup[] = [];

/**
 * Creates a cluster group from a list of items
 * @param items The items to cluster
 * @param position The position of the cluster
 * @returns A cluster group
 */
const createClusterGroup = async (
	position: google.maps.LatLngLiteral,
	items: ClusterItem[],
	pin?: Pin,
	map?: google.maps.Map
): Promise<ClusterGroup> => {
	return {
		position,
		items,
		marker: await createClusterMarker(items, position, pin, map),
	};
};

/**
 * Creates a marker for a cluster group
 * @param group The cluster group
 * @param options The cluster group options
 * @param map The map instance
 * @returns A marker element
 */
const createClusterMarker = async (
	items: ClusterItem[],
	position: google.maps.LatLngLiteral,
	clusterPin?: Pin,
	map?: google.maps.Map
): Promise<google.maps.marker.AdvancedMarkerElement> => {
	const markerLibrary = await getLibrary('marker');

	// If there is only one item, use its pin, otherwise use the cluster pin or count
	let pin: Pin | undefined;
	if (items.length === 1) {
		if (items[0].pin) {
			pin = items[0].pin;
		}
	} else {
		if (clusterPin) {
			pin = clusterPin;
			// If it's a cluster group and the pin has a glyph with {count}, replace it
			if (typeof pin === 'string' && pin.includes('{count}')) {
				pin = pin.replace('{count}', items.length.toString());
			} else if (typeof pin === 'object' && 'glyph' in pin && pin.glyph?.includes('{count}')) {
				pin = {
					...pin,
					glyph: pin.glyph.replace('{count}', items.length.toString()),
				};
			}
		} else {
			pin = { glyph: items.length.toString(), background: '#4285F4' };
		}
	}

	// Create marker options
	const markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
		position: position,
		content: pin ? await createPinElement(pin) : undefined,
		gmpClickable: true,
		map: map || null,
	};

	// Create marker
	const marker = new markerLibrary.AdvancedMarkerElement(markerOptions);

	// Add click handler if map is provided
	if (map) {
		marker.addEventListener('gmp-click', () => {
			// If it's a single item, call its onClick handler
			if (items.length === 1 && items[0].onClick) {
				items[0].onClick(items[0]);
			}
			// If it's a cluster group, zoom to its bounds
			else if (items.length > 1) {
				zoomToCluster(map, { position, items, marker });
			}
		});
	}

	return marker;
};

/**
 * Checks if a position is within bounds, handling map wrap-around
 * @param bounds The bounds to check against
 * @param position The position to check
 * @returns Whether the position is within bounds
 */
const boundsContains = (bounds: google.maps.LatLngBoundsLiteral, position: google.maps.LatLngLiteral): boolean => {
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

/**
 * Updates marker visibility based on current map bounds
 * @param activeClusters The current active clusters
 * @param map The map instance
 * @returns The same clusters with updated marker visibility
 */
export const updateMarkerVisibility = async (map: google.maps.Map) => {
	const bounds = map.getBounds()?.toJSON();
	if (!bounds) throw new Error('Map bounds not found');
	const center = map.getCenter()?.toJSON();
	if (!center) throw new Error('Map center not found');

	// Check if the map view crosses the 180° meridian (date line)
	const crossesDateLine = bounds.west > bounds.east;

	// Function to check if a position is within the visible bounds
	const isPositionVisible = (position: google.maps.LatLngLiteral): boolean => {
		// First check latitude bounds
		if (position.lat > bounds.north || position.lat < bounds.south) {
			return false;
		}

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

	// Update marker visibility for each cluster
	clusterItems.forEach((item) => {
		const isVisible = isPositionVisible(item.position);
		item.marker.map = isVisible ? map : null;
	});
};

/**
 * Creates a grid of cells for clustering based on zoom level and viewport
 * @param items The items to cluster
 * @param zoom The current zoom level
 * @param tileSize The size of the tile in pixels at zoom level 0
 * @param map The map instance
 * @returns A Map of cell keys to items in that cell
 */
const createGridCells = (
	items: ClusterItem[],
	zoom: number,
	tileSize: number,
	map: google.maps.Map
): Map<string, ClusterItem[]> => {
	// Get the current map bounds
	const bounds = map.getBounds();
	if (!bounds) throw new Error('Map bounds not found');

	// Use fixed grid size of 8x4
	const GRID_COLS = 8;
	const GRID_ROWS = 4;

	// Calculate the cell size in degrees
	const ne = bounds.getNorthEast();
	const sw = bounds.getSouthWest();
	const cellSizeLng = (ne.lng() - sw.lng()) / GRID_COLS;
	const cellSizeLat = (ne.lat() - sw.lat()) / GRID_ROWS;

	// Create a map to store items by cell
	const cells = new Map<string, ClusterItem[]>();

	// Process each item
	items.forEach((item) => {
		// Calculate cell coordinates relative to the southwest corner
		const cellX = Math.floor((item.lng - sw.lng()) / cellSizeLng);
		const cellY = Math.floor((item.lat - sw.lat()) / cellSizeLat);

		// Create cell key
		const cellKey = `${cellX},${cellY}`;

		// Add item to cell
		const cellItems = cells.get(cellKey) || [];
		cellItems.push(item);
		cells.set(cellKey, cellItems);
	});

	return cells;
};

/**
 * Organizes items into clusters based on zoom level and map bounds
 * @param items The items to cluster
 * @param zoom The current zoom level
 * @param maxZoom The maximum zoom level at which to cluster
 * @param map The map instance
 * @param tileSize The size of the tile in pixels at zoom level 0
 * @param clusterPin The pin configuration for cluster groups
 * @returns A record of active cluster groups
 */
export const organiseClusters = async (
	items: ClusterItem[],
	zoom: number,
	maxZoom: number,
	map: google.maps.Map,
	tileSize: number,
	clusterPin?: Pin
): Promise<void> => {
	// Clear existing clusters
	clusterItems.forEach((item) => {
		item.marker.map = null;
	});
	clusterItems.length = 0;

	// If we're past max zoom, show individual items
	if (zoom >= maxZoom) {
		const individualClusters = await Promise.all(
			items.map((item) => createClusterGroup({ lat: item.lat, lng: item.lng }, [item], item.pin, map))
		);
		clusterItems.push(...individualClusters);
		return;
	}

	// Create grid-based clusters using tile size
	const cells = createGridCells(items, zoom, tileSize, map);
	console.log('Cells:', cells.size);

	// Process each grid cell
	for (const [_, cellItems] of cells) {
		if (cellItems.length === 0) continue;

		// Calculate center position for the cluster
		const center = cellItems.reduce(
			(acc: { lat: number; lng: number }, item: ClusterItem) => ({
				lat: acc.lat + item.lat / cellItems.length,
				lng: acc.lng + item.lng / cellItems.length,
			}),
			{ lat: 0, lng: 0 }
		);

		// Create cluster group
		const cluster = await createClusterGroup(center, cellItems, clusterPin, map);
		clusterItems.push(cluster);
	}

	// Update marker visibility
	await updateMarkerVisibility(map);
};

/**
 * Zooms the map to fit a cluster group
 * @param map The map instance
 * @param group The cluster group to zoom to
 */
export const zoomToCluster = (map: google.maps.Map, group: ClusterGroup): void => {
	console.log('zoomToCluster called with:', {
		map: map ? 'Map instance exists' : 'Map instance is null/undefined',
		group: group ? 'Group exists' : 'Group is null/undefined',
		itemsCount: group?.items?.length || 0,
	});

	// Check if map and group are valid
	if (!map) {
		console.error('zoomToCluster: Map instance is null or undefined');
		return;
	}

	if (!group) {
		console.error('zoomToCluster: Group is null or undefined');
		return;
	}

	if (!group.items || group.items.length === 0) {
		console.error('zoomToCluster: Group has no items');
		return;
	}

	// Calculate the center position of the group
	const center = {
		lat: group.position.lat,
		lng: group.position.lng,
	};

	console.log('zoomToCluster: Centering on position:', center);

	try {
		// Get current zoom level
		const currentZoom = map.getZoom() || 0;

		// Zoom in 2 levels
		const newZoom = currentZoom + 1;

		// Center on the group position and zoom in
		map.setCenter(center);
		map.setZoom(newZoom);

		console.log('zoomToCluster: Successfully centered and zoomed to level:', newZoom);
	} catch (error) {
		console.error('zoomToCluster: Error setting center and zoom:', error);
	}
};
