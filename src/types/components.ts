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

// Marker collision behavior
export type GmCollisionBehavior = 'REQUIRED' | 'REQUIRED_AND_HIDES_OPTIONAL' | 'OPTIONAL_AND_HIDES_LOWER_PRIORITY';

// Stroke position
export type GmStrokePosition = 'CENTER' | 'INSIDE' | 'OUTSIDE';

// Map type ID
export type GmMapTypeId = 'roadmap' | 'satellite' | 'hybrid' | 'terrain';

// Map mouse event
export interface GmMouseEvent {
	latLng: GmPosition;
	domEvent: MouseEvent;
}

// Using declare to check types without emitting runtime code
declare const _checkTypes: {
	position: GmPosition extends google.maps.LatLngLiteral ? true : "GmPosition doesn't satisfy LatLngLiteral";
	bounds: GmBounds extends google.maps.LatLngBoundsLiteral ? true : "GmBounds doesn't satisfy LatLngBoundsLiteral";
	size: GmSize extends google.maps.Size ? true : "GmSize doesn't satisfy Size";
	collisionBehavior: GmCollisionBehavior extends google.maps.CollisionBehavior
		? true
		: "GmCollisionBehavior doesn't satisfy CollisionBehavior";
	strokePosition: GmStrokePosition extends google.maps.StrokePosition
		? true
		: "GmStrokePosition doesn't satisfy StrokePosition";
	mapTypeId: GmMapTypeId extends google.maps.MapTypeId ? true : "GmMapTypeId doesn't satisfy MapTypeId";
	mapRestriction: GmMapRestriction extends google.maps.MapRestriction
		? true
		: "GmMapRestriction doesn't satisfy MapRestriction";
	mapCapabilities: GmMapCapabilities extends google.maps.MapCapabilities
		? true
		: "GmMapCapabilities doesn't satisfy MapCapabilities";
	visibleRegion: GmVisibleRegion extends google.maps.VisibleRegion
		? true
		: "GmVisibleRegion doesn't satisfy VisibleRegion";
	iconSequence: GmIconSequence extends google.maps.IconSequence ? true : "GmIconSequence doesn't satisfy IconSequence";
	infoWindowOptions: GmInfoWindowOpenOptions extends Partial<google.maps.InfoWindowOpenOptions>
		? true
		: "GmInfoWindowOpenOptions doesn't satisfy InfoWindowOpenOptions";
};

// Size type
export interface GmSize {
	width: number;
	height: number;
}

// Map restriction
export interface GmMapRestriction {
	latLngBounds: GmBounds;
	strictBounds?: boolean;
}

// Map capabilities
export interface GmMapCapabilities {
	isAdvancedMarkersAvailable: boolean;
	isDataDrivenStylingAvailable: boolean;
}

// Visible region
export interface GmVisibleRegion {
	farLeft: GmPosition;
	farRight: GmPosition;
	nearLeft: GmPosition;
	nearRight: GmPosition;
	latLngBounds: GmBounds;
}

// Map options
export interface GmMapOptions {
	center?: GmPosition;
	zoom?: number;
	mapTypeId?: GmMapTypeId;
	mapId?: string;
	disableDefaultUI?: boolean;
	clickableIcons?: boolean;
	restriction?: GmMapRestriction;
	[key: string]: any;
}

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

// Weighted location for heatmaps
export interface GmWeightedLocation {
	location: GmPosition;
	weight?: number;
}

// Heatmap data point type
export type GmHeatmapDataPoint = GmPosition | GmWeightedLocation;

// Heatmap options
export interface GmHeatmapOptions {
	data?: GmHeatmapDataPoint[];
	dissipating?: boolean;
	gradient?: string[];
	maxIntensity?: number;
	opacity?: number;
	radius?: number;
	[key: string]: any;
}

// InfoWindow options
export interface GmInfoWindowOpenOptions {
	shouldFocus?: boolean;
}

// Shape options (common for Circle, Rectangle, Polygon, Polyline)
export interface GmShapeOptions {
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;
	fillColor?: string;
	fillOpacity?: number;
	strokeColor?: string;
	strokeOpacity?: number;
	strokePosition?: GmStrokePosition;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;
}

// Cluster item
export interface GmClusterItem {
	lat: number;
	lng: number;
	title?: string;
	clickable?: boolean;
	pin?: GmPin;
	onClick?: (item: GmClusterItem) => void;
}
