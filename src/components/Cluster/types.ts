import type { Pin } from '../Pin/types';

/**
 * Interface for a single item in a cluster
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
 * Interface for a cluster group
 */
export interface ClusterGroup {
	position: google.maps.LatLngLiteral;
	items: ClusterItem[];
	marker: google.maps.marker.AdvancedMarkerElement;
}

/**
 * Props interface for the Cluster component
 */
export interface ClusterProps {
	items: ClusterItem[];
	maxZoom?: number;
	tileSize?: number; // Size of the tile in pixels at zoom level 0
	pin?: Pin;
}

/**
 * Events interface for the Cluster component
 */
export interface ClusterEvents {
	click: [position: google.maps.LatLngLiteral | null];
	mounted: [clusters: Record<string, ClusterGroup>];
	unmounted: [clusters: Record<string, ClusterGroup>];
}
