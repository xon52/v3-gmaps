import { ref } from 'vue';
import { polygonPathsToPositions, polylinePathToPositions, ShapeType } from './shapeUtils';
import { throttle } from '../../helpers';

/**
 * Composable for handling shape events with support for all shape types
 */
export const useShapeEvents = (emit: (event: string, ...args: any[]) => void) => {
	// Track event listeners for cleanup
	const listeners = ref<google.maps.MapsEventListener[]>([]);

	/**
	 * Set up common event listeners for all shape types
	 */
	const setupCommonEvents = (shape: google.maps.MVCObject, throttleValue: number): void => {
		const ge = google.maps.event;

		// High-frequency events that benefit from throttling
		const throttledEvents = ['drag', 'mousemove', 'mouseover'];

		// Add throttled common events
		throttledEvents.forEach((eventName) => {
			const listener = ge.addListener(
				shape,
				eventName,
				throttle((e: google.maps.MapMouseEvent) => {
					emit(eventName, e.latLng?.toJSON() || null);
				}, throttleValue)
			);
			listeners.value.push(listener);
		});

		// Regular events
		const regularEvents = ['dragend', 'dragstart'];

		// Add regular common events
		regularEvents.forEach((eventName) => {
			const listener = ge.addListener(shape, eventName, (e: google.maps.MapMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() || null)
			);
			listeners.value.push(listener);
		});
	};

	/**
	 * Set up Circle-specific event listeners
	 */
	const setupCircleEvents = (circle: google.maps.Circle, throttleValue: number): void => {
		const ge = google.maps.event;

		// Throttled property events
		listeners.value.push(
			ge.addListener(
				circle,
				'center_changed',
				throttle(() => emit('center_changed', circle.getCenter()?.toJSON() || null), throttleValue)
			),
			ge.addListener(
				circle,
				'radius_changed',
				throttle(() => emit('radius_changed', circle.getRadius()), throttleValue)
			)
		);

		// Regular mouse events
		const mouseEvents = ['click', 'dblclick', 'mousedown', 'mouseout', 'mouseup', 'rightclick', 'contextmenu'];

		mouseEvents.forEach((eventName) => {
			const listener = ge.addListener(circle, eventName, (e: google.maps.MapMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() || null)
			);
			listeners.value.push(listener);
		});
	};

	/**
	 * Set up Rectangle-specific event listeners
	 */
	const setupRectangleEvents = (rectangle: google.maps.Rectangle, throttleValue: number): void => {
		const ge = google.maps.event;

		// Throttled property events
		listeners.value.push(
			ge.addListener(
				rectangle,
				'bounds_changed',
				throttle(() => emit('bounds_changed', rectangle.getBounds()?.toJSON() || null), throttleValue)
			)
		);

		// Regular mouse events
		const mouseEvents = ['click', 'dblclick', 'mousedown', 'mouseout', 'mouseup', 'rightclick', 'contextmenu'];

		mouseEvents.forEach((eventName) => {
			const listener = ge.addListener(rectangle, eventName, (e: google.maps.MapMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() || null)
			);
			listeners.value.push(listener);
		});
	};

	/**
	 * Set up Polygon-specific event listeners
	 */
	const setupPolygonEvents = (polygon: google.maps.Polygon): void => {
		const ge = google.maps.event;

		// Poly mouse events
		const polyMouseEvents = ['click', 'contextmenu', 'dblclick', 'mousedown', 'mouseout', 'mouseup', 'rightclick'];

		polyMouseEvents.forEach((eventName) => {
			const listener = ge.addListener(polygon, eventName, (e: google.maps.PolyMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() || null)
			);
			listeners.value.push(listener);
		});

		// Path change events
		listeners.value.push(
			ge.addListener(polygon, 'dragend', () => emit('paths_changed', polygonPathsToPositions(polygon))),
			ge.addListener(polygon, 'mouseup', (e: google.maps.PolyMouseEvent) =>
				e.path !== undefined ? emit('paths_changed', polygonPathsToPositions(polygon)) : null
			)
		);

		// Add listeners to paths
		polygon.getPaths().forEach((path) => {
			const pathListener = path.addListener('remove_at', () => emit('paths_changed', polygonPathsToPositions(polygon)));
			listeners.value.push(pathListener);
		});
	};

	/**
	 * Set up Polyline-specific event listeners
	 */
	const setupPolylineEvents = (polyline: google.maps.Polyline): void => {
		const ge = google.maps.event;

		// Poly mouse events
		const polyMouseEvents = ['click', 'contextmenu', 'dblclick', 'mousedown', 'mouseout', 'mouseup', 'rightclick'];

		polyMouseEvents.forEach((eventName) => {
			const listener = ge.addListener(polyline, eventName, (e: google.maps.PolyMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() || null)
			);
			listeners.value.push(listener);
		});

		// Path change events
		listeners.value.push(
			ge.addListener(polyline, 'dragend', () => emit('path_changed', polylinePathToPositions(polyline))),
			ge.addListener(polyline, 'mouseup', (e: google.maps.PolyMouseEvent) =>
				e.vertex !== undefined || e.edge !== undefined ? emit('path_changed', polylinePathToPositions(polyline)) : null
			)
		);

		// Add path listeners
		const pathListener = polyline
			.getPath()
			.addListener('remove_at', () => emit('path_changed', polylinePathToPositions(polyline)));
		listeners.value.push(pathListener);
	};

	/**
	 * Set up event listeners for a shape based on its type
	 */
	const setupEvents = async (
		shape: google.maps.MVCObject,
		shapeType: ShapeType,
		throttleValue: number
	): Promise<void> => {
		// Setup common events that all shapes share
		setupCommonEvents(shape, throttleValue);

		// Setup shape-specific events based on shape type
		switch (shapeType) {
			case ShapeType.CIRCLE:
				setupCircleEvents(shape as google.maps.Circle, throttleValue);
				break;
			case ShapeType.RECTANGLE:
				setupRectangleEvents(shape as google.maps.Rectangle, throttleValue);
				break;
			case ShapeType.POLYGON:
				setupPolygonEvents(shape as google.maps.Polygon);
				break;
			case ShapeType.POLYLINE:
				setupPolylineEvents(shape as google.maps.Polyline);
				break;
			default:
				console.warn(`Unknown shape type: ${shapeType}`);
		}
	};

	/**
	 * Clean up all event listeners
	 */
	const cleanup = (): void => {
		listeners.value.forEach((listener) => listener.remove());
		listeners.value = [];
	};

	return {
		setupEvents,
		cleanup,
		listeners,
	};
};
