import { describe, it, expect } from 'vitest';
import { getBounds, extendBounds, boundsContains } from './bounds';
import { GmapsPosition, GmapsBounds } from '../types/types';

describe('getBounds', () => {
	it('should calculate correct bounds for multiple positions', () => {
		const positions: GmapsPosition[] = [
			{ lat: 10, lng: 20 },
			{ lat: 15, lng: 25 },
			{ lat: 5, lng: 15 },
		];

		const result = getBounds(positions);

		expect(result).toEqual({
			north: 15,
			south: 5,
			east: 25,
			west: 15,
		});
	});

	it('should return same values for single position', () => {
		const positions: GmapsPosition[] = [{ lat: 10, lng: 20 }];

		const result = getBounds(positions);

		expect(result).toEqual({
			north: 10,
			south: 10,
			east: 20,
			west: 20,
		});
	});

	it('should throw error for empty array', () => {
		expect(() => getBounds([])).toThrow('Cannot calculate bounds of empty position array');
	});
});

describe('extendBounds', () => {
	it('should extend bounds by default factor (0.1)', () => {
		const bounds: GmapsBounds = {
			north: 10,
			south: 0,
			east: 20,
			west: 10,
		};

		const result = extendBounds(bounds);

		expect(result).toEqual({
			north: 11,
			south: -1,
			east: 21,
			west: 9,
		});
	});

	it('should extend bounds by custom factor', () => {
		const bounds: GmapsBounds = {
			north: 10,
			south: 0,
			east: 20,
			west: 10,
		};

		const result = extendBounds(bounds, 0.5);

		expect(result).toEqual({
			north: 15,
			south: -5,
			east: 25,
			west: 5,
		});
	});

	it('should not exceed maximum coordinates', () => {
		const bounds: GmapsBounds = {
			north: 89,
			south: -89,
			east: 179,
			west: -179,
		};

		const result = extendBounds(bounds, 0.1);

		expect(result.north).toBeLessThanOrEqual(89.99999);
		expect(result.south).toBeGreaterThanOrEqual(-89.99999);
		expect(result.east).toBeLessThanOrEqual(179.99999);
		expect(result.west).toBeGreaterThanOrEqual(-179.99999);
	});

	it('should throw error for negative extension factor', () => {
		const bounds: GmapsBounds = {
			north: 10,
			south: 0,
			east: 20,
			west: 10,
		};

		expect(() => extendBounds(bounds, -0.1)).toThrow('Extension factor cannot be negative');
	});
});

describe('boundsContains', () => {
	it('should return true for position inside bounds', () => {
		const bounds: GmapsBounds = {
			north: 10,
			south: 0,
			east: 20,
			west: 10,
		};
		const position: GmapsPosition = { lat: 5, lng: 15 };

		expect(boundsContains(bounds, position)).toBe(true);
	});

	it('should return false for position outside latitude bounds', () => {
		const bounds: GmapsBounds = {
			north: 10,
			south: 0,
			east: 20,
			west: 10,
		};

		expect(boundsContains(bounds, { lat: 15, lng: 15 })).toBe(false);
		expect(boundsContains(bounds, { lat: -5, lng: 15 })).toBe(false);
	});

	it('should return false for position outside longitude bounds', () => {
		const bounds: GmapsBounds = {
			north: 10,
			south: 0,
			east: 20,
			west: 10,
		};

		expect(boundsContains(bounds, { lat: 5, lng: 5 })).toBe(false);
		expect(boundsContains(bounds, { lat: 5, lng: 25 })).toBe(false);
	});

	it('should handle longitude wrapping at date line', () => {
		// Bounds that cross the date line (west > east)
		const bounds: GmapsBounds = {
			north: 10,
			south: 0,
			east: -170,
			west: 170,
		};

		// Position on the "other side" of the date line should be contained
		expect(boundsContains(bounds, { lat: 5, lng: 175 })).toBe(true);
		expect(boundsContains(bounds, { lat: 5, lng: -175 })).toBe(true);

		// Position between east and west (the "gap") should not be contained
		expect(boundsContains(bounds, { lat: 5, lng: 0 })).toBe(false);
	});

	it('should handle normalized longitude coordinates', () => {
		const bounds: GmapsBounds = {
			north: 10,
			south: 0,
			east: 20,
			west: 10,
		};

		// Position with longitude > 180 or < -180 should be normalized
		expect(boundsContains(bounds, { lat: 5, lng: 15 + 360 })).toBe(true);
		expect(boundsContains(bounds, { lat: 5, lng: 15 - 360 })).toBe(true);
	});
});
