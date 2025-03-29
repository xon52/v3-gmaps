import { describe, it, expect } from 'vitest';
import { getAveragePosition, organiseClusters } from './clusters';
import { GmapsClusterItem } from '../types/types';

describe('getAveragePosition', () => {
	it('should calculate the average of a single position', () => {
		const positions = [{ lat: 50, lng: 30 }];
		expect(getAveragePosition(positions)).toEqual({ lat: 50, lng: 30 });
	});

	it('should calculate the average of multiple positions', () => {
		const positions = [
			{ lat: 10, lng: 20 },
			{ lat: 20, lng: 30 },
			{ lat: 30, lng: 40 },
		];
		expect(getAveragePosition(positions)).toEqual({ lat: 20, lng: 30 });
	});

	it('should handle decimal positions correctly', () => {
		const positions = [
			{ lat: 10.5, lng: 20.5 },
			{ lat: 20.5, lng: 30.5 },
		];
		expect(getAveragePosition(positions)).toEqual({ lat: 15.5, lng: 25.5 });
	});

	it('should throw an error for empty position array', () => {
		expect(() => getAveragePosition([])).toThrow('Cannot calculate average of empty position array');
	});
});

describe('organiseClusters', () => {
	// Sample cluster items
	const items: GmapsClusterItem[] = [
		{ lat: 10, lng: 20, id: '1' },
		{ lat: 10.01, lng: 20.01, id: '2' },
		{ lat: 50, lng: 60, id: '3' },
		{ lat: 50.01, lng: 60.01, id: '4' },
	];

	it('should return empty object for empty items array', () => {
		expect(organiseClusters([], 10, 15, 256)).toEqual({});
	});

	it('should not cluster when zoom is greater than or equal to maxZoom', () => {
		const result = organiseClusters(items, 20, 15, 256);

		// Each item should be in its own cluster
		expect(Object.keys(result).length).toBe(4);
		expect(result['0'].items).toEqual([items[0]]);
		expect(result['1'].items).toEqual([items[1]]);
		expect(result['2'].items).toEqual([items[2]]);
		expect(result['3'].items).toEqual([items[3]]);
	});

	it('should cluster nearby items at low zoom levels', () => {
		const result = organiseClusters(items, 5, 15, 256);

		// Nearby positions should be clustered together
		// Exact cluster keys depend on the implementation of getMapTile
		const clusterKeys = Object.keys(result);
		const clusters = Object.values(result);

		// Should be 2 clusters for our test data
		expect(clusters.length).toBe(2);

		// Find clusters by checking which items they contain
		const cluster1 = clusters.find((c) => c.items.some((item) => item.id === '1'));
		const cluster2 = clusters.find((c) => c.items.some((item) => item.id === '3'));

		expect(cluster1?.items.length).toBe(2);
		expect(cluster1?.items).toContainEqual(items[0]);
		expect(cluster1?.items).toContainEqual(items[1]);

		expect(cluster2?.items.length).toBe(2);
		expect(cluster2?.items).toContainEqual(items[2]);
		expect(cluster2?.items).toContainEqual(items[3]);
	});

	it('should calculate weights based on percentage of total items', () => {
		const result = organiseClusters(items, 5, 15, 256);
		const clusters = Object.values(result);

		// Each cluster should have 2 items out of 4 total (50%)
		clusters.forEach((cluster) => {
			expect(cluster.weight).toBe(50);
		});
	});

	it('should compute average position for each cluster', () => {
		const result = organiseClusters(items, 5, 15, 256);
		const clusters = Object.values(result);

		// Find clusters by checking which items they contain
		const cluster1 = clusters.find((c) => c.items.some((item) => item.id === '1'));
		const cluster2 = clusters.find((c) => c.items.some((item) => item.id === '3'));

		// Average positions for each cluster
		expect(cluster1?.position).toEqual({ lat: 10.005, lng: 20.005 });
		expect(cluster2?.position).toEqual({ lat: 50.005, lng: 60.005 });
	});
});
