import { GmapsError } from '../types/errors';

// Library types for stronger typing
type GoogleMapsLibraries = {
	maps: google.maps.MapsLibrary;
	marker: google.maps.MarkerLibrary;
	// Add other libraries as needed
};

// Centralized API state management
const state = {
	isLoaded: false,
	api: null as typeof google.maps | null,
	libraries: {} as Record<string, unknown>,
};

// Check if Google Maps API is loaded
export const isLoaded = (): boolean => state.isLoaded;

// Get the Google Maps API instance
export const getAPI = (): typeof google.maps => {
	if (!state.isLoaded || !state.api) {
		throw new GmapsError('Google Maps API not loaded. Call load() first.');
	}
	return state.api;
};

// Load the API and set up initial state
export const load = (api: typeof google.maps): void => {
	state.api = api;
	state.isLoaded = true;
};

// Get a specific library, loading it if necessary
const getLibrary = async <K extends keyof GoogleMapsLibraries>(libraryName: K): Promise<GoogleMapsLibraries[K]> => {
	if (!state.isLoaded || !state.api) {
		throw new GmapsError('Google Maps API not loaded. Call load() first.');
	}

	if (!state.libraries[libraryName]) {
		state.libraries[libraryName] = await state.api.importLibrary(libraryName);
	}

	const library = state.libraries[libraryName];
	if (!library) {
		throw new GmapsError(`Invalid library returned for: ${libraryName}`);
	}

	return library as GoogleMapsLibraries[K];
};

// Specific library getters
export const getMapsLib = async (): Promise<google.maps.MapsLibrary> => getLibrary('maps');
export const getMarkersLib = async (): Promise<google.maps.MarkerLibrary> => getLibrary('marker');

// Reset state for testing
export const resetCache = (): void => {
	state.isLoaded = false;
	state.api = null;
	state.libraries = {};
};
