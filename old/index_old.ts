import { App, defineAsyncComponent } from 'vue';
import init, { apiOptionsType } from '../src/install/init';
import { getGoogleAPI as getAPI } from '../src/install/api';

export const install = (_app: App, options: apiOptionsType): void => init(options);

export const gmapsMap = defineAsyncComponent(() => import('../src/components/Map.vue'));
export const gmapsCircle = defineAsyncComponent(() => import('../src/components/Circle.vue'));
export const gmapsCluster = defineAsyncComponent(() => import('../src/components/Cluster.vue'));
export const gmapsRectangle = defineAsyncComponent(() => import('../src/components/Rectangle.vue'));
export const gmapsMarker = defineAsyncComponent(() => import('../src/components/Marker.vue'));
export const gmapsPolyline = defineAsyncComponent(() => import('../src/components/Polyline.vue'));
export const gmapsPolygon = defineAsyncComponent(() => import('../src/components/Polygon.vue'));
export const gmapsPopup = defineAsyncComponent(() => import('../src/components/Popup.vue'));
export const gmapsInfoWindow = defineAsyncComponent(() => import('../src/components/InfoWindow.vue'));
export const gmapsHeatmap = defineAsyncComponent(() => import('../src/components/Heatmap.vue'));

export { getAPI };
export default install;

export { GmapsControlPosition, GmapsStrokePosition } from '../src/types/old/enums';

export type {
	GmapsPosition,
	GmapsBounds,
	GmapsCircleOptions,
	GmapsClusterGroup,
	GmapsClusterItem,
	GmapsClusterOptions,
	GmapsHeatmapOptions,
	GmapsIcon,
	GmapsInfoWindowOptions,
	GmapsMapOptions,
	GmapsMapTypeId,
	GmapsMarkerLabel,
	GmapsMarkerOptions,
	GmapsMarkerShape,
	GmapsPolyMouseEvent,
	GmapsPolygonOptions,
	GmapsPolylineOptions,
	GmapsProjection,
	GmapsRectangleOptions,
	GmapsSymbol,
	GmapsWeightedPosition,
} from '../src/types/types';
