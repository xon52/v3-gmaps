/**
 * Type definitions for Google Maps Advanced Markers
 * @see https://developers.google.com/maps/documentation/javascript/reference/advanced-markers
 */

import { GmapsLatLng } from './coordinates';

export type GmapsMarkerOptions = {
	content?: HTMLElement | string;
	position?: GmapsLatLng;
	title?: string;
	gmpClickable?: boolean;
	gmpDraggable?: boolean;
	zIndex?: number;
	map?: any;
	collisionBehavior?: 'OPTIONAL_AND_HIDES_LOWER_PRIORITY' | 'REQUIRED' | 'REQUIRED_AND_HIDES_OPTIONAL' | null;
};

export type GmapsPinOptions = {
	background?: string;
	borderColor?: string;
	glyph?: string | Element | URL;
	glyphColor?: string;
	scale?: number;
};
