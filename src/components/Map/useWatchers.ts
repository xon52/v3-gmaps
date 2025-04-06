import { watch } from 'vue';
import { isEqual } from '../../helpers';
import type { MapProps } from './types';

export function useMapWatchers(props: MapProps, mapInstance: google.maps.Map | null) {
	if (!mapInstance) throw new Error('v3-gmaps :: Map instance not found');

	// Define watchers for core map properties that use specific setter methods
	// Basic map properties
	watch(
		() => props.center,
		(v: google.maps.LatLng | google.maps.LatLngLiteral | undefined) => {
			if (v && !isEqual(v, mapInstance.getCenter()?.toJSON())) mapInstance.setCenter(v);
		},
		{ deep: true }
	);

	watch(
		() => props.clickableIcons,
		(v: boolean | undefined) => {
			if (v !== undefined && v !== mapInstance.getClickableIcons()) mapInstance.setClickableIcons(v);
		}
	);

	watch(
		() => props.mapTypeId,
		(v: google.maps.MapTypeId | undefined) => {
			if (v !== undefined && v !== mapInstance.getMapTypeId()) mapInstance.setMapTypeId(v);
		}
	);

	watch(
		() => props.zoom,
		(v: number | undefined) => {
			if (v !== undefined && +v !== mapInstance.getZoom()) mapInstance.setZoom(+v);
		}
	);

	// Simple options that use setOptions
	watch(
		() => props.disableDefaultUI,
		(v: boolean | undefined) => {
			if (v !== undefined) mapInstance.setOptions({ disableDefaultUI: v });
		}
	);

	// Watch the options object for all other options
	watch(
		() => props.options,
		(v: any) => {
			if (v) {
				// Apply all options, excluding properties that have direct watchers
				const options = { ...v };
				const directProps = ['center', 'clickableIcons', 'mapTypeId', 'zoom', 'disableDefaultUI'];

				directProps.forEach((prop) => {
					if ((props as any)[prop] !== undefined) {
						delete options[prop];
					}
				});

				// Apply remaining options
				if (Object.keys(options).length > 0) {
					mapInstance.setOptions(options);
				}
			}
		},
		{ deep: true }
	);

	// Restriction watcher
	const setupRestrictionWatcher = () => {
		watch(
			() => props.restriction,
			(newRestriction) => {
				// Use type assertion for newer API methods
				const mapWithRestriction = mapInstance as any;
				// If restriction is provided, set it
				if (newRestriction && typeof mapWithRestriction.setRestriction === 'function') {
					mapWithRestriction.setRestriction(newRestriction);
				}
			}
		);
	};

	return {
		setupRestrictionWatcher,
	};
}
