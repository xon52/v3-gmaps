import { watch, WatchStopHandle } from 'vue';
import { isEqual } from '../../helpers';
import { getOptions } from './utils';

/**
 * Sets up watchers for polyline properties
 */
export function usePolylineWatchers(polyline: google.maps.Polyline | null, props: any) {
	const watches: WatchStopHandle[] = [];

	// Polyline watchers
	if (polyline) {
		// Common properties
		watches.push(
			watch(
				() => props.draggable,
				(v) => {
					const draggable = polyline.getDraggable();
					if (v !== undefined && v !== draggable) {
						polyline.setDraggable(v);
					}
				}
			),

			watch(
				() => props.editable,
				(v) => {
					const editable = polyline.getEditable();
					if (v !== undefined && v !== editable) {
						polyline.setEditable(v);
					}
				}
			),

			watch(
				() => props.visible,
				(v) => {
					const visible = polyline.getVisible();
					if (v !== undefined && v !== visible) {
						polyline.setVisible(v);
					}
				}
			),

			watch(
				() => props.path,
				(v) => {
					if (v === undefined || isEqual(v, polyline.getPath())) return;
					polyline.setPath(v as any);
				},
				{ deep: true }
			),

			// Watch for style options changes
			watch(
				() => props.options,
				(newOptions) => {
					if (newOptions) {
						// Create a temporary props object with just the new options
						const tempProps = { options: newOptions };
						const processedOptions = getOptions(tempProps as any);
						polyline.setOptions(processedOptions);
					}
				},
				{ deep: true }
			)
		);
	}

	return {
		watches,
		stopWatches: () => watches.forEach((watcher) => watcher()),
	};
}
