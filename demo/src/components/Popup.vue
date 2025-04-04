<template>
	<wrapper-vue ref="wrapper">
		<!-- Code -->
		<template v-slot:map>
			<gmaps-map :options="mapOptions">
				<gmaps-popup
					:position="{ lat: -25, lng: 125 }"
					background="#BBF0FF"
					@mounted="handleMounted">
					<p style="margin: 10px; font-size: large">
						{{ text }}
					</p>
				</gmaps-popup>
				<gmaps-popup
					:position="{ lat: -30, lng: 138 }"
					height="100px;"
					@mounted="handleMounted">
					<button @click="text = 'Aussie Aussie Aussie'">Anything can</button>
					<br />
					<button @click="text = 'Oi Oi Oi'">Go here</button>
				</gmaps-popup>
			</gmaps-map>
		</template>
		<!-- Description -->
		<template v-slot:description>
			<p>
				This is a custom component (like an
				<router-link
					to="/info-window"
					class="component-name"
					>InfoWindow</router-link
				>) but without boarders and close button.
			</p>
			<p>Anything can be placed inside and handled like any normal Vue component.</p>
			<pre>
&lt;gmaps-map&gt;
  &lt;gmaps-popup background="#BBF0FF" :position="{ lat: -25, lng: 125 }"&gt;
    &lt;p style="margin: 10px; font-size: large"&gt;
      &#123;{ text }&#125;
    &lt;/p&gt;
  &lt;/gmaps-popup&gt;
&lt;/gmaps-map&gt;
      </pre>
		</template>
		<!-- Controls -->
		<template v-slot:controls></template>
	</wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue';
import { gmapsMap, gmapsPopup } from 'v3-gmaps';
import { mapOptions } from './helpers';
import { ref } from 'vue';

const text = ref('This is just text');

const handleMounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('AdvancedMarkerElement mounted', e);
</script>
