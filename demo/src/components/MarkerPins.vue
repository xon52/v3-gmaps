<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>Marker Pins Demo</template>

		<!-- Map with pin-customized markers -->
		<template #map>
			<gm-map :options="options">
				<!-- Basic pin with customizable properties -->
				<gm-marker
					:position="basicPinMarker.position"
					:pin="basicPinOptions"
					:title="'Basic Pin with customizable properties'"
					:clickable="true"
					@click="handleBasicPinClick" />

				<!-- Pin with image glyph -->
				<gm-marker
					:position="imageGlyphMarker.position"
					:pin="imageGlyphOptions"
					:title="'Pin with image glyph'"
					:clickable="true"
					@click="handleImageGlyphClick" />

				<!-- Pin with SVG glyph -->
				<gm-marker
					:position="svgGlyphMarker.position"
					:pin="svgGlyphOptions"
					:title="'Pin with SVG glyph'"
					:clickable="true"
					@click="handleSvgGlyphClick" />
			</gm-map>
		</template>

		<!-- Controls -->
		<template #controls>
			<control-section>
				<h3>Basic Pin Properties</h3>
				<demo-color-picker
					v-model="basicPinBackground"
					id="basic-background"
					label="Background Color" />
				<demo-color-picker
					v-model="basicPinBorderColor"
					id="basic-border"
					label="Border Color" />
				<demo-color-picker
					v-model="basicPinGlyphColor"
					id="basic-glyph-color"
					label="Glyph Color" />
				<demo-input
					v-model="basicPinGlyphText"
					id="basic-glyph-text"
					label="Glyph Text"
					:maxLength="2" />
				<demo-slider
					v-model="basicPinScale"
					id="basic-scale-slider"
					label="Scale"
					:min="0.5"
					:max="3"
					:step="0.1" />
			</control-section>

			<control-section>
				<h3>Image Glyph Pin</h3>
				<demo-color-picker
					v-model="imageGlyphBackground"
					id="image-background"
					label="Background Color" />
				<demo-slider
					v-model="imageGlyphScale"
					id="image-scale-slider"
					label="Scale"
					:min="0.5"
					:max="3"
					:step="0.1" />
				<demo-button @click="toggleImageGlyph">Change Glyph Image</demo-button>
			</control-section>

			<control-section>
				<h3>SVG Glyph Pin</h3>
				<demo-color-picker
					v-model="svgGlyphBackground"
					id="svg-background"
					label="Background Color" />
				<demo-color-picker
					v-model="svgGlyphColor"
					id="svg-fill-color"
					label="SVG Fill Color" />
				<demo-slider
					v-model="svgGlyphScale"
					id="svg-scale-slider"
					label="Scale"
					:min="0.5"
					:max="3"
					:step="0.1" />
				<demo-button @click="toggleSvgGlyph">Switch SVG Icon</demo-button>
			</control-section>
		</template>

		<!-- Description -->
		<template #description>
			<p>This demo showcases the powerful <code>pin</code> property of the <code>gm-marker</code> component.</p>
			<p>The <code>pin</code> property allows you to fully customize marker appearances:</p>
			<pre><code>&lt;!-- Basic text glyph --&gt;
&lt;gm-marker
  :position="position"
  :pin="{
    background: '#4285F4',
    borderColor: '#000000',
    glyphColor: '#FFFFFF',
    scale: 1.5,
    glyph: 'A'
  }"
/&gt;

&lt;!-- Image glyph --&gt;
&lt;gm-marker
  :position="position"
  :pin="{
    background: '#FBBC04',
    scale: 1.5,
    glyph: imageUrl
  }"
/&gt;

&lt;!-- SVG glyph --&gt;
&lt;gm-marker
  :position="position"
  :pin="{
    background: '#34A853',
    scale: 1.5,
    glyph: '&lt;svg viewBox="0 0 24 24"&gt;&lt;path fill="#FFFFFF" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/&gt;&lt;/svg&gt;'
  }"
/&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { gmMap, gmMarker, type GmPosition, type GmPinStyle } from 'v3-gmaps';
import { log } from '../store';
import { DemoWrapper, DemoButton, ControlSection, DemoColorPicker, DemoSlider, DemoInput } from '../controls';
import MarkerPng from '../assets/marker.png';
import Marker2Png from '../assets/marker2.png';
import { createMapOptions } from './mapHelpers';

// Map configuration
const options = ref(createMapOptions({ center: { lat: -33.8, lng: 150.9 }, zoom: 10 }));

// Basic pin marker with customizable properties
const basicPinMarker = ref<{ position: GmPosition }>({
	position: { lat: -33.8, lng: 150.7 },
});

// Basic pin properties
const basicPinBackground = ref('#4285F4');
const basicPinBorderColor = ref('#000000');
const basicPinGlyphColor = ref('#FFFFFF');
const basicPinGlyphText = ref('1');
const basicPinScale = ref(1.5);

// Computed property for basic pin options
const basicPinOptions = computed<GmPinStyle>(() => ({
	background: basicPinBackground.value,
	borderColor: basicPinBorderColor.value,
	glyphColor: basicPinGlyphColor.value,
	scale: Number(basicPinScale.value),
	glyph: basicPinGlyphText.value,
}));

// Image glyph marker
const imageGlyphMarker = ref<{ position: GmPosition }>({
	position: { lat: -33.85, lng: 150.9 },
});

// Image glyph properties
const imageGlyphBackground = ref('#FBBC04');
const imageGlyphScale = ref(1.8);
const imageGlyphIndex = ref(0);
const imageGlyphs = [Marker2Png, MarkerPng];

// Computed property for image glyph options
const imageGlyphOptions = computed<GmPinStyle>(() => ({
	background: imageGlyphBackground.value,
	scale: Number(imageGlyphScale.value),
	glyph: imageGlyphs[imageGlyphIndex.value],
}));

// SVG glyph marker
const svgGlyphMarker = ref<{ position: GmPosition }>({
	position: { lat: -33.9, lng: 151.1 },
});

// SVG glyph properties
const svgGlyphBackground = ref('#34A853');
const svgGlyphColor = ref('#FFFFFF');
const svgGlyphScale = ref(1.6);
const svgGlyphIndex = ref(0);

const pinSvg = computed(
	() =>
		`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${svgGlyphColor.value}"/></svg>`
);

const starSvg = computed(
	() =>
		`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="${svgGlyphColor.value}"/></svg>`
);

const homeSvg = computed(
	() =>
		`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="${svgGlyphColor.value}"/></svg>`
);

// Computed property for the current SVG glyph based on index
const currentSvgGlyph = computed(() => {
	switch (svgGlyphIndex.value) {
		case 1:
			return pinSvg.value;
		case 2:
			return starSvg.value;
		default:
			return homeSvg.value;
	}
});

// Computed property for SVG glyph options
const svgGlyphOptions = computed<GmPinStyle>(() => ({
	background: svgGlyphBackground.value,
	scale: Number(svgGlyphScale.value),
	glyph: currentSvgGlyph.value,
}));

// Event handlers
const handleBasicPinClick = () => {
	log(`Basic pin clicked (glyph: "${basicPinGlyphText.value}", scale: ${basicPinScale.value})`);
};

const handleImageGlyphClick = () => {
	log(`Image glyph pin clicked (image: ${imageGlyphIndex.value + 1}, scale: ${imageGlyphScale.value})`);
};

const handleSvgGlyphClick = () => {
	log(`SVG glyph pin clicked (icon: ${svgGlyphIndex.value + 1}, scale: ${svgGlyphScale.value})`);
};

// Image toggle function
const toggleImageGlyph = () => {
	imageGlyphIndex.value = (imageGlyphIndex.value + 1) % imageGlyphs.length;
	log(`Image glyph changed to image ${imageGlyphIndex.value + 1}`);
};

// SVG toggle function
const toggleSvgGlyph = () => {
	svgGlyphIndex.value = (svgGlyphIndex.value + 1) % 3; // We have 3 SVG options
	log(`SVG glyph changed to icon ${svgGlyphIndex.value + 1}`);
};
</script>
