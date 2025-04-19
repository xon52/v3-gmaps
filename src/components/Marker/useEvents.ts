import { ref } from 'vue';
import type { MarkerEvents } from './types';
import { throttle } from '../../helpers';
import type { GmPosition } from '../../types';

/**
 * Simple composable for handling marker events
 */
export const useMarkerEvents = (emit: (event: keyof MarkerEvents, ...args: any[]) => void) => {
	// Track event listeners for cleanup
	const listeners = ref<google.maps.MapsEventListener[]>([]);

	/**
	 * Set up event listeners for a marker
	 */
	const setupEvents = async (
		marker: google.maps.marker.AdvancedMarkerElement,
		throttleValue: number
	): Promise<void> => {
		// High-frequency events that benefit from throttling
		const throttledEvents = ['drag', 'mouseover'];

		// Regular events
		const regularEvents = [
			'click',
			'dragend',
			'dragstart',
			'mouseout',
			'mousedown',
			'mouseup',
			'rightclick',
			'dblclick',
			'contextmenu',
		];

		// Add throttled event listeners
		throttledEvents.forEach((eventName) => {
			const listener = google.maps.event.addListener(
				marker,
				eventName,
				throttle((e: google.maps.MapMouseEvent) => {
					emit(eventName as keyof MarkerEvents, e.latLng?.toJSON() as GmPosition);
				}, throttleValue)
			);
			listeners.value.push(listener);
		});

		// Add regular event listeners
		regularEvents.forEach((eventName) => {
			const listener = google.maps.event.addListener(marker, eventName, (e: google.maps.MapMouseEvent) => {
				emit(eventName as keyof MarkerEvents, e.latLng?.toJSON() as GmPosition);
			});
			listeners.value.push(listener);
		});

		// Create a throttled position change handler
		const positionHandler = throttle((position: any) => {
			emit(
				'position_changed',
				position && 'lat' in position && 'lng' in position ? { lat: position.lat, lng: position.lng } : null
			);
		}, throttleValue);

		// Simple observer for position changes
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'position') {
					positionHandler(marker.position);
				}
			});
		});

		// Observe position changes
		observer.observe(marker, { attributes: true, attributeFilter: ['position'] });
		(marker as any).__positionObserver = observer;
	};

	/**
	 * Clean up all event listeners
	 */
	const cleanup = (marker: google.maps.marker.AdvancedMarkerElement): void => {
		// Remove listeners
		listeners.value.forEach((listener) => listener.remove());
		listeners.value = [];

		// Remove observer
		if ((marker as any).__positionObserver) {
			(marker as any).__positionObserver.disconnect();
			delete (marker as any).__positionObserver;
		}
	};

	return {
		setupEvents,
		cleanup,
		listeners,
	};
};
