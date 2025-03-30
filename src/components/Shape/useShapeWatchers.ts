import { watch, WatchStopHandle } from 'vue';
import { ShapeType } from './shapeUtils';
import { isEqual } from '../../helpers';

/**
 * Sets up watchers for various shape properties
 */
export function useShapeWatchers(shape: google.maps.MVCObject | null, props: any, shapeType: ShapeType) {
	const watches: WatchStopHandle[] = [];

	// Common watchers for all shapes
	if (shape) {
		// Common properties
		watches.push(
			watch(
				() => props.draggable,
				(v) => {
					const draggable = (shape as any).getDraggable();
					if (v !== undefined && v !== draggable) {
						(shape as any).setDraggable(v);
					}
				}
			),

			watch(
				() => props.editable,
				(v) => {
					const editable = (shape as any).getEditable();
					if (v !== undefined && v !== editable) {
						(shape as any).setEditable(v);
					}
				}
			),

			watch(
				() => props.visible,
				(v) => {
					const visible = (shape as any).getVisible();
					if (v !== undefined && v !== visible) {
						(shape as any).setVisible(v);
					}
				}
			)
		);

		// Shape-specific watchers
		if (shapeType === ShapeType.CIRCLE) {
			const circle = shape as google.maps.Circle;
			watches.push(
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
				)
			);
		} else if (shapeType === ShapeType.RECTANGLE) {
			const rectangle = shape as google.maps.Rectangle;
			watches.push(
				watch(
					() => props.bounds,
					(v) => {
						if (v === undefined || isEqual(v, rectangle.getBounds()?.toJSON())) return;
						rectangle.setBounds(v);
					},
					{ deep: true }
				)
			);
		} else if (shapeType === ShapeType.POLYGON) {
			const polygon = shape as google.maps.Polygon;
			watches.push(
				watch(
					() => props.paths,
					(v) => {
						if (v === undefined || isEqual(v, polygon.getPaths())) return;
						polygon.setPaths(v as any);
					},
					{ deep: true }
				)
			);
		} else if (shapeType === ShapeType.POLYLINE) {
			const polyline = shape as google.maps.Polyline;
			watches.push(
				watch(
					() => props.path,
					(v) => {
						if (v === undefined || isEqual(v, polyline.getPath())) return;
						polyline.setPath(v as any);
					},
					{ deep: true }
				)
			);
		}
	}

	return {
		watches,
		stopWatches: () => watches.forEach((watcher) => watcher()),
	};
}
