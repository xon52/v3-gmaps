// API options type definitions for Google Maps

/**
 * Options for Google Maps API
 */
export type GmApiOptions = {
	key: string;
	language?: string;
	libraries?: string | string[];
	region?: string;
	timeout?: number;
	v?: string;
	version?: string;
	callback?: () => void;
};
