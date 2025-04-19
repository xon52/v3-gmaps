import { watch, WatchStopHandle } from 'vue';
import { isEqual } from '../../helpers';
import { getOptions } from './utils';

/**
 * Sets up watchers for circle properties
 */
export function useCircleWatchers(circle: google.maps.Circle | null, props: any) {
	const watches: WatchStopHandle[] = [];

	// Circle watchers
	if (circle) {
		// Common properties
		watches.push(
			watch(
				() => props.draggable,
				(v) => {
					const draggable = circle.getDraggable();
					if (v !== undefined && v !== draggable) {
						circle.setDraggable(v);
					}
				}
			),

			watch(
				() => props.editable,
				(v) => {
					const editable = circle.getEditable();
					if (v !== undefined && v !== editable) {
						circle.setEditable(v);
					}
				}
			),

			watch(
				() => props.visible,
				(v) => {
					const visible = circle.getVisible();
					if (v !== undefined && v !== visible) {
						circle.setVisible(v);
					}
				}
			),

			watch(
				() => props.center,
				(v) => {
					if (v === undefined || isEqual(v, circle.getCenter()?.toJSON())) return;
					circle.setCenter(v);
				},
				{ deep: true }
			),

			watch(
				() => props.radius,
				(v) => {
					if (v === undefined || v === circle.getRadius()) return;
					circle.setRadius(v);
				}
			),

			// Watch for style options changes
			watch(
				() => props.options,
				(newOptions) => {
					if (newOptions) {
						// Create a temporary props object with just the new options
						const tempProps = { options: newOptions };
						const processedOptions = getOptions(tempProps as any);
						circle.setOptions(processedOptions);
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
