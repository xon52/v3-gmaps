import { ref } from 'vue';
import { throttle } from '../../helpers';

/**
 * Composable for handling circle events
 */
export const useCircleEvents = (emit: (event: string, ...args: any[]) => void) => {
	// Track event listeners for cleanup
	const listeners = ref<google.maps.MapsEventListener[]>([]);

	/**
	 * Set up event listeners for a circle
	 */
	const setupEvents = async (circle: google.maps.Circle, throttleValue: number): Promise<void> => {
		const ge = google.maps.event;

		// High-frequency events that benefit from throttling
		const throttledEvents = ['drag', 'mousemove', 'mouseover'];

		// Add throttled common events
		throttledEvents.forEach((eventName) => {
			const listener = ge.addListener(
				circle,
				eventName,
				throttle((e: google.maps.MapMouseEvent) => {
					emit(eventName, e.latLng?.toJSON() || null);
				}, throttleValue)
			);
			listeners.value.push(listener);
		});

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
			const listener = ge.addListener(circle, eventName, (e: google.maps.MapMouseEvent) =>
				emit(eventName, e.latLng?.toJSON() || null)
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
