import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GmapsPositionIsEqual, convertPolyMouseEvent } from './gmaps';
import { GmapsPosition } from '../types';

// Mock google.maps.LatLng
class MockLatLng {
	private latitude: number;
	private longitude: number;

	constructor(lat: number, lng: number) {
		this.latitude = lat;
		this.longitude = lng;
	}

	lat() {
		return this.latitude;
	}

	lng() {
		return this.longitude;
	}

	toJSON() {
		return { lat: this.latitude, lng: this.longitude };
	}
}

describe('GmapsPositionIsEqual', () => {
	it('should return true when position and LatLng represent the same location', () => {
		const position: GmapsPosition = { lat: 42.1234, lng: -71.5678 };
		const latLng = new MockLatLng(42.1234, -71.5678);

		const result = GmapsPositionIsEqual(position, latLng as unknown as google.maps.LatLng);

		expect(result).toBe(true);
	});

	it('should return false when position and LatLng have different coordinates', () => {
		const position: GmapsPosition = { lat: 42.1234, lng: -71.5678 };
		const latLng = new MockLatLng(42.9999, -71.5678);

		const result = GmapsPositionIsEqual(position, latLng as unknown as google.maps.LatLng);

		expect(result).toBe(false);
	});

	it('should return false when position is undefined', () => {
		const latLng = new MockLatLng(42.1234, -71.5678);

		const result = GmapsPositionIsEqual(undefined, latLng as unknown as google.maps.LatLng);

		expect(result).toBe(false);
	});

	it('should return false when latLng is undefined', () => {
		const position: GmapsPosition = { lat: 42.1234, lng: -71.5678 };

		const result = GmapsPositionIsEqual(position, undefined);

		expect(result).toBe(false);
	});

	it('should throw an error when both position and latLng are undefined', () => {
		expect(() => {
			GmapsPositionIsEqual(undefined, undefined);
		}).toThrow('Both position arguments cannot be undefined');
	});
});

describe('convertPolyMouseEvent', () => {
	let mockPolyMouseEvent: google.maps.PolyMouseEvent;
	let mockLatLng: MockLatLng;

	beforeEach(() => {
		mockLatLng = new MockLatLng(42.1234, -71.5678);
		mockPolyMouseEvent = {
			latLng: mockLatLng as unknown as google.maps.LatLng,
			edge: 1,
			path: 2,
			vertex: 3,
			domEvent: {} as MouseEvent,
			stop: vi.fn(),
		};
	});

	it('should convert a Google PolyMouseEvent to GmapsPolyMouseEvent', () => {
		const result = convertPolyMouseEvent(mockPolyMouseEvent);

		expect(result).toEqual({
			latLng: { lat: 42.1234, lng: -71.5678 },
			edge: 1,
			path: 2,
			vertex: 3,
		});
	});

	it('should throw an error when latLng is undefined', () => {
		mockPolyMouseEvent.latLng = null;

		expect(() => {
			convertPolyMouseEvent(mockPolyMouseEvent);
		}).toThrow('Invalid PolyMouseEvent: latLng property is undefined');
	});
});
