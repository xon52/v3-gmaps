import type { GmClusterItem, GmPin } from '../../types';
import type { GmClusterGroup } from '../../types/cluster';
import { createGridCells } from './gridUtils';
import { createClusterMarker } from './markerUtils';
import { zoomToPosition } from './mapUtils';

/**
 * Creates a cluster group from a list of items
 */
const createClusterGroup = async (
	lat: number,
	lng: number,
	items: GmClusterItem[],
	pin?: GmPin,
	map?: google.maps.Map
): Promise<GmClusterGroup> => {
	const marker = await createClusterMarker(items, lat, lng, pin, map);
	return {
		lat,
		lng,
		items,
		marker,
	};
};

/**
 * Organizes items into clusters based on zoom level and map bounds
 */
export const organiseClusters = async (
	items: GmClusterItem[],
	zoom: number,
	maxZoom: number,
	map: google.maps.Map,
	clusterPin?: GmPin
): Promise<GmClusterGroup[]> => {
	// If we're past max zoom, show individual items
	if (zoom >= maxZoom) {
		const batchSize = 50;
		const clusters: GmClusterGroup[] = [];

		for (let i = 0; i < items.length; i += batchSize) {
			const batch = items.slice(i, i + batchSize);
			const batchClusters = await Promise.all(
				batch.map((item) => createClusterGroup(item.lat, item.lng, [item], item.pin, map))
			);
			clusters.push(...batchClusters);
		}
		return clusters;
	}

	// Create grid-based clusters using Google Maps tiles
	const cells = createGridCells(items, zoom);
	const clusters: GmClusterGroup[] = [];

	// Process each grid cell
	for (const [_, cellItems] of cells) {
		if (cellItems.length === 0) continue;

		// Calculate center position for the cluster
		const lat = cellItems.reduce((sum, item) => sum + item.lat, 0) / cellItems.length;
		const lng = cellItems.reduce((sum, item) => sum + item.lng, 0) / cellItems.length;

		// Create cluster group
		clusters.push(await createClusterGroup(lat, lng, cellItems, clusterPin, map));
	}

	return clusters;
};

/**
 * Zooms the map to fit a cluster group
 */
export const zoomToCluster = (map: google.maps.Map, group: GmClusterGroup): void => {
	if (!map || !group?.items?.length) return;
	zoomToPosition(map, group.lat, group.lng);
};
