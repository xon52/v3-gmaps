import { watch, type WatchStopHandle } from 'vue';
import { formatHeatmapData } from './heatmapUtils';
import type { HeatmapProps } from './types';

/**
 * Composable for setting up watchers on heatmap properties
 */
export const useHeatmapWatchers = (heatmap: google.maps.visualization.HeatmapLayer, props: HeatmapProps) => {
	// Array to collect all watch stop handles for cleanup
	const watches: WatchStopHandle[] = [];

	/**
	 * Setup all watchers for the heatmap properties
	 */
	const setupWatchers = () => {
		// Watch data changes
		watches.push(
			watch(
				() => props.data,
				(newData) => {
					if (newData) {
						heatmap.setData(formatHeatmapData(newData));
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
					if (newVal !== undefined) {
						const options: google.maps.visualization.HeatmapLayerOptions = { gradient: newVal };
						heatmap.setOptions(options);
					}
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
