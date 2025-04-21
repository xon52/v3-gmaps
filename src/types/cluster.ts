import type { GmPin } from '.';

// Cluster item
export interface GmClusterItem {
	lat: number;
	lng: number;
	title?: string;
	clickable?: boolean;
	pin?: GmPin;
	onClick?: (item: GmClusterItem) => void;
}

/**
 * Cluster group containing multiple items
 */
export interface GmClusterGroup {
	lat: number;
	lng: number;
	items: GmClusterItem[];
	marker: google.maps.marker.AdvancedMarkerElement;
}

/**
 * Props for the Cluster component
 */
export interface GmClusterProps {
	items: GmClusterItem[];
	maxZoom?: number;
	tileSize?: number; // Size of the tile in pixels at zoom level 0
	pin?: GmPin;
}

/**
 * Events for the Cluster component
 */
export interface ClusterEvents {
	click: [position: { lat: number; lng: number }];
	mounted: [clusters: Record<string, GmClusterGroup>];
	unmounted: [clusters: Record<string, GmClusterGroup>];
}
