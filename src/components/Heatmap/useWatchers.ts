import { watch, type WatchStopHandle } from 'vue';
import { formatDataPoint } from './utils';
import type { GmHeatmapProps } from '../../types';

/**
 * Composable for setting up watchers on heatmap properties
 */
export const useHeatmapWatchers = (heatmap: google.maps.visualization.HeatmapLayer, props: GmHeatmapProps) => {
	// Array to collect all watch stop handles for cleanup
	const watches: WatchStopHandle[] = [];

	/**
	 * Setup all watchers for the heatmap properties
	 */
	const setupWatchers = () => {
		// Watch items changes
		watches.push(
			watch(
				() => props.items,
				(newItems) => {
					if (newItems) {
						const formattedData = newItems.map((point) => formatDataPoint(point));
						heatmap.setData(formattedData);
					}
				},
				{ deep: true }
			)
		);

		// Watch individual properties

		// Dissipating
		watches.push(
			watch(
				() => props.dissipating,
				(newVal) => {
					if (newVal !== undefined) {
						const options: google.maps.visualization.HeatmapLayerOptions = { dissipating: newVal };
						heatmap.setOptions(options);
					}
				}
			)
		);

		// Gradient
		watches.push(
			watch(
				() => props.gradient,
				(newVal) => {
					// Always update the gradient, even if it's undefined
					const options: google.maps.visualization.HeatmapLayerOptions = { gradient: newVal };
					heatmap.setOptions(options);
				},
				{ deep: true }
			)
		);

		// MaxIntensity
		watches.push(
			watch(
				() => props.maxIntensity,
				(newVal) => {
					if (newVal !== undefined) {
						const options: google.maps.visualization.HeatmapLayerOptions = { maxIntensity: newVal };
						heatmap.setOptions(options);
					}
				}
			)
		);

		// Opacity
		watches.push(
			watch(
				() => props.opacity,
				(newVal) => {
					if (newVal !== undefined) {
						const options: google.maps.visualization.HeatmapLayerOptions = { opacity: newVal };
						heatmap.setOptions(options);
					}
				}
			)
		);

		// Radius
		watches.push(
			watch(
				() => props.radius,
				(newVal) => {
					if (newVal !== undefined) {
						const options: google.maps.visualization.HeatmapLayerOptions = { radius: newVal };
						heatmap.setOptions(options);
					}
				}
			)
		);

		// Watch options object
		watches.push(
			watch(
				() => props.options,
				(newVal) => {
					if (newVal) {
						heatmap.setOptions(newVal);
					}
				},
				{ deep: true }
			)
		);
	};

	/**
	 * Stop all watchers
	 */
	const stopWatches = () => {
		watches.forEach((unwatch) => unwatch());
	};

	return {
		setupWatchers,
		stopWatches,
	};
};
