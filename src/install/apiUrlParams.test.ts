import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateMapsApiUrlParams } from './apiUrlParams';
import { GmApiOptions } from '../';

describe('generateMapsApiUrlParams', () => {
	it('should throw an error when no key is provided', () => {
		const options = {} as GmApiOptions;
		expect(() => generateMapsApiUrlParams(options)).toThrow(
			"v3-gmaps :: A Google API 'key' is required for plugin install."
		);
	});

	it('should generate URL params with only a key', () => {
		const options: GmApiOptions = {
			key: 'test-api-key',
		};
		const result: string = generateMapsApiUrlParams(options);
		expect(result).toContain('key=test-api-key');
	});

	it('should generate URL params with all properties', () => {
		const options: GmApiOptions = {
			key: 'test-api-key',
			libraries: ['places', 'geometry'],
			version: '3.45',
			language: 'en',
			region: 'US',
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toContain('key=test-api-key&v=3.45&language=en&region=us');
	});

	it('should log a warning when libraries option is provided', () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		const options: GmApiOptions = {
			key: 'test-api-key',
			libraries: ['places', 'geometry'],
		};
		generateMapsApiUrlParams(options);
		expect(console.warn).toHaveBeenCalledWith(
			'v3-gmaps: Specifying libraries in options is deprecated. Libraries are automatically loaded based on the components used.'
		);
		vi.restoreAllMocks();
	});

	it('should convert language and region to lowercase', () => {
		const options: GmApiOptions = {
			key: 'test-api-key',
			language: 'EN',
			region: 'US',
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toContain('key=test-api-key&language=en&region=us');
	});

	it('should filter out undefined and null parameters', () => {
		const options: GmApiOptions = {
			key: 'test-api-key',
			version: undefined,
			language: null as unknown as string,
			region: undefined,
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toContain('key=test-api-key');
	});

	it('should use v instead of version when both are provided', () => {
		const options: GmApiOptions = {
			key: 'test-api-key',
			v: '3.48',
			version: '3.45',
		};
		const result = generateMapsApiUrlParams(options);
		expect(result).toContain('key=test-api-key&v=3.48');
	});
});
