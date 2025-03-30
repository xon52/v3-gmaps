import { GmapsPolyMouseEvent, GmapsPosition } from '../types';

/**
 * Compares a GmapsPosition with a google.maps.LatLng for equality
 * @param position The GmapsPosition to compare
 * @param latLng The google.maps.LatLng to compare
 * @returns true if both coordinates represent the same location, false otherwise
 * @throws {Error} If both parameters are undefined
 */
export const GmapsPositionIsEqual = (position?: GmapsPosition, latLng?: google.maps.LatLng): boolean => {
	if (!position && !latLng) {
		throw new Error('Both position arguments cannot be undefined');
	}

	if (!position || !latLng) return false;

	return position.lat === latLng.lat() && position.lng === latLng.lng();
};

/**
 * Converts a google.maps.PolyMouseEvent to our internal GmapsPolyMouseEvent type
 * @param event The Google Maps PolyMouseEvent to convert
 * @returns GmapsPolyMouseEvent
 * @throws {Error} If the event's latLng property is undefined
 */
export const convertPolyMouseEvent = (event: google.maps.PolyMouseEvent): GmapsPolyMouseEvent => {
	if (!event.latLng) {
		throw new Error('Invalid PolyMouseEvent: latLng property is undefined');
	}

	return {
		latLng: event.latLng.toJSON(),
		edge: event.edge,
		path: event.path,
		vertex: event.vertex,
	};
};
