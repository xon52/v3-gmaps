import { type Ref, type ComputedRef, inject, InjectionKey, provide } from 'vue';

export interface MapContext {
	getMap: () => google.maps.Map;
	throttle: ComputedRef<number>;
	handleError: (error: Error, source?: string) => void;
}

const MapContextKey: InjectionKey<MapContext> = Symbol('MapContext');

export function createMapContext(context: MapContext): MapContext {
	// Provide the context to descendant components
	provide(MapContextKey, context);
	return context;
}

export function useMapContext(): MapContext {
	const context = inject(MapContextKey);
	if (!context) {
		throw new Error('MapContext not found. Make sure your component is a child of a Map component.');
	}
	return context;
}
