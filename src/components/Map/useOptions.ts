import type { GmMapProps } from '../../types';

/**
 * Creates and returns a complete options object for a map by combining base options with component props
 * @param baseOptions Initial options object
 * @param props The component props containing map properties
 * @returns A new options object with all properties resolved
 */
export function resolveOptions(baseOptions: Record<string, any>, props: GmMapProps): google.maps.MapOptions {
	// Create a new options object, starting with defaults, base options, and custom options
	const options = {
		center: { lat: 20, lng: 0 },
		zoom: 2,
		...baseOptions,
		...props.options,
	};

	// Priority overrides from direct props
	if (props.center) options.center = props.center;
	if (props.zoom !== undefined) options.zoom = Number(props.zoom);
	if (props.mapTypeId) options.mapTypeId = props.mapTypeId;
	if (props.disableDefaultUI !== undefined) options.disableDefaultUI = props.disableDefaultUI;
	if (props.clickableIcons !== undefined) options.clickableIcons = props.clickableIcons;

	// Always set mapId (either from props or fallback)
	options.mapId = props.mapId || 'DEMO_MAP_ID';

	return options;
}

export function useMapOptions(props: GmMapProps) {
	// Build map options from props using resolveOptions
	const buildMapOptions = (): google.maps.MapOptions => resolveOptions({}, props);

	return {
		buildMapOptions,
	};
}
