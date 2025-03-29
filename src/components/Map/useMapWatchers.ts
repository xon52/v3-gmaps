import { watch } from 'vue';
import { isEqual } from '../../helpers';
import type { MapProps } from './types';
import { GmapsError } from '../../types/errors';

export function useMapWatchers(props: MapProps, mapInstance: google.maps.Map | null) {
	if (!mapInstance) throw new GmapsError('Map instance not found');

	// Define watchers in a more concise data structure
	const watchers = [
		// Basic map properties
		{
			prop: 'center',
			handler: (v: any) => {
				if (v && mapInstance && !isEqual(v, mapInstance.getCenter()?.toJSON())) mapInstance.setCenter(v);
			},
			options: { deep: true },
		},
		{
			prop: 'clickableIcons',
			handler: (v: any) => {
				if (v !== undefined && mapInstance && v !== mapInstance.getClickableIcons()) mapInstance.setClickableIcons(v);
			},
		},
		{
			prop: 'heading',
			handler: (v: any) => {
				if (v !== undefined && mapInstance && +v !== mapInstance.getHeading()) mapInstance.setHeading(+v);
			},
		},
		{
			prop: 'mapTypeId',
			handler: (v: any) => {
				if (v !== undefined && mapInstance && v !== mapInstance.getMapTypeId()) mapInstance.setMapTypeId(v);
			},
		},
		{
			prop: 'options',
			handler: (v: any) => {
				if (v && mapInstance) mapInstance.setOptions(v);
			},
		},
		{
			prop: 'tilt',
			handler: (v: any) => {
				if (v !== undefined && mapInstance && +v !== mapInstance.getTilt()) mapInstance.setTilt(+v);
			},
		},
		{
			prop: 'zoom',
			handler: (v: any) => {
				if (v !== undefined && mapInstance && +v !== mapInstance.getZoom()) mapInstance.setZoom(+v);
			},
		},
	];

	// Option-based watchers can be generalized
	const optionWatchers = [
		// Styles
		{ prop: 'styles', option: 'styles', deep: true },
		// Control visibility
		{ prop: 'fullscreenControl', option: 'fullscreenControl' },
		{ prop: 'mapTypeControl', option: 'mapTypeControl' },
		{ prop: 'streetViewControl', option: 'streetViewControl' },
		{ prop: 'zoomControl', option: 'zoomControl' },
		// Gesture handling
		{ prop: 'gestureHandling', option: 'gestureHandling' },
	];

	// Apply the standard watchers
	watchers.forEach(({ prop, handler, options = {} }) => {
		watch(() => (props as any)[prop], handler, options);
	});

	// Apply option-based watchers
	optionWatchers.forEach(({ prop, option, deep = false }) => {
		watch(
			() => (props as any)[prop],
			(v: any) => {
				if (v !== undefined && mapInstance) {
					(mapInstance as any).setOptions({ [option]: v });
				}
			},
			{ deep }
		);
	});

	// Camera control watcher
	const setupCameraWatcher = (moveCamera: (camera: google.maps.CameraOptions) => void) => {
		watch(
			() => props.camera,
			(newCamera) => {
				if (newCamera) moveCamera(newCamera);
			},
			{ deep: true }
		);
	};

	// Restriction watcher
	const setupRestrictionWatcher = () => {
		watch(
			() => props.restriction,
			(newRestriction) => {
				if (!mapInstance) return;

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
		setupCameraWatcher,
		setupRestrictionWatcher,
	};
}
