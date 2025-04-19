<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>InfoWindow Demo</template>

		<!-- Map with InfoWindows -->
		<template #map>
			<gm-map :options="options">
				<!-- Basic InfoWindow with header content -->
				<gm-info-window
					ref="infoWindowA"
					:position="infoWindowAPosition"
					:header-content="headerContent"
					:opened="infoWindowAState === 'open'"
					:max-width="maxWidth"
					@closeclick="infoWindowAState = 'closed'"
					:z-index="5">
					<div class="info-content bordered">
						<p>This is a simple InfoWindow with basic content.</p>
					</div>
				</gm-info-window>

				<!-- Second InfoWindow with custom content -->
				<gm-info-window
					ref="infoWindowB"
					:position="infoWindowBPosition"
					:opened="infoWindowBState === 'open'"
					:header-disabled="headerDisabled === 'true'"
					@closeclick="infoWindowBState = 'closed'">
					<div class="info-content custom-style">
						<h3
							:style="{ color: titleColor }"
							class="info-title">
							Interactive InfoWindow
						</h3>
						<div class="button-container">
							<button
								@click="changeTitleColor"
								class="demo-button">
								Change Title Color
							</button>
							<button
								@click="togglePosition"
								class="demo-button">
								Toggle Position
							</button>
						</div>
					</div>
				</gm-info-window>
			</gm-map>
		</template>

		<!-- Controls -->
		<template #controls>
			<control-section>
				<h3>InfoWindow A</h3>
				<demo-input
					v-model="headerContent"
					id="header-content"
					label="Header Content"
					info="Text to display in the InfoWindow header" />

				<demo-slider
					v-model="maxWidth"
					id="max-width-slider"
					label="Max Width"
					info="Maximum width of the InfoWindow in pixels"
					:min="150"
					:max="400"
					:step="50" />

				<demo-toggle
					v-model="infoWindowAState"
					label="State"
					@update:model-value="toggleInfoWindowA" />
			</control-section>

			<control-section>
				<h3>InfoWindow B</h3>
				<demo-toggle
					v-model="infoWindowBState"
					label="State"
					@update:model-value="toggleInfoWindowB" />
				<demo-toggle
					v-model="headerDisabled"
					:options="[
						{ value: 'true', label: 'Disabled' },
						{ value: 'false', label: 'Enabled' },
					]"
					label="Header" />
			</control-section>
		</template>

		<!-- Description -->
		<template #description>
			<p>
				This demo shows how to use the <code>gm-info-window</code> component to create information windows on Google
				Maps.
			</p>
			<pre><code>&lt;gm-info-window
  :position="{ lat: -33.9, lng: 150.5 }"
  :header-content="'Simple InfoWindow'"
  :opened="true"
  :max-width="300"
  @closeclick="handleCloseClick"&gt;
  &lt;div class="info-content"&gt;
    &lt;p&gt;Custom HTML content here&lt;/p&gt;
  &lt;/div&gt;
&lt;/gm-info-window&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DemoWrapper, DemoInput, DemoSlider, ControlSection, DemoToggle } from '../controls';
import { gmMap, gmInfoWindow, type GmPosition } from 'v3-gmaps';
import { log } from '../store';
import { createMapOptions } from './mapHelpers';

// Map configuration
const options = ref(createMapOptions({ center: { lat: -33.8, lng: 150.8 }, zoom: 10 }));

// InfoWindow A configuration
const infoWindowAPosition = ref<GmPosition>({ lat: -33.9, lng: 150.5 });
const headerContent = ref('Simple InfoWindow');
const maxWidth = ref(300);
const infoWindowAState = ref('closed');

// InfoWindow B configuration
const infoWindowBPosition = ref<GmPosition>({ lat: -33.9, lng: 151.1 });
const infoWindowBState = ref('open');
const titleColor = ref('#4CAF50');
const isAlternatePosition = ref(false);
const headerDisabled = ref('true');

// InfoWindow instances
const infoWindowA = ref<InstanceType<typeof gmInfoWindow>>();
const infoWindowB = ref<InstanceType<typeof gmInfoWindow>>();

const toggleInfoWindowA = () => {
	if (infoWindowA.value?.isOpen()) {
		infoWindowA.value?.close();
		infoWindowAState.value = 'closed';
		log('InfoWindow A closed');
	} else {
		infoWindowA.value?.open();
		infoWindowAState.value = 'open';
		log('InfoWindow A opened');
	}
};

const toggleInfoWindowB = () => {
	if (infoWindowB.value?.isOpen()) {
		infoWindowB.value?.close();
		infoWindowBState.value = 'closed';
		log('InfoWindow B closed');
	} else {
		infoWindowB.value?.open();
		infoWindowBState.value = 'open';
		log('InfoWindow B opened');
	}
};

const changeTitleColor = () => {
	const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#E91E63'];
	const currentIndex = colors.indexOf(titleColor.value);
	const nextIndex = (currentIndex + 1) % colors.length;
	titleColor.value = colors[nextIndex];
	log('Title color changed');
};

const togglePosition = () => {
	isAlternatePosition.value = !isAlternatePosition.value;
	if (isAlternatePosition.value) {
		infoWindowBPosition.value = { lat: -33.8, lng: 151.2 };
	} else {
		infoWindowBPosition.value = { lat: -33.9, lng: 151.1 };
	}
	log('InfoWindow B position toggled');
};
</script>

<style scoped>
/* InfoWindow content styles */
.info-content {
	padding: 10px;
}

.bordered {
	border: 2px solid #ccc;
	border-radius: 4px;
}

.custom-style {
	background-color: #f8f9fa;
	border-radius: 8px;
	padding: 15px;
}

.info-title {
	margin: 0 0 15px 0;
	font-size: 1.2em;
}

.button-container {
	display: flex;
	gap: 10px;
	margin-top: 10px;
}

.demo-button {
	padding: 8px 16px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.demo-button:hover {
	background-color: #45a049;
}
</style>
