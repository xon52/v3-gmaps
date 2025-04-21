import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import insert from './insert';
import { GmApiOptions } from '../types/install';
import { generateMapsApiUrlParams } from './apiUrlParams';

// Mock generateMapsApiUrlParams to return test parameters
vi.mock('./apiUrlParams', () => ({
	generateMapsApiUrlParams: vi.fn().mockReturnValue('key=test-api-key'),
}));

describe('Google Maps Script Insertion', () => {
	const TEST_OPTIONS: GmApiOptions = {
		key: 'test-api-key',
	};

	beforeEach(() => {
		// Setup fake timers
		vi.useFakeTimers();

		// Mock DOM environment
		globalThis.document = {
			createElement: vi.fn(() => ({
				type: '',
				defer: false,
				id: '',
				src: '',
				onerror: null,
				onload: null,
			})),
			querySelector: vi.fn(() => ({
				appendChild: vi.fn(),
			})),
			getElementById: vi.fn(() => null), // Default: no script exists
		} as any;

		// Reset the mock for generateMapsApiUrlParams
		(generateMapsApiUrlParams as any).mockClear();
	});

	afterEach(() => {
		// Clean up the _gmapsInit that gets created during tests
		if ('_gmapsInit' in globalThis) {
			delete (globalThis as any)._gmapsInit;
		}
		vi.clearAllMocks();
		vi.resetAllMocks();
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it('loads script successfully', async () => {
		// Start the insert process
		const promise = insert(TEST_OPTIONS);

		// Verify params were generated correctly
		expect(generateMapsApiUrlParams).toHaveBeenCalledWith(TEST_OPTIONS);

		// Verify script was created with correct attributes
		expect(document.createElement).toHaveBeenCalledWith('script');
		const script = (document.createElement as any).mock.results[0].value;
		expect(script.type).toBe('module');
		expect(script.id).toBe('__gmaps');
		expect(script.src).toContain('callback=_gmapsInit');
		expect(script.src).toContain('key=test-api-key');

		// Simulate successful script load
		script.onload();

		// Verify promise resolves successfully
		await expect(promise).resolves.toBeUndefined();
	});

	it('throws error if script already exists', async () => {
		// Mock that getElementById returns an existing script
		(document.getElementById as any).mockReturnValue({ id: '__gmaps' });

		// Start the insert process
		const promise = insert(TEST_OPTIONS);

		// Verify promise rejects with correct error
		await expect(promise).rejects.toThrow(
			'Google Maps script is already present in the document. Use init() only once.'
		);
	});

	it('rejects when script loading fails', async () => {
		// Start the insert process
		const promise = insert(TEST_OPTIONS);

		// Simulate load failure
		const script = (document.createElement as any).mock.results[0].value;
		script.onerror();

		// Verify promise rejects with correct error
		await expect(promise).rejects.toThrow('Script loading failed - check your API key and network connection');
	});

	it('rejects when head element is not found', async () => {
		// Mock querySelector to return null
		(document.querySelector as any).mockReturnValue(null);

		// Start the insert process
		const promise = insert(TEST_OPTIONS);

		// Verify promise rejects with correct error
		await expect(promise).rejects.toThrow('Could not find head element to append script');
	});

	it('handles errors thrown in the try block', async () => {
		// Make document.getElementById throw an error
		(document.getElementById as any).mockImplementation(() => {
			throw new Error('Test error');
		});

		// Start the insert process
		const promise = insert(TEST_OPTIONS);

		// Verify promise rejects with the thrown error
		await expect(promise).rejects.toThrow('Test error');
	});

	it('correctly calls generateMapsApiUrlParams with options', async () => {
		const customOptions: GmApiOptions = {
			key: 'custom-key',
			version: '3.45',
			language: 'fr',
			region: 'CA',
		};

		// Mock the generateMapsApiUrlParams to return a custom value for this test
		(generateMapsApiUrlParams as any).mockReturnValueOnce('key=custom-key&v=3.45&language=fr&region=ca');

		// Start the insert process
		insert(customOptions);

		// Verify generateMapsApiUrlParams was called with the correct options
		expect(generateMapsApiUrlParams).toHaveBeenCalledWith(customOptions);
	});
});
