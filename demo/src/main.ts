import gmaps from '../../src';
import router from './router';
import { createApp } from 'vue';
import App from './App.vue';

// Check for API key
const googleKey = import.meta.env.VITE_GOOGLE_KEY;

// Create app
const app = createApp(App);

// Add plugins
app.use(router);
app.use(gmaps, {
	key: googleKey,
	callback: () => console.log('Google Maps loaded successfully!'),
});

// Mount app
app.mount('#app');
