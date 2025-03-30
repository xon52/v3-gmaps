import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as apiModule from './api';
import { isLoaded, getAPI, load, resetCache, waitForReady } from './api';

describe('Google Maps API module', () => {
	beforeEach(() => {
		resetCache();
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		resetCache();
	});

	describe('isLoaded', () => {
		it('should return false when API is not loaded', () => {
			expect(isLoaded()).toBe(false);
		});

		it('should return true when API is loaded', () => {
			load({} as typeof google.maps);
			expect(isLoaded()).toBe(true);
		});
	});

	describe('getApi', () => {
		it('should throw error when API is not loaded', () => {
			expect(() => getAPI()).toThrow('v3-gmaps :: Google Maps API not loaded. Call load() first.');
		});

		it('should return API when loaded', () => {
			const mockAPI = { test: 'api' } as unknown as typeof google.maps;
			load(mockAPI);
			expect(getAPI()).toBe(mockAPI);
		});
	});

	describe('library loading', () => {
		it('should throw error when trying to load libraries before API is loaded', async () => {
			await expect(apiModule.getLibrary('maps')).rejects.toThrow(
				'v3-gmaps :: Google Maps API not loaded. Call load() first.'
			);
			await expect(apiModule.getLibrary('marker')).rejects.toThrow(
				'v3-gmaps :: Google Maps API not loaded. Call load() first.'
			);
		});

		it('should load and cache maps library', async () => {
			const mockMapsLib = { test: 'maps' } as unknown as google.maps.MapsLibrary;
			const mockAPI = {
				importLibrary: vi.fn().mockResolvedValue(mockMapsLib),
			} as unknown as typeof google.maps;

			load(mockAPI);

			const mapsLib = await apiModule.getLibrary('maps');
			expect(mapsLib).toBe(mockMapsLib);
			expect(mockAPI.importLibrary).toHaveBeenCalledWith('maps');

			// Second call should use cached version
			const cachedMapsLib = await apiModule.getLibrary('maps');
			expect(cachedMapsLib).toBe(mockMapsLib);
			expect(mockAPI.importLibrary).toHaveBeenCalledTimes(1);
		});

		it('should load and cache markers library', async () => {
			const mockMarkersLib = { test: 'markers' } as unknown as google.maps.MarkerLibrary;
			const mockAPI = {
				importLibrary: vi.fn().mockResolvedValue(mockMarkersLib),
			} as unknown as typeof google.maps;

			load(mockAPI);

			const markersLib = await apiModule.getLibrary('marker');
			expect(markersLib).toBe(mockMarkersLib);
			expect(mockAPI.importLibrary).toHaveBeenCalledWith('marker');

			// Second call should use cached version
			const cachedMarkersLib = await apiModule.getLibrary('marker');
			expect(cachedMarkersLib).toBe(mockMarkersLib);
			expect(mockAPI.importLibrary).toHaveBeenCalledTimes(1);
		});

		it('should throw error when library import fails', async () => {
			const mockAPI = {
				importLibrary: vi.fn().mockResolvedValue(null),
			} as unknown as typeof google.maps;

			load(mockAPI);

			await expect(apiModule.getLibrary('maps')).rejects.toThrow('v3-gmaps :: Invalid library returned for: maps');
			await expect(apiModule.getLibrary('marker')).rejects.toThrow('v3-gmaps :: Invalid library returned for: marker');
		});
	});

	describe('resetCache', () => {
		it('should reset all state properties', () => {
			load({} as typeof google.maps);
			expect(isLoaded()).toBe(true);

			resetCache();

			expect(isLoaded()).toBe(false);
			expect(() => getAPI()).toThrow('v3-gmaps :: Google Maps API not loaded. Call load() first.');
		});
	});

	describe('waitForReady', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('should resolve immediately when API is already loaded', async () => {
			load({} as typeof google.maps);

			await expect(waitForReady()).resolves.not.toThrow();
		});

		it('should resolve when API becomes loaded', async () => {
			const readyPromise = waitForReady();

			// Load the API after initiating wait
			setTimeout(() => {
				load({} as typeof google.maps);
			}, 500);

			vi.advanceTimersByTime(600);
			await expect(readyPromise).resolves.not.toThrow();
		});

		it('should reject after timeout if API is not loaded', async () => {
			const readyPromise = waitForReady();

			vi.advanceTimersByTime(10100); // Slightly over the 10 second timeout

			await expect(readyPromise).rejects.toThrow('v3-gmaps :: Timed out waiting for Google Maps API to initialize');
		});

		it('should return the same promise for multiple calls', async () => {
			// Set up fake timers
			vi.useFakeTimers();

			const promise1 = waitForReady();
			const promise2 = waitForReady();

			expect(promise1).toBe(promise2);

			// Resolve the promises
			load({} as typeof google.maps);

			// Advance timers to allow promise microtasks to process
			vi.runAllTimers();

			// Restore real timers before awaiting promises
			vi.useRealTimers();

			await expect(promise1).resolves.not.toThrow();
			await expect(promise2).resolves.not.toThrow();
		});

		it('should reset the promise when resetCache is called', async () => {
			const promise1 = waitForReady();

			resetCache();

			const promise2 = waitForReady();

			expect(promise1).not.toBe(promise2);
		});
	});
});
