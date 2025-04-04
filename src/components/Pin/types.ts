/**
 * Base interface for pin styling properties
 */
export interface PinStyle {
	background?: string;
	borderColor?: string;
	glyphColor?: string;
	scale?: number;
	glyph?: string;
}

/**
 * Type for a pin that can be:
 * 1. A string (text, HTML, or image URL)
 * 2. An HTMLElement (used directly)
 * 3. A PinStyle (for styling with optional glyph)
 * 4. A function that resolves into one of the above
 */
export type Pin = string | HTMLElement | PinStyle | (() => Promise<Pin> | Pin);
