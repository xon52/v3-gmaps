import { watch, WatchStopHandle } from 'vue';
import { isEqual } from '../../helpers';
import { getOptions } from './utils';

/**
 * Sets up watchers for polygon properties
 */
export function usePolygonWatchers(polygon: google.maps.Polygon | null, props: any) {
	const watches: WatchStopHandle[] = [];

	// Polygon watchers
	if (polygon) {
		// Common properties
		watches.push(
			watch(
				() => props.draggable,
				(v) => {
					const draggable = polygon.getDraggable();
					if (v !== undefined && v !== draggable) {
						polygon.setDraggable(v);
					}
				}
			),

			watch(
				() => props.editable,
				(v) => {
					const editable = polygon.getEditable();
					if (v !== undefined && v !== editable) {
						polygon.setEditable(v);
					}
				}
			),

			watch(
				() => props.visible,
				(v) => {
					const visible = polygon.getVisible();
					if (v !== undefined && v !== visible) {
						polygon.setVisible(v);
					}
				}
			),

			watch(
				() => props.paths,
				(v) => {
					if (v === undefined || isEqual(v, polygon.getPaths())) return;
					polygon.setPaths(v as any);
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
						polygon.setOptions(processedOptions);
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
