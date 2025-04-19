/**
 * Common type definitions for Vue Google Maps components
 * These types provide local definitions that satisfy Google Maps API types
 */

// Basic position types
export interface GmPosition {
	lat: number;
	lng: number;
}

// Weighted location for heatmaps
export interface GmWeightedPosition {
	lat: number;
	lng: number;
	weight?: number;
}

// Bounds type
export interface GmBounds {
	north: number;
	east: number;
	south: number;
	west: number;
}

// Marker collision behavior
export type GmCollisionBehavior = 'OPTIONAL_AND_HIDES_LOWER_PRIORITY' | 'REQUIRED' | 'REQUIRED_AND_HIDES_OPTIONAL';

// Stroke position
export type GmStrokePosition = 'CENTER' | 'INSIDE' | 'OUTSIDE';

// Helper function to convert string stroke position to Google Maps enum value
export function convertStrokePosition(position?: GmStrokePosition): google.maps.StrokePosition | undefined {
	if (!position) return undefined;

	switch (position) {
		case 'CENTER':
			return google.maps.StrokePosition.CENTER;
		case 'INSIDE':
			return google.maps.StrokePosition.INSIDE;
		case 'OUTSIDE':
			return google.maps.StrokePosition.OUTSIDE;
		default:
			return undefined;
	}
}

// Map type ID
export type GmMapTypeId = 'hybrid' | 'roadmap' | 'satellite' | 'terrain';

// Visible region
export interface GmVisibleRegion {
	farLeft: GmPosition;
	farRight: GmPosition;
	nearLeft: GmPosition;
	nearRight: GmPosition;
	latLngBounds: GmBounds;
}

// Map restriction
export interface GmMapRestriction {
	latLngBounds: GmBounds;
	strictBounds?: boolean;
}

// Pin style for markers
export interface GmPinStyle {
	background?: string;
	borderColor?: string;
	glyphColor?: string;
	scale?: number;
	glyph?: string | HTMLElement;
}

// Pin type for markers
export type GmPin = string | HTMLElement | GmPinStyle | (() => Promise<GmPin> | GmPin);

// Icon sequence for polylines
export interface GmIconSequence {
	icon: {
		path: string | number;
		fillColor?: string;
		fillOpacity?: number;
		scale?: number;
		strokeColor?: string;
		strokeOpacity?: number;
		strokeWeight?: number;
	};
	offset?: string;
	repeat?: string;
}

// Cluster item
export interface GmClusterItem {
	position: GmPosition;
	title?: string;
	clickable?: boolean;
	pin?: GmPin;
	onClick?: (item: GmClusterItem) => void;
}
