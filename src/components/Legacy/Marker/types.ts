import type { GmPosition } from '../../../types';

/**
 * Symbol icon for a legacy marker
 */
export interface LegacyMarkerSymbol {
	path: string | google.maps.SymbolPath;
	anchor?: GmPosition;
	fillColor?: string;
	fillOpacity?: number;
	labelOrigin?: GmPosition;
	rotation?: number;
	scale?: number;
	strokeColor?: string;
	strokeOpacity?: number;
	strokeWeight?: number;
}

/**
 * Icon for a legacy marker
 */
export interface LegacyMarkerIcon {
	anchor?: GmPosition;
	labelOrigin?: GmPosition;
	origin?: GmPosition;
	scaledSize?: { width: number; height: number };
	size?: { width: number; height: number };
	url: string;
}

/**
 * Label for a legacy marker
 */
export interface LegacyMarkerLabel {
	text: string;
	color?: string;
	fontFamily?: string;
	fontSize?: string;
	fontWeight?: string;
}

/**
 * Shape for a legacy marker
 */
export interface LegacyMarkerShape {
	coords: number[];
	type: 'circle' | 'poly' | 'rect';
}

/**
 * Props for the Legacy Marker component
 */
export interface LegacyMarkerProps {
	// Core properties
	position?: GmPosition;
	title?: string;
	clickable?: boolean;
	cursor?: string;
	draggable?: boolean;
	icon?: string | LegacyMarkerIcon | LegacyMarkerSymbol;
	label?: string | LegacyMarkerLabel;
	opacity?: number;
	shape?: LegacyMarkerShape;
	visible?: boolean;
	zIndex?: number;
	animation?: 'BOUNCE' | 'DROP';

	// Options object
	options?: Record<string, any>;
}

/**
 * Events for the Legacy Marker component
 */
export interface LegacyMarkerEvents {
	// Animation events
	animation_changed: [];

	// Click events
	click: [position: GmPosition | null];
	clickable_changed: [clickable: boolean];
	contextmenu: [position: GmPosition | null];
	cursor_changed: [cursor: string | null | undefined];
	dblclick: [position: GmPosition | null];

	// Drag events
	drag: [position: GmPosition | null];
	dragend: [position: GmPosition | null];
	draggable_changed: [draggable: boolean | null | undefined];
	dragstart: [position: GmPosition | null];

	// Style/appearance events
	flat_changed: [];
	icon_changed: [];
	shape_changed: [];
	title_changed: [title: string | null | undefined];
	visible_changed: [visible: boolean];
	zindex_changed: [zIndex: number | null | undefined];

	// Mouse events
	mousedown: [position: GmPosition | null];
	mouseout: [position: GmPosition | null];
	mouseover: [position: GmPosition | null];
	mouseup: [position: GmPosition | null];
	rightclick: [position: GmPosition | null];

	// Position event
	position_changed: [position: GmPosition | null | undefined];

	// Lifecycle events
	mounted: [marker: google.maps.Marker];
	unmounted: [marker: google.maps.Marker];
}
