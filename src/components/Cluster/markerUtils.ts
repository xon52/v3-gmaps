import { getLibrary } from '../../install/api';
import type { ClusterItem, ClusterGroup } from './types';
import type { Pin } from '../Pin/types';
import { createPinElement } from '../Pin/pinUtils';
import { zoomToPosition, getExpandedBounds, boundsContains } from './mapUtils';

/**
 * Prepares pin configuration for a cluster marker
 */
export const preparePinConfig = (items: ClusterItem[], clusterPin?: Pin): Pin | undefined => {
	// If there is only one item, use its pin
	if (items.length === 1) {
		return items[0].pin;
	}

	// For multiple items, use the cluster pin or count
	if (clusterPin) {
		const count = items.length.toString();
		const replaceCount = (str: string): string => str.replace('{count}', count);

		// If it's a cluster group and the pin has a glyph with {count}, replace it
		if (typeof clusterPin === 'string' && clusterPin.includes('{count}')) {
			return replaceCount(clusterPin);
		} else if (typeof clusterPin === 'object' && 'glyph' in clusterPin && clusterPin.glyph?.includes('{count}')) {
			return {
				...clusterPin,
				glyph: replaceCount(clusterPin.glyph as string),
			};
		}
		return clusterPin;
	}

	// Default pin with count
	return { glyph: items.length.toString(), background: '#4285F4' };
};

/**
 * Creates a marker for a cluster group
 */
export const createClusterMarker = async (
	items: ClusterItem[],
	position: google.maps.LatLngLiteral,
	clusterPin?: Pin,
	map?: google.maps.Map
): Promise<google.maps.marker.AdvancedMarkerElement> => {
	const markerLibrary = await getLibrary('marker');
	const pin = preparePinConfig(items, clusterPin);

	// Create marker
	const marker = new markerLibrary.AdvancedMarkerElement({
		position,
		content: pin ? await createPinElement(pin) : undefined,
		gmpClickable: true,
		map: map || null,
	});

	// Add click handler if map is provided
	if (map) {
		if (items.length === 1 && items[0].onClick) {
			marker.addEventListener('gmp-click', () => items[0].onClick!(items[0]));
		} else if (items.length > 1) {
			marker.addEventListener('gmp-click', () => zoomToPosition(map, position));
		}
	}

	return marker;
};

/**
 * Updates the visibility of cluster markers based on map bounds
 */
export const updateMarkerVisibility = (map: google.maps.Map, clusterGroups: ClusterGroup[]): void => {
	const expandedBounds = getExpandedBounds(map);

	for (const group of clusterGroups) {
		group.marker.map = boundsContains(expandedBounds, group.position) ? map : null;
	}
};

/**
 * Cleans up a marker by removing it from the map
 */
export const cleanupMarker = (marker: google.maps.marker.AdvancedMarkerElement): void => {
	if (!marker) return;
	marker.map = null;
	(marker as any).content = null;
};

/**
 * Clears all existing clusters by removing them from the map
 */
export const clearClusters = (clusterGroups: ClusterGroup[]): void => {
	clusterGroups.forEach((group) => {
		if (group.marker) {
			cleanupMarker(group.marker);
			group.marker = null as any;
		}
	});
	clusterGroups.length = 0;
};
