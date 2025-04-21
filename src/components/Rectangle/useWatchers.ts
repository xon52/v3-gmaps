import { watch, WatchStopHandle } from 'vue';
import { isEqual } from '../../helpers';
import { getOptions } from './utils';

/**
 * Sets up watchers for rectangle properties
 */
export function useRectangleWatchers(rectangle: google.maps.Rectangle | null, props: any) {
	const watches: WatchStopHandle[] = [];

	// Rectangle watchers
	if (rectangle) {
		// Common properties
		watches.push(
			watch(
				() => props.draggable,
				(v) => {
					const draggable = rectangle.getDraggable();
					if (v !== undefined && v !== draggable) {
						rectangle.setDraggable(v);
					}
				}
			),

			watch(
				() => props.editable,
				(v) => {
					const editable = rectangle.getEditable();
					if (v !== undefined && v !== editable) {
						rectangle.setEditable(v);
					}
				}
			),

			watch(
				() => props.visible,
				(v) => {
					const visible = rectangle.getVisible();
					if (v !== undefined && v !== visible) {
						rectangle.setVisible(v);
					}
				}
			),

			watch(
				() => props.bounds,
				(v) => {
					if (v === undefined || isEqual(v, rectangle.getBounds()?.toJSON())) return;
					rectangle.setBounds(v);
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
						rectangle.setOptions(processedOptions);
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
