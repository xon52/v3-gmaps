/**
 * Component Props and Events interfaces using local type definitions
 * These interfaces provide type safety for Vue Google Maps components
 */

import {
	GmPosition,
	GmBounds,
	GmSize,
	GmMouseEvent,
	GmCollisionBehavior,
	GmStrokePosition,
	GmMapTypeId,
	GmMapRestriction,
	GmMapCapabilities,
	GmVisibleRegion,
	GmMapOptions,
	GmIconSequence,
	GmPin,
	GmHeatmapDataPoint,
	GmHeatmapOptions,
	GmInfoWindowOpenOptions,
	GmShapeOptions,
	GmClusterItem,
} from './components';

// Map Component
export interface MapProps {
	center?: GmPosition;
	zoom?: number;
	mapTypeId?: GmMapTypeId;
	mapId?: string;
	disableDefaultUI?: boolean;
	clickableIcons?: boolean;
	restriction?: GmMapRestriction;
	options?: GmMapOptions;
	throttle?: number;
}

export interface MapEvents {
	click: [position: GmPosition | null];
	contextmenu: [position: GmPosition | null];
	dblclick: [position: GmPosition | null];
	mousemove: [position: GmPosition | null];
	mouseout: [position: GmPosition | null];
	mouseover: [position: GmPosition | null];
	rightclick: [position: GmPosition | null];
	center_changed: [center: GmPosition | null];
	bounds_changed: [bounds: GmBounds | null];
	heading_changed: [heading: number | null];
	isfractionalzoomenabled_changed: [value: number | null];
	tilt_changed: [tilt: number | null];
	zoom_changed: [zoom: number | null];
	maptypeid_changed: [type: string | null];
	error: [message: string | undefined];
	capabilities_changed: [capabilities: GmMapCapabilities];
	visible_region_changed: [region: GmVisibleRegion];
	drag: [];
	dragend: [];
	dragstart: [];
	idle: [];
	projection_changed: [];
	renderingtype_changed: [];
	tilesloaded: [];
	mounted: [map: any]; // Using any to avoid Google Maps dependency
	unmounted: [map: any];
}

// Marker Component
export interface MarkerProps {
	position?: GmPosition;
	title?: string;
	clickable?: boolean;
	zIndex?: number;
	pin?: GmPin;
	visible?: boolean;
	draggable?: boolean;
	collisionBehavior?: GmCollisionBehavior;
	options?: Record<string, any>;
}

export interface MarkerEvents {
	click: [position: GmPosition | null];
	contextmenu: [position: GmPosition | null];
	dblclick: [position: GmPosition | null];
	drag: [position: GmPosition | null];
	dragend: [position: GmPosition | null];
	dragstart: [position: GmPosition | null];
	mousedown: [position: GmPosition | null];
	mouseout: [position: GmPosition | null];
	mouseover: [position: GmPosition | null];
	mouseup: [position: GmPosition | null];
	rightclick: [position: GmPosition | null];
	position_changed: [position: GmPosition | null];
	visible_changed: [visible: boolean];
	clickable_changed: [clickable: boolean];
	draggable_changed: [draggable: boolean];
	zindex_changed: [zIndex: number | null];
	mounted: [marker: any];
	unmounted: [marker: any];
}

// InfoWindow Component
export interface InfoWindowProps {
	position?: GmPosition;
	ariaLabel?: string;
	content?: string | HTMLElement | Text;
	disableAutoPan?: boolean;
	headerContent?: string | HTMLElement | Text;
	headerDisabled?: boolean;
	maxWidth?: number;
	minWidth?: number;
	pixelOffset?: GmSize;
	zIndex?: number;
	options?: Record<string, any>;
}

export interface InfoWindowEvents {
	closeclick: [];
	content_changed: [content: string | HTMLElement | Text];
	domready: [dom: HTMLElement];
	position_changed: [position: GmPosition | null];
	zindex_changed: [zIndex: number | null];
	mounted: [infoWindow: any];
	unmounted: [infoWindow: any];
}

export interface InfoWindowOpenOptions extends GmInfoWindowOpenOptions {
	anchor?: any;
	map?: any;
}

// Circle Component
export interface CircleProps extends GmShapeOptions {
	center?: GmPosition;
	radius?: number;
	options?: Record<string, any>;
}

export interface CircleEvents {
	click: [event: GmMouseEvent];
	dblclick: [event: GmMouseEvent];
	rightclick: [event: GmMouseEvent];
	drag: [event: GmMouseEvent];
	dragend: [event: GmMouseEvent];
	dragstart: [event: GmMouseEvent];
	mousedown: [event: GmMouseEvent];
	mousemove: [event: GmMouseEvent];
	mouseout: [event: GmMouseEvent];
	mouseover: [event: GmMouseEvent];
	mouseup: [event: GmMouseEvent];
	clickable_changed: [clickable: boolean];
	dblclick_changed: [dblclick: boolean];
	rightclick_changed: [rightclick: boolean];
	draggable_changed: [draggable: boolean];
	editable_changed: [editable: boolean];
	visible_changed: [visible: boolean];
	zindex_changed: [zIndex: number];
	fillcolor_changed: [fillColor: string];
	fillopacity_changed: [fillOpacity: number];
	strokecolor_changed: [strokeColor: string];
	strokeopacity_changed: [strokeOpacity: number];
	strokeposition_changed: [strokePosition: GmStrokePosition];
	strokeweight_changed: [strokeWeight: number];
	center_changed: [center: GmPosition];
	radius_changed: [radius: number];
	mounted: [circle: any];
	unmounted: [circle: any];
}

// Rectangle Component
export interface RectangleProps extends GmShapeOptions {
	bounds?: GmBounds;
	options?: Record<string, any>;
}

export interface RectangleEvents {
	click: [event: GmMouseEvent];
	dblclick: [event: GmMouseEvent];
	rightclick: [event: GmMouseEvent];
	drag: [event: GmMouseEvent];
	dragend: [event: GmMouseEvent];
	dragstart: [event: GmMouseEvent];
	mousedown: [event: GmMouseEvent];
	mousemove: [event: GmMouseEvent];
	mouseout: [event: GmMouseEvent];
	mouseover: [event: GmMouseEvent];
	mouseup: [event: GmMouseEvent];
	clickable_changed: [clickable: boolean];
	dblclick_changed: [dblclick: boolean];
	rightclick_changed: [rightclick: boolean];
	draggable_changed: [draggable: boolean];
	editable_changed: [editable: boolean];
	visible_changed: [visible: boolean];
	zindex_changed: [zIndex: number];
	fillcolor_changed: [fillColor: string];
	fillopacity_changed: [fillOpacity: number];
	strokecolor_changed: [strokeColor: string];
	strokeopacity_changed: [strokeOpacity: number];
	strokeposition_changed: [strokePosition: GmStrokePosition];
	strokeweight_changed: [strokeWeight: number];
	bounds_changed: [bounds: GmBounds];
	mounted: [rectangle: any];
	unmounted: [rectangle: any];
}

// Polygon Component
export interface PolygonProps extends GmShapeOptions {
	paths?: GmPosition[] | GmPosition[][];
	geodesic?: boolean;
	options?: Record<string, any>;
}

export interface PolygonEvents {
	click: [event: GmMouseEvent];
	dblclick: [event: GmMouseEvent];
	rightclick: [event: GmMouseEvent];
	drag: [event: GmMouseEvent];
	dragend: [event: GmMouseEvent];
	dragstart: [event: GmMouseEvent];
	mousedown: [event: GmMouseEvent];
	mousemove: [event: GmMouseEvent];
	mouseout: [event: GmMouseEvent];
	mouseover: [event: GmMouseEvent];
	mouseup: [event: GmMouseEvent];
	clickable_changed: [clickable: boolean];
	dblclick_changed: [dblclick: boolean];
	rightclick_changed: [rightclick: boolean];
	draggable_changed: [draggable: boolean];
	editable_changed: [editable: boolean];
	visible_changed: [visible: boolean];
	zindex_changed: [zIndex: number];
	fillcolor_changed: [fillColor: string];
	fillopacity_changed: [fillOpacity: number];
	strokecolor_changed: [strokeColor: string];
	strokeopacity_changed: [strokeOpacity: number];
	strokeposition_changed: [strokePosition: GmStrokePosition];
	strokeweight_changed: [strokeWeight: number];
	paths_changed: [paths: GmPosition[] | GmPosition[][]];
	mounted: [polygon: any];
	unmounted: [polygon: any];
}

// Polyline Component
export interface PolylineProps {
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;
	strokeColor?: string;
	strokeOpacity?: number;
	strokePosition?: GmStrokePosition;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;
	path?: GmPosition[];
	geodesic?: boolean;
	icons?: GmIconSequence[];
	options?: Record<string, any>;
}

export interface PolylineEvents {
	click: [event: GmMouseEvent];
	dblclick: [event: GmMouseEvent];
	rightclick: [event: GmMouseEvent];
	drag: [event: GmMouseEvent];
	dragend: [event: GmMouseEvent];
	dragstart: [event: GmMouseEvent];
	mousedown: [event: GmMouseEvent];
	mousemove: [event: GmMouseEvent];
	mouseout: [event: GmMouseEvent];
	mouseover: [event: GmMouseEvent];
	mouseup: [event: GmMouseEvent];
	clickable_changed: [clickable: boolean];
	dblclick_changed: [dblclick: boolean];
	rightclick_changed: [rightclick: boolean];
	draggable_changed: [draggable: boolean];
	editable_changed: [editable: boolean];
	visible_changed: [visible: boolean];
	zindex_changed: [zIndex: number];
	strokecolor_changed: [strokeColor: string];
	strokeopacity_changed: [strokeOpacity: number];
	strokeposition_changed: [strokePosition: GmStrokePosition];
	strokeweight_changed: [strokeWeight: number];
	path_changed: [path: GmPosition[]];
	mounted: [polyline: any];
	unmounted: [polyline: any];
}

// Heatmap Component
export interface HeatmapProps {
	data?: GmHeatmapDataPoint[];
	dissipating?: boolean;
	gradient?: string[];
	maxIntensity?: number;
	opacity?: number;
	radius?: number;
	options?: GmHeatmapOptions;
}

export interface HeatmapEvents {
	mounted: [heatmap: any];
	unmounted: [heatmap: any];
}

// Cluster Component
export interface ClusterProps {
	items: GmClusterItem[];
	maxZoom?: number;
	tileSize?: number;
	pin?: GmPin;
}

export interface ClusterEvents {
	click: [position: GmPosition | null];
	mounted: [clusters: Record<string, any>];
	unmounted: [clusters: Record<string, any>];
}
