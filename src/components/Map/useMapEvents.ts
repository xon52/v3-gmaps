import { throttle } from '../../helpers';
import { getAPI } from '../../index';

// Define specific emit event types to improve type safety
type MapEventName =
	| 'click'
	| 'contextmenu'
	| 'dblclick'
	| 'mouseout'
	| 'mouseover'
	| 'rightclick'
	| 'mousemove'
	| 'dragend'
	| 'dragstart'
	| 'projection_changed'
	| 'renderingtype_changed'
	| 'tilesloaded'
	| 'drag'
	| 'idle'
	| 'bounds_changed'
	| 'center_changed'
	| 'heading_changed'
	| 'tilt_changed'
	| 'zoom_changed'
	| 'maptypeid_changed'
	| 'visible_region_changed'
	| 'capabilities_changed'
	| 'mounted'
	| 'unmounted'
	| 'error';

// Update to a more flexible emit function type compatible with Vue's emit
type EmitFunction = {
	<E extends MapEventName>(event: E, ...args: any[]): void;
};

export function useMapEvents(emit: EmitFunction) {
	const listeners: google.maps.MapsEventListener[] = [];

	// Setup event listeners for a map instance
	const setupEvents = async (mapInstance: google.maps.Map, throttleMs: number) => {
		const api = getAPI();
		const ge = api.event;

		// Groups of events with similar behavior
		type EventGroup = {
			events: string[];
			handler: (e: any, name: string) => void;
			throttled: boolean;
		};

		const eventGroups: EventGroup[] = [
			// Position events
			{
				events: ['click', 'contextmenu', 'dblclick', 'mouseout', 'mouseover', 'rightclick'],
				handler: (e: google.maps.MapMouseEvent, name: string) => emit(name as MapEventName, e.latLng?.toJSON() || null),
				throttled: false,
			},
			{
				events: ['mousemove'],
				handler: (e: google.maps.MapMouseEvent, name: string) => emit(name as MapEventName, e.latLng?.toJSON() || null),
				throttled: true,
			},

			// Empty events
			{
				events: ['dragend', 'dragstart', 'projection_changed', 'tilesloaded'],
				handler: (_: any, name: string) => emit(name as MapEventName),
				throttled: false,
			},
			{
				events: ['drag', 'idle'],
				handler: (_: any, name: string) => emit(name as MapEventName),
				throttled: true,
			},

			// Getter events
			{
				events: ['bounds_changed', 'center_changed'],
				handler: (_: any, name: string) => {
					let value = null;
					if (name === 'bounds_changed' && mapInstance.getBounds) {
						value = mapInstance.getBounds()?.toJSON() || null;
					} else if (name === 'center_changed' && mapInstance.getCenter) {
						value = mapInstance.getCenter()?.toJSON() || null;
					}

					emit(name as MapEventName, value);

					// Also update visible region on bounds change
					if (name === 'bounds_changed' && 'getVisibleRegion' in mapInstance) {
						const region = (mapInstance as any).getVisibleRegion();
						emit('visible_region_changed', region);
					}
				},
				throttled: true,
			},
			{
				events: ['heading_changed', 'tilt_changed', 'zoom_changed', 'maptypeid_changed'],
				handler: (_: any, name: string) => {
					let value = null;

					switch (name) {
						case 'heading_changed':
							value = mapInstance.getHeading?.() ?? null;
							break;
						case 'tilt_changed':
							value = mapInstance.getTilt?.() ?? null;
							break;
						case 'zoom_changed':
							value = mapInstance.getZoom?.() ?? null;
							break;
						case 'maptypeid_changed':
							value = mapInstance.getMapTypeId?.() ?? null;
							break;
					}

					emit(name as MapEventName, value);
				},
				throttled: false,
			},
			{
				events: ['renderingtype_changed'],
				handler: (_: any, name: string) => {
					emit(name as MapEventName);

					// Check for capabilities
					if ('getMapCapabilities' in mapInstance) {
						const capabilities = (mapInstance as any).getMapCapabilities();
						emit('capabilities_changed', capabilities);
					}

					// Check rendering type
					if ('getRenderingType' in mapInstance) {
						const type = (mapInstance as any).getRenderingType();
						emit('renderingtype_changed', type);
					}
				},
				throttled: false,
			},
		];

		eventGroups.forEach((group) => {
			group.events.forEach((eventName) => {
				const handler = (e: any) => group.handler(e, eventName);
				listeners.push(
					ge.addListener(mapInstance, eventName, group.throttled ? throttle(handler, throttleMs) : handler)
				);
			});
		});
	};

	// Cleanup event listeners
	const cleanup = (mapInstance: google.maps.Map | null) => {
		if (mapInstance) {
			listeners.forEach((listener) => listener.remove());
			const api = getAPI();
			api.event.clearInstanceListeners(mapInstance);
		}
	};

	return {
		setupEvents,
		cleanup,
		listeners,
	};
}
