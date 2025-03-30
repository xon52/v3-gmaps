import { GmapsStrokePosition } from './enums';
import { GmapsLatLng, GmapsBounds } from './coordinates';

export type GmapsSymbol = {
	path: string;
	anchor?: { x: number; y: number };
	fillColor?: string;
	fillOpacity?: number;
	labelOrigin?: { x: number; y: number };
	rotation?: number;
	scale?: number;
	strokeColor?: string;
	strokeOpacity?: number;
	strokeWeight?: number;
};

export type GmapsIconSequence = {
	fixedRotation?: boolean;
	icon?: GmapsSymbol;
	offset?: string;
	repeat?: string;
};

export type GmapsPolyMouseEvent = {
	latLng: GmapsLatLng;
	edge?: number;
	path?: number;
	vertex?: number;
};

export type GmapsCircleOptions = {
	center?: GmapsLatLng;
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;
	fillColor?: string;
	fillOpacity?: number;
	radius?: number;
	strokeColor?: string;
	strokeOpacity?: number;
	strokePosition?: GmapsStrokePosition;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;
	[x: string]: any;
};

export type GmapsRectangleOptions = {
	bounds?: GmapsBounds;
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;
	fillColor?: string;
	fillOpacity?: number;
	strokeColor?: string;
	strokeOpacity?: number;
	strokePosition?: GmapsStrokePosition;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;
	[x: string]: any;
};

export type GmapsPolylineOptions = {
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;
	geodesic?: boolean;
	icons?: GmapsIconSequence[];
	path?: GmapsLatLng[];
	strokeColor?: string;
	strokeOpacity?: number;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;
	[x: string]: any;
};

export type GmapsPolygonOptions = {
	clickable?: boolean;
	draggable?: boolean;
	editable?: boolean;
	fillColor?: string;
	fillOpacity?: number;
	geodesic?: boolean;
	icons?: GmapsIconSequence[];
	paths?: GmapsLatLng[] | GmapsLatLng[][];
	strokeColor?: string;
	strokeOpacity?: number;
	strokePosition?: GmapsStrokePosition;
	strokeWeight?: number;
	visible?: boolean;
	zIndex?: number;
	[x: string]: any;
};
