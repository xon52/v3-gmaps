import { ref } from 'vue';

/**
 * Composable for handling heatmap events
 */
export const useHeatmapEvents = (emit: (event: string, ...args: any[]) => void) => {
	// Track event listeners for cleanup
	const listeners = ref<google.maps.MapsEventListener[]>([]);

	/**
	 * Set up event listeners for the heatmap
	 */
	const setupEvents = (heatmap: google.maps.visualization.HeatmapLayer): void => {
		// Currently, HeatmapLayer doesn't expose standard events like other Google Maps objects
		// This is intentionally left sparse as the HeatmapLayer has limited event capabilities
		// We're still setting up the structure for future extensibility or custom events
		// Note: As of latest Google Maps JS API, HeatmapLayer doesn't have built-in events
		// like 'click', 'mouseover', etc., but we maintain this structure for consistency
		// and to allow for future Google Maps API updates
	};

	/**
	 * Clean up all event listeners
	 */
	const cleanup = (heatmap: google.maps.visualization.HeatmapLayer): void => {
		listeners.value.forEach((listener) => listener.remove());
		listeners.value = [];

		// Extra safety: clear any potential instance listeners
		google.maps.event.clearInstanceListeners(heatmap);
	};

	return {
		setupEvents,
		cleanup,
		listeners,
	};
};
