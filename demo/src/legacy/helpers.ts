import { GmBounds } from 'v3-gmaps';

export const mapOptionsBase: google.maps.MapOptions = {
	fullscreenControl: false,
	mapTypeControl: false,
	rotateControl: false,
	scaleControl: false,
	streetViewControl: false,
	zoomControl: false,
};

export const mapOptions: google.maps.MapOptions = {
	...mapOptionsBase,
	center: { lat: -27, lng: 133 },
	zoom: 4,
};

export const ausBounds: GmBounds = {
	north: -12,
	east: 155,
	south: -40,
	west: 113,
};

export const icon: google.maps.Symbol = {
	path: 'M -2,0 0,-2 2,0 0,2 z',
	strokeColor: '#F00',
	fillColor: '#F00',
	fillOpacity: 1,
};
export const icons = [
	{ icon, offset: '0%' },
	{ icon, offset: '100%' },
];
