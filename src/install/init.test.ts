import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { init, resetState } from './init';
import { load, isLoaded } from './api';
import insert from './insert';

// Mock the api module
vi.mock('./api', () => ({
	load: vi.fn(),
	isLoaded: vi.fn(),
}));

// Mock the insert module
vi.mock('./insert', () => ({
	default: vi.fn(),
}));

describe('Google Maps Initialization Module', () => {
	beforeEach(() => {
		// Setup mocks
		vi.clearAllMocks();
		vi.mocked(insert).mockResolvedValue(undefined);
		vi.mocked(isLoaded).mockReturnValue(false);

		// Reset module state
		resetState();

		// Reset globalThis._gmapsInit for each test
		if ('_gmapsInit' in globalThis) {
			delete (globalThis as any)._gmapsInit;
		}

		// Setup fake timers
		vi.useFakeTimers();
	});

	afterEach(() => {
		// Clean up after tests
		delete (globalThis as any)._gmapsInit;
		delete (globalThis as any).google;

		// Clear any pending timers before restoring real timers
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	describe('resetState', () => {
		it('should reset the loading state', async () => {
			// Set the loading state to true
			const options = { key: 'test-api-key' };

			// Start first initialization to set isLoading flag
			init(options);

			// Second initialization should throw because isLoading is true
			await expect(() => init(options)).rejects.toThrow('Google Maps API initialization already in progress');

			// Reset state
			resetState();

			// Now init shouldn't throw
			expect(() => init(options)).not.toThrow();
		});
	});

	describe('init', () => {
		it('should set up the global callback and call insert with the provided options', () => {
			const options = { key: 'test-api-key' };
			init(options);

			// Verify _gmapsInit was created
			expect(typeof (globalThis as any)._gmapsInit).toBe('function');

			// Verify insert was called with options
			expect(insert).toHaveBeenCalledWith(options);
		});

		it('should throw error if already initialized', async () => {
			vi.mocked(isLoaded).mockReturnValue(true);

			const options = { key: 'test-api-key' };
			await expect(init(options)).rejects.toThrow('Google Maps API is already initialized');
		});

		it('should throw error if initialization is in progress', async () => {
			// First call starts initialization
			init({ key: 'test-api-key' });

			// Second call should throw
			await expect(init({ key: 'test-api-key' })).rejects.toThrow('Google Maps API initialization already in progress');
		});

		it('should handle insert errors properly', async () => {
			const options = { key: 'test-api-key' };
			const mockError = new Error('Insert error');
			vi.mocked(insert).mockRejectedValueOnce(mockError);

			await expect(init(options)).rejects.toThrow('Insert error');
		});

		it('should respect timeout options and handle race conditions', async () => {
			// Test cases with different timeout values
			const testCases = [
				{ timeout: undefined, expected: 5000, message: '5000ms' }, // Default
				{ timeout: 10000, expected: 10000, message: '10000ms' }, // Custom
				{ timeout: 500, expected: 500, message: '500ms' }, // Race condition
			];

			for (const { timeout, expected, message } of testCases) {
				// Reset for each test case
				vi.clearAllMocks();
				resetState();

				// Mock insert based on test case
				if (timeout === 500) {
					// For race condition test, make insert resolve after a delay
					vi.mocked(insert).mockImplementation(
						() =>
							new Promise((resolve) => {
								setTimeout(resolve, 1000);
							})
					);
				} else {
					// For timeout tests, make insert never resolve
					vi.mocked(insert).mockImplementation(() => new Promise(() => {}));
				}

				// Call init with timeout option if provided
				const options = { key: 'test-api-key', ...(timeout !== undefined && { timeout }) };
				const initPromise = init(options);

				// Fast-forward time
				vi.advanceTimersByTime(expected);

				// Verify timeout error with correct message
				await expect(initPromise).rejects.toThrow(
					`Loading timeout exceeded (${message}) - please check your network connection and API key`
				);
			}
		});

		it('should throw error when the callback is triggered without valid API', async () => {
			const options = { key: 'test-api-key' };
			const initPromise = init(options);

			// Mock an invalid google object
			(globalThis as any).google = {};

			// Call the global callback
			(globalThis as any)._gmapsInit();

			// Verify the error is propagated to the Promise
			await expect(initPromise).rejects.toThrow('Maps API failed to initialize after loading');
		});

		it('should successfully initialize with callback and call load', async () => {
			// Mock insert to resolve immediately
			vi.mocked(insert).mockResolvedValue(undefined);

			const options = { key: 'test-api-key' };
			const initPromise = init(options);

			// Mock the google object
			(globalThis as any).google = {
				maps: { version: '3.0' },
			};

			// Call the global callback
			(globalThis as any)._gmapsInit();

			// Verify initialization completes successfully
			await expect(initPromise).resolves.toBeUndefined();

			// Verify load was called with the maps object
			expect(load).toHaveBeenCalledWith((globalThis as any).google.maps);
		});
	});
});
