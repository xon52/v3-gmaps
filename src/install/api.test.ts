import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { isLoaded, getAPI, load, getMapsLib, getMarkersLib, resetCache } from './api';
import { GmapsError } from '../types/errors';

describe('Google Maps API module', () => {
	beforeEach(() => {
		resetCache();
		vi.clearAllMocks();
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
			expect(() => getAPI()).toThrow(GmapsError);
			expect(() => getAPI()).toThrow('Google Maps API not loaded. Call load() first.');
		});

		it('should return API when loaded', () => {
			const mockAPI = { test: 'api' } as unknown as typeof google.maps;
			load(mockAPI);
			expect(getAPI()).toBe(mockAPI);
		});
	});

	describe('library loading', () => {
		it('should throw error when trying to load libraries before API is loaded', async () => {
			await expect(getMapsLib()).rejects.toThrow(GmapsError);
			await expect(getMapsLib()).rejects.toThrow('Google Maps API not loaded. Call load() first.');
			await expect(getMarkersLib()).rejects.toThrow(GmapsError);
			await expect(getMarkersLib()).rejects.toThrow('Google Maps API not loaded. Call load() first.');
		});

		it('should load and cache maps library', async () => {
			const mockMapsLib = { test: 'maps' };
			const mockAPI = {
				importLibrary: vi.fn().mockResolvedValue(mockMapsLib),
			} as unknown as typeof google.maps;

			load(mockAPI);

			const mapsLib = await getMapsLib();
			expect(mapsLib).toBe(mockMapsLib);
			expect(mockAPI.importLibrary).toHaveBeenCalledWith('maps');

			// Second call should use cached version
			const cachedMapsLib = await getMapsLib();
			expect(cachedMapsLib).toBe(mockMapsLib);
			expect(mockAPI.importLibrary).toHaveBeenCalledTimes(1);
		});

		it('should load and cache markers library', async () => {
			const mockMarkersLib = { test: 'markers' };
			const mockAPI = {
				importLibrary: vi.fn().mockResolvedValue(mockMarkersLib),
			} as unknown as typeof google.maps;

			load(mockAPI);

			const markersLib = await getMarkersLib();
			expect(markersLib).toBe(mockMarkersLib);
			expect(mockAPI.importLibrary).toHaveBeenCalledWith('marker');

			// Second call should use cached version
			const cachedMarkersLib = await getMarkersLib();
			expect(cachedMarkersLib).toBe(mockMarkersLib);
			expect(mockAPI.importLibrary).toHaveBeenCalledTimes(1);
		});

		it('should throw error when library import fails', async () => {
			const mockAPI = {
				importLibrary: vi.fn().mockResolvedValue(null),
			} as unknown as typeof google.maps;

			load(mockAPI);

			await expect(getMapsLib()).rejects.toThrow(GmapsError);
			await expect(getMapsLib()).rejects.toThrow('Invalid library returned for: maps');
			await expect(getMarkersLib()).rejects.toThrow(GmapsError);
			await expect(getMarkersLib()).rejects.toThrow('Invalid library returned for: marker');
		});
	});

	describe('resetCache', () => {
		it('should reset all state properties', () => {
			load({} as typeof google.maps);
			expect(isLoaded()).toBe(true);

			resetCache();

			expect(isLoaded()).toBe(false);
			expect(() => getAPI()).toThrow(GmapsError);
		});
	});
});
