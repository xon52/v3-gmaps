<template>
	<demo-wrapper :showEventLog="false">
		<!-- Component title -->
		<template #title>Throttle Demo</template>

		<!-- Instructions -->
		<template #instructions>
			<p><strong>Drag any marker</strong> to see how the throttle setting affects event frequency in all maps</p>
		</template>

		<!-- Map slot -->
		<template #map>
			<div class="throttle-maps-container">
				<div class="throttle-map">
					<h3>Throttle 0 (off) - Events: {{ eventCounter[0] }}</h3>
					<gm-map
						:options="options"
						:throttle="0">
						<gm-marker
							:position="markerPosition"
							:draggable="true"
							@position_changed="handlePositionChanged(0, $event)" />
					</gm-map>
				</div>

				<div class="throttle-map">
					<h3>Throttle 200 (default) - Events: {{ eventCounter[200] }}</h3>
					<gm-map
						:options="options"
						:throttle="200">
						<gm-marker
							:position="markerPosition"
							:draggable="true"
							@position_changed="handlePositionChanged(200, $event)" />
					</gm-map>
				</div>

				<div class="throttle-map">
					<h3>Throttle 500 ms - Events: {{ eventCounter[500] }}</h3>
					<gm-map
						:options="options"
						:throttle="500">
						<gm-marker
							:position="markerPosition"
							:draggable="true"
							@position_changed="handlePositionChanged(500, $event)" />
					</gm-map>
				</div>
			</div>
		</template>

		<!-- Description slot -->
		<template #description>
			<p>
				Google Maps events can be fired at a high frequency. The <code>throttle</code> property makes this more
				manageable.
			</p>
			<p>
				Drag any marker and observe how the position change events are throttled differently based on each map's
				throttle setting.
			</p>
			<pre><code>&lt;gm-map 
  :options="options"
  :throttle="0" /&gt;

&lt;gm-map 
  :options="options"
  :throttle="200" /&gt; &lt;!-- default value --&gt;

&lt;gm-map 
  :options="options"
  :throttle="500" /&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { DemoWrapper } from '../controls';
import { gmMap, gmMarker, type GmPosition } from 'v3-gmaps';
import { log } from '../store';
import { createMapOptions } from './mapHelpers';

// Default map center
const defaultCenter = { lat: -25, lng: 130 };
const defaultZoom = 4;

// Use createMapOptions to define map options
const options = ref(
	createMapOptions({
		center: defaultCenter,
		zoom: defaultZoom,
		disableDefaultUI: true,
		scrollwheel: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false,
		gestureHandling: 'none',
	})
);

// Marker position - shared across all maps
const markerPosition = ref<GmPosition>({ ...defaultCenter });

// Event counter for each throttle setting
const eventCounter = reactive<Record<number, number>>({
	0: 0,
	200: 0,
	500: 0,
});

// Reset counters
const resetCounters = () => {
	Object.keys(eventCounter).forEach((key) => {
		eventCounter[Number(key)] = 0;
	});
	log(`Event counters reset`);
};

// Handle position change events
const handlePositionChanged = (throttleValue: number, newPosition: GmPosition | null) => {
	if (!newPosition) return;

	// Increment counter for this throttle value
	eventCounter[throttleValue] = eventCounter[throttleValue] + 1;

	// Update marker position to keep them in sync
	markerPosition.value = newPosition;
};
</script>

<style scoped>
.throttle-maps-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
}

.throttle-map {
	position: relative;
	height: 33.33%;
	min-height: 150px;
	width: 100%;
}

.throttle-map h3 {
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
	background-color: rgba(33, 33, 33, 0.7);
	color: white;
	padding: 5px 10px;
	border-radius: 4px;
	font-size: 0.9rem;
	white-space: nowrap;
}
</style>
