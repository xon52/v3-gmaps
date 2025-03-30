/**
 * Type definitions for Google Maps Map
 * @see https://developers.google.com/maps/documentation/javascript/reference/map
 */
import { GmapsLatLng, GmapsBounds } from './coordinates';

export type GmapsMapRestriction = {
	latLngBounds: GmapsBounds;
	strictBounds?: boolean;
};

export type GmapsMapTypeStyle = {
	stylers: any[];
	elementType?: string;
	featureType?: string;
};

export type GmapsMapTypeId = 'hybrid' | 'roadmap' | 'satellite' | 'terrain';

export type GmapsMapOptions = {
	backgroundColor?: string;
	center?: GmapsLatLng | google.maps.LatLng;
	clickableIcons?: boolean;
	controlSize?: number;
	disableDefaultUI?: boolean;
	disableDoubleClickZoom?: boolean;
	draggingCursor?: string;
	fullscreenControl?: boolean;
	fullscreenControlOptions?: any;
	gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
	heading?: number;
	isFractionalZoomEnabled?: boolean;
	keyboardShortcuts?: boolean;
	mapId?: string;
	mapTypeControl?: boolean;
	mapTypeId?: string | GmapsMapTypeId;
	maxZoom?: number;
	minZoom?: number;
	noClear?: boolean;
	restriction?: GmapsMapRestriction;
	rotateControl?: boolean;
	scaleControl?: boolean;
	scrollwheel?: boolean;
	streetViewControl?: boolean;
	styles?: GmapsMapTypeStyle[];
	tilt?: number;
	zoom?: number;
	zoomControl?: boolean;
	[x: string]: any;
};
