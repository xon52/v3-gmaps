/**
 * Pin styling properties
 * Defines visual customization options for map pins
 */
export interface PinStyle {
	background?: string;
	borderColor?: string;
	glyphColor?: string;
	scale?: number;
	glyph?: string | HTMLElement;
}

/**
 * Pin that represents marker content
 * @see https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElement
 */
export type Pin = string | HTMLElement | PinStyle | (() => Promise<Pin> | Pin);
