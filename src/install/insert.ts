// This is required to attached a method to the global object
declare global {
	var _gmapsInit: () => void;
}

import { ApiOptions } from '../';
import { generateMapsApiUrlParams } from './apiUrlParams';

// Google Maps base URL
const baseURL = 'https://maps.googleapis.com/maps/api/js';
// Google Scripts ID
const scriptID = '__gmaps';

// Check for existing Google Maps script and throw error if found
const checkExistingScript = (): void => {
	const existingScript = document.getElementById(scriptID);
	if (existingScript) {
		throw new Error('v3-gmaps :: Google Maps script is already present in the document. Use init() only once.');
	}
};

// Create the script element with proper configuration
const createScriptElement = (params: string): HTMLScriptElement => {
	const script = document.createElement('script');
	script.type = 'module';
	script.defer = true;
	script.async = true;
	script.id = scriptID;
	script.src = `${baseURL}?${params}&callback=_gmapsInit`;
	return script;
};

// Inject script into document and return a promise that resolves when loaded
const injectScript = (script: HTMLScriptElement): Promise<void> => {
	const head = document.querySelector('head');

	if (!head) {
		throw new Error('v3-gmaps :: Could not find head element to append script');
	}

	head.appendChild(script);

	// Return a promise that resolves when the script loads
	return new Promise<void>((resolve, reject) => {
		script.onload = () => resolve();
		script.onerror = () =>
			reject(new Error('v3-gmaps :: Script loading failed - check your API key and network connection'));
	});
};

// Insert Google script and return a promise that resolves when script loads
const insert = async (options: ApiOptions): Promise<void> => {
	try {
		// Check for existing script
		checkExistingScript();

		// Generate URL params from options
		const params = generateMapsApiUrlParams(options);

		// Create script element
		const script = createScriptElement(params);

		// Inject script and wait for it to load
		return await injectScript(script);
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(`v3-gmaps :: ${e.message}`);
		} else {
			throw new Error('v3-gmaps :: An unknown error occurred');
		}
	}
};

export default insert;
