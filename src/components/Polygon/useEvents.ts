import { ref } from 'vue';
import { polygonPathsToPositions } from './utils';
import { throttle } from '../../helpers';
import type { GmPosition } from '../../types';
/**
 * Composable for handling polygon events
 */
export const usePolygonEvents = (emit: (event: string, ...args: any[]) => void) => {
	// Track event listeners for cleanup
	const listeners = ref<google.maps.MapsEventListener[]>([]);

	/**
	 * Set up event listeners for a polygon
	 */
	const setupEvents = async (polygon: google.maps.Polygon, throttleValue: number): Promise<void> => {
		const ge = google.maps.event;

		// High-frequency events that benefit from throttling
		const throttledEvents = ['drag', 'mousemove', 'mouseover'];

		// Add throttled common events
		throttledEvents.forEach((eventName) => {
			const listener = ge.addListener(
				polygon,
				eventName,
				throttle((e: google.maps.MapMouseEvent) => {
					emit(eventName, e.latLng?.toJSON() as GmPosition);
				}, throttleValue)
			);
			listeners.value.push(listener);
		});

		// Poly mouse events
		const polyMouseEvents = ['click', 'contextmenu', 'dblclick', 'mousedown', 'mouseout', 'mouseup', 'rightclick'];

		polyMouseEvents.forEach((eventName) => {
			const listener = ge.addListener(polygon, eventName, (e: google.maps.PolyMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() as GmPosition)
			);
			listeners.value.push(listener);
		});

		// Regular events like dragstart/dragend
		listeners.value.push(
			ge.addListener(polygon, 'dragstart', (e: google.maps.MapMouseEvent) =>
				emit('dragstart', e.latLng?.toJSON() as GmPosition)
			),
			ge.addListener(polygon, 'dragend', () => {
				emit('dragend');
				emit('paths_changed', polygonPathsToPositions(polygon));
			})
		);

		// Path change events
		listeners.value.push(
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
