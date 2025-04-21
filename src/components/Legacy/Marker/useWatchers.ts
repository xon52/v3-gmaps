import { watch } from 'vue';
import { updateMarker } from './utils.js';
import type { GmLegacyMarkerProps } from '../../../types';
import { isEqual } from '../../../helpers/index.js';

/**
 * Composable for handling marker prop watchers
 * Sets up watchers for all marker properties to update the marker when props change
 */
export const useLegacyMarkerWatchers = (props: GmLegacyMarkerProps, marker: google.maps.Marker) => {
	/**
	 * Set up all watchers for marker props
	 */
	const setupWatchers = (): void => {
		// Animation property
		watch(
			() => props.animation,
			(value) => {
				if (value !== undefined) updateMarker(marker, { animation: value });
			}
		);

		// Clickable property
		watch(
			() => props.clickable,
			(value) => {
				if (value !== undefined) updateMarker(marker, { clickable: value });
			}
		);

		// Cursor property
		watch(
			() => props.cursor,
			(value) => {
				if (value !== undefined) updateMarker(marker, { cursor: value });
			}
		);

		// Draggable property
		watch(
			() => props.draggable,
			(value) => {
				if (value !== undefined) updateMarker(marker, { draggable: value });
			}
		);

		// Icon property
		watch(
			() => props.icon,
			(value) => {
				if (value !== undefined) updateMarker(marker, { icon: value });
			},
			{ deep: true }
		);

		// Label property
		watch(
			() => props.label,
			(value) => {
				if (value !== undefined) updateMarker(marker, { label: value });
			},
			{ deep: true }
		);

		// Opacity property
		watch(
			() => props.opacity,
			(value) => {
				if (value !== undefined) updateMarker(marker, { opacity: value });
			}
		);

		// Position property
		watch(
			() => props.position,
			(value) => {
				if (value !== undefined && !isEqual(value, marker.getPosition()?.toJSON())) {
					updateMarker(marker, { position: value });
				}
			},
			{ deep: true }
		);

		// Shape property
		watch(
			() => props.shape,
			(value) => {
				if (value !== undefined) updateMarker(marker, { shape: value });
			},
			{ deep: true }
		);

		// Title property
		watch(
			() => props.title,
			(value) => {
				if (value !== undefined) updateMarker(marker, { title: value });
			}
		);

		// Visible property
		watch(
			() => props.visible,
			(value) => {
				if (value !== undefined) updateMarker(marker, { visible: value });
			}
		);

		// zIndex property
		watch(
			() => props.zIndex,
			(value) => {
				if (value !== undefined) updateMarker(marker, { zIndex: value });
			}
		);

		// Options object
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
