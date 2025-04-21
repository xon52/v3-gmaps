import { getLibrary } from '../../';
import type { GmPin, GmPinStyle } from '../../types';

/**
 * Converts string content to an HTML element
 * @param content Image URL, SVG, HTML, or text
 * @returns HTML element or original string for plain text
 */
const convertStringToElement = async (content?: string | HTMLElement): Promise<HTMLElement | string | undefined> => {
	// If content is already an HTMLElement, return it
	if (content instanceof HTMLElement) {
		return content;
	}

	// If content is undefined or not a string, return undefined
	if (!content || typeof content !== 'string') {
		return undefined;
	}

	// Check if it's SVG content
	if (content.trim().startsWith('<svg')) {
		try {
			const parser = new DOMParser();
			const svgElement = parser.parseFromString(content, 'image/svg+xml').documentElement;
			if (svgElement) {
				return svgElement;
			}
		} catch (e) {
			// If SVG parsing fails, try as regular HTML
		}
	}
	// Check if it's an image URL - moved after SVG check and improved regex to match only URLs/paths
	else if (content.match(/\.(png|jpg|jpeg|svg|webp|gif)$/i)) {
		const img = document.createElement('img');
		img.src = content;
		return img;
	}
	// Check if it's HTML
	else if (content.includes('<')) {
		try {
			const parser = new DOMParser();
			const doc = parser.parseFromString(content, 'text/html');
			const element = doc.body.firstElementChild as HTMLElement;
			if (element) {
				return element;
			}
		} catch (e) {
			// If HTML parsing fails, use as text
		}
	}

	// For plain text, return the original string
	return content;
};

/**
 * Creates a pin element from string content
 * @param content Text or HTML string
 * @returns Pin element for use in markers
 */
const createPinFromString = async (content?: string): Promise<HTMLElement> => {
	const result = await convertStringToElement(content);
	// If result is an HTMLElement, return it
	if (result instanceof HTMLElement) {
		return result;
	}
	// Otherwise, use as text in PinElement
	return createPinFromOptions({ glyph: result });
};

/**
 * Creates a pin element from styling options
 * @param style Pin styling configuration
 * @returns Pin element for use in markers
 */
const createPinFromStyle = async (style: GmPinStyle): Promise<HTMLElement> => {
	const pinOptions: google.maps.marker.PinElementOptions = {};

	// Handle glyph if it exists
	if (style.glyph) {
		pinOptions.glyph = await convertStringToElement(style.glyph);
	}

	if (style.background) pinOptions.background = style.background;
	if (style.borderColor) pinOptions.borderColor = style.borderColor;
	if (style.glyphColor) pinOptions.glyphColor = style.glyphColor;
	if (style.scale !== undefined) pinOptions.scale = style.scale;
	return createPinFromOptions(pinOptions);
};

/**
 * Creates a pin element from Google Maps PinElementOptions
 * @param options Pin configuration options
 * @returns Pin element for use in markers
 */
const createPinFromOptions = async (options: google.maps.marker.PinElementOptions): Promise<HTMLElement> => {
	const markerLibrary = await getLibrary('marker');
	const pinElement = new markerLibrary.PinElement(options);
	return pinElement.element;
};

/**
 * Creates a pin element from various input types
 * @param pin Configuration (HTMLElement, string, PinStyle or function)
 * @returns Pin element for use in markers
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElement
 */
export const createPinElement = async (pin?: GmPin): Promise<HTMLElement> => {
	// Handle function that resolves to a Pin
	if (typeof pin === 'function') {
		const resolvedPin = await pin();
		// Process the resolved pin through the same function
		return createPinElement(resolvedPin);
	}
	if (pin instanceof HTMLElement) {
		return pin;
	}
	if (typeof pin === 'string') {
		return createPinFromString(pin);
	}
	if (typeof pin === 'object' && pin !== null) {
		return createPinFromStyle(pin as GmPinStyle);
	}
	if (pin === undefined) {
		return createPinFromString();
	}
	throw new Error('Invalid pin configuration');
};
