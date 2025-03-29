import { ref } from 'vue';
import { debounce } from '../../helpers';

type EmitFn = (event: 'error', payload: string) => void;

/**
 * Hook to manage Google Maps state and capabilities
 * @param emit Function to emit events to parent component
 */
export function useMapState(emit: EmitFn) {
	// Core state refs
	const mapEl = ref<HTMLElement | null>(null);
	const error = ref<string | null>(null);
	const ready = ref(false);

	// Extended state for newer Google Maps features
	const capabilities = ref<google.maps.MapCapabilities | null>(null);
	const visibleRegion = ref<google.maps.VisibleRegion | null>(null);
	const renderingType = ref<string | null>(null);

	/**
	 * Error handler with debounce
	 * @param e Error object
	 * @param source Error source identifier
	 */
	const handleError = debounce((e: Error, source: string) => {
		const errorMsg = e.message || 'Unknown error occurred';
		error.value = `[${source}]: ${errorMsg}`;
		console.error(error.value, e);
		emit('error', error.value);
	}, 500);

	/**
	 * Updates map capabilities and feature availability
	 * @param mapInstance Google Maps instance
	 */
	const updateCapabilities = (mapInstance: google.maps.Map) => {
		// Cast to any to access experimental or non-typed features
		const map = mapInstance as any;

		// Safely check for feature availability
		try {
			if (typeof map.getMapCapabilities === 'function') {
				capabilities.value = map.getMapCapabilities();
			}

			if (typeof map.getVisibleRegion === 'function') {
				visibleRegion.value = map.getVisibleRegion();
			}

			if (typeof map.getRenderingType === 'function') {
				renderingType.value = map.getRenderingType();
			}
		} catch (e) {
			handleError(e as Error, 'updateCapabilities');
		}
	};

	return {
		mapEl,
		error,
		ready,
		capabilities,
		visibleRegion,
		renderingType,
		handleError,
		updateCapabilities,
	};
}
