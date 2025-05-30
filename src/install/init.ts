import insert from './insert';
import { GmApiOptions } from '../';
import { load, isLoaded } from './api';

// Module state
const state = {
	isLoading: false,
};

// Internal reset function for testing
export const resetState = (): void => {
	state.isLoading = false;
};

// Validate initialization state
const validateInitState = (): void => {
	if (isLoaded()) {
		throw new Error('v3-gmaps :: Google Maps API is already initialized');
	}

	if (state.isLoading) {
		throw new Error('v3-gmaps :: Google Maps API initialization already in progress');
	}
};

// Setup the global callback for Maps API initialization
const setupGlobalCallback = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		globalThis._gmapsInit = () => {
			if (globalThis.google?.maps) {
				load(globalThis.google.maps);
				resolve();
			} else {
				reject(new Error('v3-gmaps :: Maps API failed to initialize after loading'));
			}
		};
	});
};

// Create a timeout promise for the initialization
const createTimeoutPromise = (timeout: number): Promise<void> => {
	return new Promise<void>((_, reject) => {
		setTimeout(() => {
			reject(
				new Error(
					`v3-gmaps :: Loading timeout exceeded (${timeout}ms) - please check your network connection and API key`
				)
			);
		}, timeout);
	});
};

// Initialize the Google Maps API
export const init = async (options: GmApiOptions): Promise<void> => {
	// Validate current state
	validateInitState();

	// Set state to loading
	state.isLoading = true;

	// Setup global callback
	const callbackPromise = setupGlobalCallback();

	// Loading timeout (in ms) - allow configuration or use default
	const timeout = options.timeout || 5000;

	try {
		// Create timeout promise
		const timeoutPromise = createTimeoutPromise(timeout);

		// Race the script loading against the timeout
		await Promise.race([insert(options), timeoutPromise]);

		// Wait for the callback to be triggered
		await callbackPromise;
	} catch (e) {
		throw e;
	} finally {
		state.isLoading = false;
	}
};
