// Define a default map configuration that can be reused across components
export const defaultMapOptions: google.maps.MapOptions = {
	center: { lat: 20, lng: 0 },
	zoom: 2,
	mapTypeControl: false,
	fullscreenControl: false,
	streetViewControl: false,
	zoomControl: true,
	scaleControl: false,
	disableDefaultUI: false,
	scrollwheel: true,
	clickableIcons: true,
};

// Utility function to create map options with a specific center and zoom
export function createMapOptions(options?: Partial<google.maps.MapOptions>) {
	return {
		...defaultMapOptions,
		...options,
	};
}
