import { GmapsError } from '../../types/errors';
import type { GmapsPosition, GmapsBounds } from '../../types/types';

export function useMapMethods(mapInstance: google.maps.Map | null) {
	if (!mapInstance) throw new GmapsError('Map instance not found');

	// Helper to check if map exists
	const mapExists = (): boolean => mapInstance !== null;

	// Map utility methods
	const fitBounds = (
		bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
		padding?: number | google.maps.Padding
	) => {
		return mapInstance.fitBounds(bounds, padding);
	};

	const panTo = (latLng: google.maps.LatLng | google.maps.LatLngLiteral) => {
		return mapInstance.panTo(latLng);
	};

	const panBy = (x: number, y: number) => {
		return mapInstance.panBy(x, y);
	};

	const setZoom = (zoom: number) => {
		return mapInstance.setZoom(zoom);
	};

	const getZoom = (): number | null => {
		return mapInstance.getZoom() ?? null;
	};

	const getCenter = (): GmapsPosition | null => {
		return mapInstance.getCenter()?.toJSON() || null;
	};

	const getBounds = (): GmapsBounds | null => {
		return mapInstance.getBounds()?.toJSON() || null;
	};

	const setStyles = (styles: google.maps.MapTypeStyle[]) => {
		return mapInstance.setOptions({ styles });
	};

	const getMapType = (): string | null => {
		return mapInstance.getMapTypeId() || null;
	};

	const moveCamera = (camera: google.maps.CameraOptions) => {
		return mapInstance.moveCamera(camera);
	};

	return {
		fitBounds,
		panTo,
		panBy,
		setZoom,
		getZoom,
		getCenter,
		getBounds,
		setStyles,
		getMapType,
		moveCamera,
		mapExists,
	};
}
