import type { GmPosition, GmClusterItem, GmPin } from '../../types';

/**
 * Cluster group containing multiple items
 */
export interface ClusterGroup {
	position: GmPosition;
	items: GmClusterItem[];
	marker: google.maps.marker.AdvancedMarkerElement;
}

/**
 * Props for the Cluster component
 */
export interface ClusterProps {
	items: GmClusterItem[];
	maxZoom?: number;
	tileSize?: number; // Size of the tile in pixels at zoom level 0
	pin?: GmPin;
}

/**
 * Events for the Cluster component
 */
export interface ClusterEvents {
	click: [position: GmPosition];
	mounted: [clusters: Record<string, ClusterGroup>];
	unmounted: [clusters: Record<string, ClusterGroup>];
}
