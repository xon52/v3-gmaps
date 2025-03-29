import { watch } from 'vue';
import { updateMarker } from './markerUtils';
import type { MarkerProps } from './types';

/**
 * Composable for handling marker prop watchers
 * Sets up watchers for all marker properties to update the marker when props change
 */
export const useMarkerWatchers = (props: MarkerProps, marker: google.maps.marker.AdvancedMarkerElement) => {
	/**
	 * Set up all watchers for marker props
	 */
	const setupWatchers = (): void => {
		// Core properties
		watch(
			() => props.position,
			(value) => {
				if (value) updateMarker(marker, { position: value });
			},
			{ deep: true }
		);

		watch(
			() => props.title,
			(value) => {
				if (value !== undefined) updateMarker(marker, { title: value });
			}
		);

		watch(
			() => props.clickable,
			(value) => {
				if (value !== undefined) updateMarker(marker, { clickable: value });
			}
		);

		// Element/style changes require recreating the marker
		// We'll handle these in the Marker.vue component if needed

		// State
		watch(
			() => props.visible,
			(value) => {
				if (value !== undefined) updateMarker(marker, { visible: value });
			}
		);

		watch(
			() => props.draggable,
			(value) => {
				if (value !== undefined) updateMarker(marker, { draggable: value });
			}
		);

		watch(
			() => props.zIndex,
			(value) => {
				if (value !== undefined) updateMarker(marker, { zIndex: value });
			}
		);

		watch(
			() => props.collisionBehavior,
			(value) => {
				if (value !== undefined) updateMarker(marker, { collisionBehavior: value });
			}
		);

		// Handle options object updates
		watch(
			() => props.options,
			(value) => {
				if (value) updateMarker(marker, { options: value });
			},
			{ deep: true }
		);
	};

	return {
		setupWatchers,
	};
};
