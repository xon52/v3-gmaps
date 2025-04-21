/**
 * Common type definitions for Vue Google Maps components
 * These types provide local definitions that satisfy Google Maps API types
 */

// Basic position types
export interface GmPosition {
	lat: number;
	lng: number;
}

// Bounds type
export interface GmBounds {
	north: number;
	east: number;
	south: number;
	west: number;
}

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
