/**
 * Type definitions for Google Maps Coordinates
 * @see https://developers.google.com/maps/documentation/javascript/reference/coordinates
 */

export type GmapsLatLng = {
	lat: number;
	lng: number;
};

export type GmapsPosition = GmapsLatLng;

export type GmapsBounds = {
	east: number;
	north: number;
	south: number;
	west: number;
};

export type GmapsPoint = {
	x: number;
	y: number;
};

export type GmapsSize = {
	width: number;
	height: number;
	widthUnit?: string;
	heightUnit?: string;
};

export type GmapsVector3D = {
	x: number;
	y: number;
	z: number;
};

export type GmapsOrientation3D = {
	heading?: number;
	roll?: number;
	tilt?: number;
};

export type GmapsProjection = {
	fromLatLngToPoint: (latLng: GmapsLatLng, point?: GmapsPoint) => GmapsPoint | null;
	fromPointToLatLng: (pixel: GmapsPoint, noWrap?: boolean) => GmapsLatLng | null;
};
