<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>Popup Demo</template>

		<!-- Map with Popup -->
		<template #map>
			<gm-map :options="options">
				<!-- Popup with customizable properties -->
				<gm-marker
					:key="demoMarkerKey"
					:position="popupPosition"
					:title="'Popup with customizable properties'"
					@click="onMarkerClick">
					<template #default>
						<div
							v-if="showFullPopup"
							class="pin-popup"
							:style="`--popup-bg-color: ${popupBackground}; transform: scale(${popupScale});`">
							<div class="popup-header">
								<p>{{ popupText }}</p>
							</div>
							<div
								class="popup-actions"
								@click.stop>
								<button @click="changePopupText">Change Text</button>
								<button @click="closePopup">Close</button>
							</div>
						</div>
						<div
							v-else
							class="pin-popup simplified-popup"
							@click.stop="handlePopupClick">
							<p>Click me</p>
						</div>
					</template>
				</gm-marker>
			</gm-map>
		</template>

		<!-- Controls -->
		<template #controls>
			<control-section>
				<h3>Popup Properties</h3>
				<demo-color-picker
					v-model="popupBackground"
					id="popup-background"
					label="Background Color" />
				<demo-input
					v-model="popupText"
					id="popup-text"
					label="Popup Text" />
				<demo-slider
					v-model="popupScale"
					id="popup-scale-slider"
					label="Scale"
					:min="0.5"
					:max="3"
					:step="0.1" />
			</control-section>
		</template>

		<!-- Description -->
		<template #description>
			<p>
				This demo showcases how to create custom popup content using the <code>Marker</code> component's default slot.
			</p>
			<pre><code>&lt;gm-marker :position="position"&gt;
  &lt;div class="pin-popup" style="--popup-bg-color: #fe5d5d;"&gt;
    &lt;div class="popup-header"&gt;
      &lt;p&gt;Popup Content&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="popup-actions"&gt;
      &lt;button @click="doSomething"&gt;Action&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/gm-marker&gt;

&lt;style&gt;
.pin-popup {
  background-color: var(--popup-bg-color, white);
  border-radius: 5px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
  padding: 10px;
  position: relative;
}

.pin-popup::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid var(--popup-bg-color, white);
}
&lt;/style&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { gmMap, gmMarker, type GmPosition } from 'v3-gmaps';
import { DemoWrapper, ControlSection, DemoColorPicker, DemoSlider, DemoInput } from '../controls';
import { createMapOptions } from './mapHelpers';
import { log } from '../store';

const defaultPosition = { lat: -33.85, lng: 151 };
const funFacts = [
	'Google Maps has over 1 billion monthly users!',
	'Google Maps launched in February 2005',
	'Maps covers over 220 countries and territories',
	'Street View has captured over 10 million miles',
	'You can explore Mars and the Moon in Google Maps',
	'v3-gmaps makes Google Maps integration easy!',
];

// Map configuration
const options = ref(createMapOptions({ center: defaultPosition, zoom: 10 }));

// Popup marker with customizable properties
const popupPosition = ref<GmPosition>(defaultPosition);
const popupText = ref(funFacts[0]);
const popupBackground = ref('#fe5d5d');
const popupScale = ref(1.2);
const showFullPopup = ref(true);

// Create a reactive marker key to force re-render when needed
const demoMarkerKey = ref(0);

// Watch for background color changes to update the marker key
watch(popupBackground, () => {
	// Force marker re-creation by incrementing key
	demoMarkerKey.value++;
});

// Event handlers
const handlePopupClick = (event: MouseEvent) => {
	// Stop event propagation to prevent it from bubbling up
	event.stopPropagation();
	// Handle simplified popup click
	if (!showFullPopup.value) {
		showFullPopup.value = true;
		demoMarkerKey.value++;
		log(`Full popup shown with text: "${popupText.value}"`);
	}
};

let currentFactIndex = 0;

const changePopupText = () => {
	currentFactIndex = (currentFactIndex + 1) % funFacts.length;
	popupText.value = funFacts[currentFactIndex];
	log(`Popup text changed to: "${popupText.value}"`);
};

const closePopup = () => {
	showFullPopup.value = false;
	demoMarkerKey.value++;
	log('Simplified popup shown');
};

const onMarkerClick = () => {
	// Only handle clicks on the marker itself (not the popup content)
	if (!showFullPopup.value) {
		log(`Marker clicked, showing full popup`);
	}
};
</script>

<style scoped>
.pin-popup {
	border-radius: 5px;
	box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.5);
	padding: 10px;
	position: relative;
	background-color: var(--popup-bg-color, white);
	transform-origin: bottom center;
	transition: transform 0.2s ease, opacity 0.2s ease;
}

.pin-popup::after {
	content: '';
	position: absolute;
	bottom: -8px;
	left: 50%;
	transform: translateX(-50%);
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 8px solid var(--popup-bg-color, white);
}

.simplified-popup {
	background-color: #4285f4;
	color: white;
	padding: 8px 16px;
	cursor: pointer;
	font-weight: bold;
	text-align: center;
	transform: scale(1);
}

.simplified-popup::after {
	border-top-color: #4285f4;
}

.simplified-popup:hover {
	background-color: #3367d6;
}

.simplified-popup:hover::after {
	border-top-color: #3367d6;
}

.popup-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 8px;
}

.popup-header p {
	margin: 0;
	padding-right: 10px;
}

.popup-actions {
	display: flex;
	justify-content: flex-end;
}
</style>
