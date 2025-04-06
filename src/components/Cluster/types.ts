import type { Pin } from '../';

/**
 * Single item in a cluster
 */
export interface ClusterItem {
	lat: number;
	lng: number;
	title?: string;
	clickable?: boolean;
	pin?: Pin;
	onClick?: (item: ClusterItem) => void;
}

/**
 * Cluster group containing multiple items
 */
export interface ClusterGroup {
	position: google.maps.LatLngLiteral;
	items: ClusterItem[];
	marker: google.maps.marker.AdvancedMarkerElement;
}

/**
 * Props for the Cluster component
 */
export interface ClusterProps {
	items: ClusterItem[];
	maxZoom?: number;
	tileSize?: number; // Size of the tile in pixels at zoom level 0
	pin?: Pin;
}

/**
 * Events for the Cluster component
 */
export interface ClusterEvents {
	click: [position: google.maps.LatLngLiteral | null];
	mounted: [clusters: Record<string, ClusterGroup>];
	unmounted: [clusters: Record<string, ClusterGroup>];
}
