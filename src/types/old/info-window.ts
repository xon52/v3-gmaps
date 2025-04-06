/**
 * Type definitions for Google Maps Info Window
 * @see https://developers.google.com/maps/documentation/javascript/reference/info-window
 */
import { GmapsPosition, GmapsSize } from './coordinates';

export type GmapsInfoWindowOptions = {
	content?: string | Element;
	disableAutoPan?: boolean;
	maxWidth?: number;
	minWidth?: number;
	pixelOffset?: GmapsSize;
	position?: GmapsPosition;
	zIndex?: number;
};
