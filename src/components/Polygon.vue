<script lang="ts">
// https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
import { throttle, convertPolyMouseEvent, isEqual } from '../helpers';
import { defineComponent, onBeforeUnmount, watch, inject, PropType } from 'vue';
import { GmapsPosition, GmapsPolygonOptions, GmapsPolyMouseEvent } from '../types/types';

export default defineComponent({
	name: 'GmapsPolygon',

	props: {
		draggable: { type: Boolean, default: false },
		editable: { type: Boolean, default: false },
		options: { type: Object as PropType<GmapsPolygonOptions>, default: undefined },
		paths: { type: Object as PropType<GmapsPosition[] | GmapsPosition[][]>, default: undefined },
		visible: { type: Boolean, default: true },
	},

	emits: {
		click: (e: GmapsPolyMouseEvent) => true,
		contextmenu: (e: GmapsPolyMouseEvent) => true,
		dblclick: (e: GmapsPolyMouseEvent) => true,
		drag: (e: GmapsPosition | null) => true,
		dragend: (e: GmapsPosition | null) => true,
		dragstart: (e: GmapsPosition | null) => true,
		mounted: (e: google.maps.Polygon) => true,
		mousedown: (e: GmapsPolyMouseEvent) => true,
		mousemove: (e: GmapsPolyMouseEvent) => true,
		mouseout: (e: GmapsPolyMouseEvent) => true,
		mouseover: (e: GmapsPolyMouseEvent) => true,
		mouseup: (e: GmapsPolyMouseEvent) => true,
		paths_changed: (e: GmapsPosition[][]) => true,
		rightclick: (e: GmapsPolyMouseEvent) => true,
		unmounted: (e: google.maps.Polygon) => true,
	},

	setup(props, { emit }) {
		// Inject
		const getAPI = inject('$getAPI') as () => typeof google.maps;
		const getMap = inject('$getMap') as () => google.maps.Map;
		const getThrottle = inject('$getThrottle') as () => number;
		const handleError = inject('$handleError') as (e: Error, s: string) => void;

		// Data
		const handleLocalError = (err: Error) => handleError(err, `Polygon`);
		const listeners: google.maps.MapsEventListener[] = [];
		let shape: google.maps.Polygon | null = null;

		// Methods
		const GmapsPolygonConverter: (e: google.maps.Polygon) => GmapsPosition[][] = (e) =>
			e
				.getPaths()
				.getArray()
				.map((f: any) => f.getArray().map((g: any) => g.toJSON()));

		// Set Listeners
		const setListeners = (t: google.maps.Polygon) => {
			const ge = google.maps.event;
			const d = getThrottle();
			listeners.push(
				// Throttled
				ge.addListener(
					t,
					'drag',
					throttle((e: google.maps.MapMouseEvent) => emit('drag', e.latLng?.toJSON() || null), d)
				),
				ge.addListener(
					t,
					'mousemove',
					throttle((e: google.maps.MapMouseEvent) => emit('mousemove', convertPolyMouseEvent(e)), d)
				),
				ge.addListener(
					t,
					'mouseover',
					throttle((e: google.maps.MapMouseEvent) => emit('mouseover', convertPolyMouseEvent(e)), d)
				),
				// Not throttled
				ge.addListener(t, 'click', (e: google.maps.PolyMouseEvent) => emit('click', convertPolyMouseEvent(e))),
				ge.addListener(t, 'contextmenu', (e: google.maps.PolyMouseEvent) =>
					emit('contextmenu', convertPolyMouseEvent(e))
				),
				ge.addListener(t, 'dblclick', (e: google.maps.PolyMouseEvent) => emit('dblclick', convertPolyMouseEvent(e))),
				ge.addListener(t, 'dragend', (e: google.maps.MapMouseEvent) => emit('dragend', e.latLng?.toJSON() || null)),
				ge.addListener(t, 'dragstart', (e: google.maps.MapMouseEvent) => emit('dragstart', e.latLng?.toJSON() || null)),
				ge.addListener(t, 'mousedown', (e: google.maps.PolyMouseEvent) => emit('mousedown', convertPolyMouseEvent(e))),
				ge.addListener(t, 'mouseout', (e: google.maps.PolyMouseEvent) => emit('mouseout', convertPolyMouseEvent(e))),
				ge.addListener(t, 'mouseup', (e: google.maps.PolyMouseEvent) => emit('mouseup', convertPolyMouseEvent(e))),
				ge.addListener(t, 'rightclick', (e: google.maps.PolyMouseEvent) =>
					emit('rightclick', convertPolyMouseEvent(e))
				),
				// NOTE: path events insert_at and set_at only fired once so mouseup and dragend were more reliable
				ge.addListener(t, 'dragend', (e: google.maps.PolyMouseEvent) =>
					emit('paths_changed', GmapsPolygonConverter(t))
				),
				ge.addListener(t, 'mouseup', (e: google.maps.PolyMouseEvent) =>
					e.path !== undefined ? emit('paths_changed', GmapsPolygonConverter(t)) : null
				),
				t.getPath().addListener('remove_at', () => emit('paths_changed', GmapsPolygonConverter(t)))
			);
		};

		// On Created
		const map = getMap();
		const api = getAPI();
		const options = { map, ...props.options };
		if (props.draggable) options.draggable = props.draggable;
		if (props.editable) options.editable = props.editable;
		if (props.paths) options.paths = props.paths;
		if (props.visible) options.visible = props.visible;
		shape = new api.Polygon(options as google.maps.PolygonOptions);
		if (shape) {
			setListeners(shape);
			emit('mounted', shape);
		} else handleLocalError(new Error('There was a problem creating the shape.'));

		// Watchers
		watch(
			() => props.draggable,
			(v) => (v === undefined || v == shape?.getDraggable() ? null : shape?.setDraggable(v))
		);
		watch(
			() => props.editable,
			(v) => (v === undefined || v == shape?.getEditable() ? null : shape?.setEditable(v))
		);
		watch(
			() => props.paths,
			(v) => (v === undefined || isEqual(v, shape?.getPaths()) ? null : shape?.setPaths(v as GmapsPosition[][])),
			{ deep: true }
		);
		watch(
			() => props.visible,
			(v) => (v === undefined || v == shape?.getVisible() ? null : shape?.setVisible(v))
		);

		// Unmount
		onBeforeUnmount(() => {
			if (shape) emit('unmounted', shape);
			listeners.forEach((e) => e.remove());
			if (shape) shape.setMap(null);
			if (shape) getAPI().event.clearInstanceListeners(shape);
		});

		// Render (nothing)
		return () => {};
	},
});
</script>
