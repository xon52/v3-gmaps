import type { Pin } from '../Pin/types';

/**
 * Base Cluster Styles
 */
export type BaseClusterStyle =
	| 'DEFAULT'
	| 'PIN'
	| 'CIRCLE'
	| 'SQUARE'
	| 'HEXAGON'
	| 'DIAMOND'
	| 'STAR'
	| 'OUTLINE'
	| 'MINIMAL';

/**
 * Base style properties shared between items and clusters
 */
export interface CustomClusterStyle {
	glyph?: string | HTMLElement;
	background?: string;
	borderColor?: string;
	glyphColor?: string;
	scale?: number;
}

/**
 * Configuration for cluster style that can be either a base style or a custom configuration
 */
export type ClusterStyle = BaseClusterStyle | CustomClusterStyle;

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
 * Interface for cluster group options
 */
export interface ClusterGroupOptions {
	count: number;
	pin?: Pin;
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
 * Interface for an active cluster group with its marker
 */
export interface ActiveClusterGroup {
	group: ClusterGroup;
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
