import { describe, it, expect, vi, beforeEach } from 'vitest';
import { App } from 'vue';
import install, {
	getAPI,
	gmapsMap,
	gmapsMarker,
	gmapsCircle,
	gmapsCluster,
	gmapsRectangle,
	gmapsPolyline,
	gmapsPolygon,
	gmapsPopup,
	gmapsInfoWindow,
	gmapsHeatmap,
	GmapsControlPosition,
	GmapsStrokePosition,
} from './index';
import { init } from './install/init';
import { getAPI as getApiFromModule } from './install/api';

// Mock the init function
vi.mock('./install/init', () => ({
	init: vi.fn(),
}));

// Mock the api function
vi.mock('./install/api', () => ({
	getAPI: vi.fn(),
	isLoaded: vi.fn(),
	getMapsLib: vi.fn(),
	getMarkersLib: vi.fn(),
}));

describe('Plugin', () => {
	let app: App;

	beforeEach(() => {
		app = {
			// Minimal mock of Vue app
			component: vi.fn(),
		} as unknown as App;

		// Clear mocks between tests
		vi.clearAllMocks();
	});

	describe('install function', () => {
		it('should call init with provided options', async () => {
			const options = { key: 'test-key' };
			await install(app, options);

			expect(init).toHaveBeenCalledWith(options);
		});

		it('should handle initialization errors', async () => {
			vi.mocked(init).mockImplementationOnce(() => {
				throw new Error('Init error');
			});

			await expect(install(app, { key: 'test-key' })).rejects.toThrow('Init error');
		});

		it('should throw an error if API key is missing', async () => {
			// @ts-expect-error Testing invalid input - key is required
			await expect(install(app, {})).rejects.toThrow('Missing API key');
		});
	});

	describe('component exports', () => {
		const components = {
			map: gmapsMap,
			marker: gmapsMarker,
			circle: gmapsCircle,
			cluster: gmapsCluster,
			rectangle: gmapsRectangle,
			polyline: gmapsPolyline,
			polygon: gmapsPolygon,
			popup: gmapsPopup,
			infoWindow: gmapsInfoWindow,
			heatmap: gmapsHeatmap,
		};

		it.each(Object.entries(components))('should export %s component', (_, component) => {
			expect(component).toBeDefined();
		});
	});

	describe('API exports', () => {
		it('should export getAPI function', () => {
			expect(getAPI).toBeDefined();
			expect(typeof getAPI).toBe('function');
		});

		it('should properly re-export getAPI', () => {
			expect(getAPI).toBe(getApiFromModule);
		});

		it('should export enums', () => {
			expect(GmapsControlPosition).toBeDefined();
			expect(GmapsStrokePosition).toBeDefined();
		});
	});
});
