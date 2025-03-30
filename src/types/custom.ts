import { GmapsLatLng } from './coordinates';
import { GmapsMarkerOptions } from './markers';

export type GmapsClusterItem = {
	lat: number;
	lng: number;
	options?: GmapsMarkerOptions;
	id?: string;
	title?: string;
	visible?: boolean;
	icon?: string;
	label?: string;
	opacity?: string | number;
	zIndex?: string | number;
	onClick?: (position: GmapsLatLng) => void;
	onContextmenu?: (position: GmapsLatLng) => void;
	[x: string]: any;
};

export type GmapsClusterGroup = {
	position: GmapsLatLng;
	items: GmapsClusterItem[];
	weight?: number;
};

export type GmapsClusterOptions = {
	minZoom?: number;
	maxZoom?: number;
	tileSize?: number;
	highPercentage?: number;
	lowPercentage?: number;
};
