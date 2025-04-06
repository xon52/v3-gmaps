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

		// Watch for content changes
		watch(
			() => props.content,
			(newContent) => {
				if (!newContent) return;
				infoWindow.setContent(newContent);
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

		// Watch for header content changes
		watch(
			() => [props.headerContent, props.headerDisabled],
			(newValues) => {
				const options: google.maps.InfoWindowOptions = {};
				const [newHeaderContent, newHeaderDisabled] = newValues;

				if (newHeaderContent !== undefined) {
					// Type assertion needed because the InfoWindow expects Element | string | Text
					options.headerContent = newHeaderContent as string | Element | Text;
				}

				if (newHeaderDisabled !== undefined) {
					// Type assertion needed because the InfoWindow expects boolean
					options.headerDisabled = newHeaderDisabled as boolean;
				}

				if (Object.keys(options).length > 0) {
					infoWindow.setOptions(options);
				}
			}
		);

		// Watch for other property changes
		watch(
			() => [props.ariaLabel, props.disableAutoPan, props.maxWidth, props.minWidth, props.pixelOffset],
			(newValues) => {
				const options: google.maps.InfoWindowOptions = {};

				// Unpack the array and use type assertions
				const [ariaLabel, disableAutoPan, maxWidth, minWidth, pixelOffset] = newValues;

				if (ariaLabel !== undefined) {
					options.ariaLabel = ariaLabel as string;
				}

				if (disableAutoPan !== undefined) {
					options.disableAutoPan = disableAutoPan as boolean;
				}

				if (maxWidth !== undefined) {
					options.maxWidth = maxWidth as number;
				}

				if (minWidth !== undefined) {
					options.minWidth = minWidth as number;
				}

				if (pixelOffset !== undefined) {
					options.pixelOffset = pixelOffset as google.maps.Size;
				}

				if (Object.keys(options).length > 0) {
					infoWindow.setOptions(options);
				}
			}
		);
	};

	return {
		setupWatchers,
	};
};
