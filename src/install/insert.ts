// This is required to attached a method to the global object
declare global {
	var _gmapsInit: () => void;
}

import { ApiOptionsType } from '../types/apiOptions';
import { generateMapsApiUrlParams } from './apiUrlParams';
import { GmapsError } from '../types/errors';

// Google Maps base URL
const baseURL = 'https://maps.googleapis.com/maps/api/js';
// Google Scripts ID
const scriptID = '__gmaps';

// Check for existing Google Maps script and throw error if found
const checkExistingScript = (): void => {
	const existingScript = document.getElementById(scriptID);
	if (existingScript) {
		throw new GmapsError('Google Maps script is already present in the document. Use init() only once.');
	}
};

// Create the script element with proper configuration
const createScriptElement = (params: string): HTMLScriptElement => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
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
		throw new GmapsError('Could not find head element to append script');
	}

	head.appendChild(script);

	// Return a promise that resolves when the script loads
	return new Promise<void>((resolve, reject) => {
		script.onload = () => resolve();
		script.onerror = () => reject(new GmapsError('Script loading failed - check your API key and network connection'));
	});
};

// Insert Google script and return a promise that resolves when script loads
const insert = async (options: ApiOptionsType): Promise<void> => {
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
		throw GmapsError.from(e);
	}
};

export default insert;
