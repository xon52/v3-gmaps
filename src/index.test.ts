import { describe, it, expect, vi, beforeEach } from 'vitest';
import { App } from 'vue';
import install, {
	getAPI,
	gmMap,
	gmMarker,
	gmCircle,
	gmCluster,
	gmRectangle,
	gmPolyline,
	gmPolygon,
	gmInfoWindow,
	gmHeatmap,
} from './index';
import { init } from './install/init';
import { getAPI as getApiFromModule, getLibrary } from './install/api';

// Mock the init function
vi.mock('./install/init', () => ({
	init: vi.fn(),
}));

// Mock the api function
vi.mock('./install/api', () => ({
	getAPI: vi.fn(),
	waitForReady: vi.fn(),
	getLibrary: vi.fn(),
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
			map: gmMap,
			marker: gmMarker,
			circle: gmCircle,
			cluster: gmCluster,
			rectangle: gmRectangle,
			polyline: gmPolyline,
			polygon: gmPolygon,
			infoWindow: gmInfoWindow,
			heatmap: gmHeatmap,
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
	});
});
