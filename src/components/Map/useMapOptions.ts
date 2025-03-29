import type { MapProps } from './types';

export function useMapOptions(props: MapProps) {
	// Default map options
	const defaultOptions: google.maps.MapOptions = { center: { lat: 0, lng: 0 }, zoom: 2 };

	// Build map options from props
	const buildMapOptions = (): google.maps.MapOptions => {
		// Configure options
		const options: any = { ...defaultOptions, ...props.options };

		// Basic map properties
		if (props.center) options.center = props.center;
		if (props.clickableIcons !== undefined) options.clickableIcons = props.clickableIcons;
		if (props.heading !== undefined) options.heading = Number(props.heading);
		if (props.mapTypeId) options.mapTypeId = props.mapTypeId;
		if (props.tilt !== undefined) options.tilt = Number(props.tilt);
		if (props.zoom !== undefined) options.zoom = Number(props.zoom);

		// Add mapId for Advanced Markers support
		if (props.mapId) options.mapId = props.mapId;
		else options.mapId = 'DEMO_MAP_ID'; // Use demo ID as fallback for testing

		// Control options
		if (props.fullscreenControl !== undefined) options.fullscreenControl = props.fullscreenControl;
		if (props.fullscreenControlOptions) options.fullscreenControlOptions = props.fullscreenControlOptions;
		if (props.mapTypeControl !== undefined) options.mapTypeControl = props.mapTypeControl;
		if (props.streetViewControl !== undefined) options.streetViewControl = props.streetViewControl;
		if (props.zoomControl !== undefined) options.zoomControl = props.zoomControl;

		// Map styling
		if (props.styles) options.styles = props.styles;

		return options;
	};

	return {
		defaultOptions,
		buildMapOptions,
	};
}
