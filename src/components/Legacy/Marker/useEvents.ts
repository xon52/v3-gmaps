import { ref } from 'vue';
import type { GmLegacyMarkerEvents } from '../../../types/legacyMarker.js';
import { throttle } from '../../../helpers/index.js';

/**
 * Composable for handling legacy marker events
 */
export const useLegacyMarkerEvents = (emit: (event: keyof GmLegacyMarkerEvents, ...args: any[]) => void) => {
	// Track event listeners for cleanup
	const listeners = ref<google.maps.MapsEventListener[]>([]);

	/**
	 * Set up event listeners for a marker
	 */
	const setupEvents = (marker: google.maps.Marker, throttleValue: number): void => {
		// Events that should be throttled (high-frequency events)
		const throttledEvents = [
			{ name: 'drag', handler: (e: google.maps.MapMouseEvent) => emit('drag', e.latLng?.toJSON() || null) },
			{ name: 'mouseover', handler: (e: google.maps.MapMouseEvent) => emit('mouseover', e.latLng?.toJSON() || null) },
			{
				name: 'position_changed',
				handler: () => emit('position_changed', marker.getPosition()?.toJSON() || undefined),
			},
		];

		// Events that should not be throttled
		const regularEvents = [
			{ name: 'animation_changed', handler: () => emit('animation_changed') },
			{ name: 'click', handler: (e: google.maps.MapMouseEvent) => emit('click', e.latLng?.toJSON() || null) },
			{ name: 'clickable_changed', handler: () => emit('clickable_changed', marker.getClickable()) },
			{
				name: 'contextmenu',
				handler: (e: google.maps.MapMouseEvent) => emit('contextmenu', e.latLng?.toJSON() || null),
			},
			{ name: 'cursor_changed', handler: () => emit('cursor_changed', marker.getCursor()) },
			{ name: 'dblclick', handler: (e: google.maps.MapMouseEvent) => emit('dblclick', e.latLng?.toJSON() || null) },
			{ name: 'dragend', handler: (e: google.maps.MapMouseEvent) => emit('dragend', e.latLng?.toJSON() || null) },
			{ name: 'draggable_changed', handler: () => emit('draggable_changed', marker.getDraggable()) },
			{ name: 'dragstart', handler: (e: google.maps.MapMouseEvent) => emit('dragstart', e.latLng?.toJSON() || null) },
			{ name: 'flat_changed', handler: () => emit('flat_changed') },
			{ name: 'icon_changed', handler: () => emit('icon_changed') },
			{ name: 'mousedown', handler: (e: google.maps.MapMouseEvent) => emit('mousedown', e.latLng?.toJSON() || null) },
			{ name: 'mouseout', handler: (e: google.maps.MapMouseEvent) => emit('mouseout', e.latLng?.toJSON() || null) },
			{ name: 'mouseup', handler: (e: google.maps.MapMouseEvent) => emit('mouseup', e.latLng?.toJSON() || null) },
			{ name: 'rightclick', handler: (e: google.maps.MapMouseEvent) => emit('rightclick', e.latLng?.toJSON() || null) },
			{ name: 'shape_changed', handler: () => emit('shape_changed') },
			{ name: 'title_changed', handler: () => emit('title_changed', marker.getTitle()) },
			{ name: 'visible_changed', handler: () => emit('visible_changed', marker.getVisible()) },
			{ name: 'zindex_changed', handler: () => emit('zindex_changed', marker.getZIndex()) },
		];

		// Add throttled event listeners
		throttledEvents.forEach(({ name, handler }) => {
			const listener = google.maps.event.addListener(marker, name, throttle(handler, throttleValue));
			listeners.value.push(listener);
		});

		// Add regular event listeners
		regularEvents.forEach(({ name, handler }) => {
			const listener = google.maps.event.addListener(marker, name, handler);
			listeners.value.push(listener);
		});
	};

	/**
	 * Clean up all event listeners
	 */
	const cleanup = (): void => {
		// Remove listeners
		listeners.value.forEach((listener) => listener.remove());
		listeners.value = [];
	};

	return {
		setupEvents,
		cleanup,
		listeners,
	};
};
