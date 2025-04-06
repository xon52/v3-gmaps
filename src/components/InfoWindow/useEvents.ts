/**
 * Composable for handling InfoWindow events
 */
import { throttle } from '../../helpers';

// Type for the emit function that can be called with event names
type EmitFn = {
	(event: 'closeclick'): void;
	(event: 'content_changed'): void;
	(event: 'domready'): void;
	(event: 'position_changed', position: google.maps.LatLngLiteral | null): void;
	(event: 'zindex_changed', zIndex: number | null): void;
	(event: 'error', message: string): void;
	(event: 'mounted', infoWindow: google.maps.InfoWindow): void;
	(event: 'unmounted', infoWindow: google.maps.InfoWindow): void;
};

/**
 * Set up event listeners for an InfoWindow instance
 */
export const useInfoWindowEvents = (emit: EmitFn) => {
	// Track event listeners for cleanup
	const listeners: google.maps.MapsEventListener[] = [];

	/**
	 * Set up all event listeners
	 */
	const setupEvents = (infoWindow: google.maps.InfoWindow, throttleMs: number = 100): void => {
		// Handle throttled events
		setupThrottledEvents(infoWindow, throttleMs);

		// Handle regular (non-throttled) events
		setupRegularEvents(infoWindow);
	};

	/**
	 * Set up throttled events (like position changes)
	 */
	const setupThrottledEvents = (infoWindow: google.maps.InfoWindow, throttleMs: number): void => {
		// Position change event
		listeners.push(
			google.maps.event.addListener(
				infoWindow,
				'position_changed',
				throttle(() => {
					emit('position_changed', infoWindow.getPosition()?.toJSON() || null);
				}, throttleMs)
			)
		);

		// Z-index change event
		listeners.push(
			google.maps.event.addListener(
				infoWindow,
				'zindex_changed',
				throttle(() => {
					emit('zindex_changed', infoWindow.getZIndex() || null);
				}, throttleMs)
			)
		);
	};

	/**
	 * Set up regular (non-throttled) events
	 */
	const setupRegularEvents = (infoWindow: google.maps.InfoWindow): void => {
		// Close click event
		listeners.push(
			google.maps.event.addListener(infoWindow, 'closeclick', () => {
				emit('closeclick');
			})
		);

		// Content changed event
		listeners.push(
			google.maps.event.addListener(infoWindow, 'content_changed', () => {
				emit('content_changed');
			})
		);

		// DOM ready event
		listeners.push(
			google.maps.event.addListener(infoWindow, 'domready', () => {
				emit('domready');
			})
		);
	};

	/**
	 * Clean up all event listeners
	 */
	const cleanup = (infoWindow: google.maps.InfoWindow): void => {
		// Remove all listeners
		listeners.forEach((listener) => listener.remove());
		listeners.length = 0;

		// Clear any remaining instance listeners
		google.maps.event.clearInstanceListeners(infoWindow);
	};

	return {
		setupEvents,
		cleanup,
	};
};
