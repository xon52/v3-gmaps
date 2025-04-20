import { GmApiOptions } from '../';

/**
 * Generate URL parameters for Google Maps API
 * @param options API configuration options
 * @returns URL parameters string
 */
export const generateMapsApiUrlParams = (options: GmApiOptions): string => {
	const { key, v, version, language, region, libraries } = options;

	if (!key) throw new Error(`v3-gmaps :: A Google API 'key' is required for plugin install.`);

	// Check for deprecated libraries option
	if (libraries) {
		console.warn(
			'v3-gmaps: Specifying libraries in options is deprecated. Libraries are automatically loaded based on the components used.'
		);
	}

	// Resolve v and version
	const vResolved = v || version;

	// Create an array to hold the parameters
	const params: Array<string> = [
		key ? `key=${key}` : '',
		vResolved ? `v=${vResolved}` : '',
		language ? `language=${language?.toLowerCase()}` : '',
		region ? `region=${region?.toLowerCase()}` : '',
		'loading=async',
	];

	// Filter out empty parameters, encode, and join into a single string
	return params.filter(Boolean).join('&');
};
