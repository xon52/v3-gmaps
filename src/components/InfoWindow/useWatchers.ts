/**
 * Composable for watching InfoWindow property changes
 */
import { watch } from 'vue';
import { isEqual } from '../../helpers';
import type { InfoWindowProps } from './types';

/**
 * Watch for InfoWindow property changes and update the InfoWindow instance
 */
export const useInfoWindowWatchers = (props: InfoWindowProps, infoWindow: google.maps.InfoWindow) => {
	const setupWatchers = () => {
		// Watch for position changes
		watch(
			() => props.position,
			(newPosition) => {
				if (!newPosition || isEqual(newPosition, infoWindow.getPosition()?.toJSON())) {
					return;
				}
				infoWindow.setPosition(newPosition);
			},
			{ deep: true }
		);

		// Watch for content changes
		watch(
			() => props.content,
			(newContent) => {
				if (!newContent) return;
				infoWindow.setContent(newContent);
			}
		);

		// Watch for zIndex changes
		watch(
			() => props.zIndex,
			(newZIndex) => {
				if (newZIndex === undefined || newZIndex === infoWindow.getZIndex()) {
					return;
				}
				infoWindow.setZIndex(newZIndex);
			}
		);

		// Watch for options changes
		watch(
			() => props.options,
			(newOptions) => {
				if (!newOptions) return;
				infoWindow.setOptions(newOptions);
			},
			{ deep: true }
		);

		// Watch for header-related properties
		watch(
			() => ({
				headerContent: props.headerContent,
				headerDisabled: props.headerDisabled,
				disableAutoPan: props.disableAutoPan,
				maxWidth: props.maxWidth,
				minWidth: props.minWidth,
			}),
			(newValues) => {
				const options: Partial<google.maps.InfoWindowOptions> = {};

				// Only include properties that are defined
				Object.entries(newValues).forEach(([key, value]) => {
					if (value !== undefined) {
						// Type assertion to ensure key is a valid property of InfoWindowOptions
						(options as any)[key] = value;
					}
				});

				if (Object.keys(options).length > 0) {
					infoWindow.setOptions(options);
				}
			},
			{ deep: true }
		);
	};

	return {
		setupWatchers,
	};
};
