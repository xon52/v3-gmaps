// Library types for stronger typing
type GoogleMapsLibraries = {
	core: google.maps.CoreLibrary;
	drawing: google.maps.DrawingLibrary;
	geometry: google.maps.GeometryLibrary;
	journeySharing: google.maps.JourneySharingLibrary;
	maps: google.maps.MapsLibrary;
	marker: google.maps.MarkerLibrary;
	places: google.maps.PlacesLibrary;
	streetView: google.maps.StreetViewLibrary;
	visualization: google.maps.VisualizationLibrary;
};

// Centralized API state management
const state = {
	isLoaded: false,
	api: null as typeof google.maps | null,
	libraries: {} as Record<string, unknown>,
};

// Add a ready promise that components can await
let readyPromise: Promise<void> | null = null;

// Check if Google Maps API is loaded
export const isLoaded = (): boolean => state.isLoaded;

// Get the Google Maps API instance
export const getAPI = (): typeof google.maps => {
	if (!state.isLoaded || !state.api) {
		throw new Error('v3-gmaps :: Google Maps API not loaded. Call load() first.');
	}
	return state.api;
};

// Get or create the ready promise
export const waitForReady = (): Promise<void> => {
	if (isLoaded()) {
		return Promise.resolve();
	}

	if (!readyPromise) {
		readyPromise = new Promise<void>((resolve, reject) => {
			// If the API is already loaded, resolve immediately
			if (state.isLoaded) {
				resolve();
				return;
			}

			// Create a watcher that checks every 100ms (or custom interval)
			const checkInterval = setInterval(() => {
				if (state.isLoaded) {
					clearInterval(checkInterval);
					resolve();
				}
			}, 100);

			// Add a timeout to prevent infinite waiting
			setTimeout(() => {
				clearInterval(checkInterval);
				if (!state.isLoaded) {
					reject(new Error('v3-gmaps :: Timed out waiting for Google Maps API to initialize'));
				}
			}, 10000); // 10 second default timeout
		});
	}

	return readyPromise;
};

// Load the API and set up initial state
export const load = (api: typeof google.maps): void => {
	state.api = api;
	state.isLoaded = true;
};

// Get a specific library, loading it if necessary
export const getLibrary = async <K extends keyof GoogleMapsLibraries>(
	libraryName: K
): Promise<GoogleMapsLibraries[K]> => {
	if (!state.isLoaded || !state.api) {
		throw new Error('v3-gmaps :: Google Maps API not loaded. Call load() first.');
	}

	if (!state.libraries[libraryName]) {
		state.libraries[libraryName] = await state.api.importLibrary(libraryName);
	}

	const library = state.libraries[libraryName];
	if (!library) {
		throw new Error(`v3-gmaps :: Invalid library returned for: ${libraryName}`);
	}

	return library as GoogleMapsLibraries[K];
};

// Reset state for testing - also reset the ready promise
export const resetCache = (): void => {
	state.isLoaded = false;
	state.api = null;
	state.libraries = {};
	readyPromise = null;
};
