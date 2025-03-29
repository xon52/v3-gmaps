// API options type definitions for Google Maps

/**
 * Options for Google Maps API
 */
export type ApiOptionsType = {
	key: string;
	libraries?: string | string[];
	version?: string;
	language?: string;
	region?: string;
	callback?: () => void;
	timeout?: number;
};
