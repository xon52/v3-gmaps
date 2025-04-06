import { ref } from 'vue';
import { polylinePathToPositions } from './utils';
import { throttle } from '../../helpers';

/**
 * Composable for handling polyline events
 */
export const usePolylineEvents = (emit: (event: string, ...args: any[]) => void) => {
	// Track event listeners for cleanup
	const listeners = ref<google.maps.MapsEventListener[]>([]);

	/**
	 * Set up event listeners for a polyline
	 */
	const setupEvents = async (polyline: google.maps.Polyline, throttleValue: number): Promise<void> => {
		const ge = google.maps.event;

		// High-frequency events that benefit from throttling
		const throttledEvents = ['drag', 'mousemove', 'mouseover'];

		// Add throttled common events
		throttledEvents.forEach((eventName) => {
			const listener = ge.addListener(
				polyline,
				eventName,
				throttle((e: google.maps.MapMouseEvent) => {
					emit(eventName, e.latLng?.toJSON() || null);
				}, throttleValue)
			);
			listeners.value.push(listener);
		});

		// Poly mouse events
		const polyMouseEvents = ['click', 'contextmenu', 'dblclick', 'mousedown', 'mouseout', 'mouseup', 'rightclick'];

		polyMouseEvents.forEach((eventName) => {
			const listener = ge.addListener(polyline, eventName, (e: google.maps.PolyMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() || null)
			);
			listeners.value.push(listener);
		});

		// Regular events like dragstart/dragend
		listeners.value.push(
			ge.addListener(polyline, 'dragstart', (e: google.maps.MapMouseEvent) =>
				emit('dragstart', e.latLng?.toJSON() || null)
			),
			ge.addListener(polyline, 'dragend', () => {
				emit('dragend');
				emit('path_changed', polylinePathToPositions(polyline));
			})
		);

		// Path change events
		listeners.value.push(
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
