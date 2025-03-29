import { describe, it, expect } from 'vitest';
import { generateMapsApiUrlParams } from './apiUrlParams';
import { ApiOptionsType } from '../types/apiOptions';
import { GmapsError } from '../types/errors';

describe('generateMapsApiUrlParams', () => {
	it('should throw an error when no key is provided', () => {
		const options = {} as ApiOptionsType;
		expect(() => generateMapsApiUrlParams(options)).toThrow(
			"v3-gmaps :: A Google API 'key' is required for plugin install."
		);
	});

	it('should generate URL params with only a key', () => {
		const options: ApiOptionsType = {
			key: 'test-api-key',
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toBe('key=test-api-key');
	});

	it('should generate URL params with all properties', () => {
		const options: ApiOptionsType = {
			key: 'test-api-key',
			libraries: ['places', 'geometry'],
			version: '3.45',
			language: 'en',
			region: 'US',
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toBe('key=test-api-key&libraries=places,geometry&v=3.45&language=en&region=us');
	});

	it('should handle libraries as a string', () => {
		const options: ApiOptionsType = {
			key: 'test-api-key',
			libraries: 'places,geometry',
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toBe('key=test-api-key&libraries=places,geometry');
	});

	it('should convert libraries to lowercase', () => {
		const options: ApiOptionsType = {
			key: 'test-api-key',
			libraries: ['PLACES', 'GEOMETRY'],
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toBe('key=test-api-key&libraries=places,geometry');
	});

	it('should convert language and region to lowercase', () => {
		const options: ApiOptionsType = {
			key: 'test-api-key',
			language: 'EN',
			region: 'US',
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toBe('key=test-api-key&language=en&region=us');
	});

	it('should handle empty arrays as empty strings', () => {
		const options: ApiOptionsType = {
			key: 'test-api-key',
			libraries: [],
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toBe('key=test-api-key&libraries=');
	});

	it('should filter out undefined and null parameters', () => {
		const options: ApiOptionsType = {
			key: 'test-api-key',
			version: undefined,
			language: null as unknown as string,
			region: undefined,
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toBe('key=test-api-key');
	});
});
