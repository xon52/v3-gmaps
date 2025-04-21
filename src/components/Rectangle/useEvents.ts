import { ref } from 'vue';
import { throttle } from '../../helpers';
import type { GmBounds, GmPosition } from '../../types';

/**
 * Composable for handling rectangle events
 */
export const useRectangleEvents = (emit: (event: string, ...args: any[]) => void) => {
	// Track event listeners for cleanup
	const listeners = ref<google.maps.MapsEventListener[]>([]);

	/**
	 * Set up event listeners for a rectangle
	 */
	const setupEvents = async (rectangle: google.maps.Rectangle, throttleValue: number): Promise<void> => {
		const ge = google.maps.event;

		// High-frequency events that benefit from throttling
		const throttledEvents = ['drag', 'mousemove', 'mouseover'];

		// Add throttled common events
		throttledEvents.forEach((eventName) => {
			const listener = ge.addListener(
				rectangle,
				eventName,
				throttle((e: google.maps.MapMouseEvent) => {
					emit(eventName, e.latLng?.toJSON() as GmPosition);
				}, throttleValue)
			);
			listeners.value.push(listener);
		});

		// Throttled property events
		listeners.value.push(
			ge.addListener(
				rectangle,
				'bounds_changed',
				throttle(() => emit('bounds_changed', rectangle.getBounds()?.toJSON() as GmBounds), throttleValue)
			)
		);

		// Regular events
		const regularEvents = [
			'dragend',
			'dragstart',
			'click',
			'dblclick',
			'mousedown',
			'mouseout',
			'mouseup',
			'rightclick',
			'contextmenu',
		];

		// Add regular common events
		regularEvents.forEach((eventName) => {
			const listener = ge.addListener(rectangle, eventName, (e: google.maps.MapMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() as GmPosition)
			);
			listeners.value.push(listener);
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
