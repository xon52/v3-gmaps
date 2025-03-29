import { ApiOptionsType } from '../types/apiOptions';
import { GmapsError } from '../types/errors';

/**
 * Generate URL parameters for Google Maps API
 * @param options API configuration options
 * @returns URL parameters string
 */
export const generateMapsApiUrlParams = (options: ApiOptionsType): string => {
	const { key, libraries, version, language, region } = options;

	if (!key) throw new GmapsError("A Google API 'key' is required for plugin install.");

	// Process libraries array if present
	let processedLibraries = '';
	if (libraries) {
		if (Array.isArray(libraries)) {
			processedLibraries = libraries.map((lib) => lib.toLowerCase()).join(',');
		} else {
			processedLibraries = libraries.toLowerCase();
		}
	}

	// Create an array to hold the parameters
	const params: Array<string> = [
		key ? `key=${key}` : '',
		libraries ? `libraries=${processedLibraries}` : '',
		version ? `v=${version}` : '',
		language ? `language=${language?.toLowerCase()}` : '',
		region ? `region=${region?.toLowerCase()}` : '',
	];

	// Filter out empty parameters, encode, and join into a single string
	return params.filter(Boolean).join('&');
};
