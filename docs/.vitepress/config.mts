import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'v3-gmaps',
	description: 'Lightweight, typed, Google Maps components for Vue 3',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: '/logo.png',

		nav: [
			{ text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
			{ text: 'API', link: '/api/map', activeMatch: '/api/' },
			{ text: 'Demo', link: '/guide/demo' },
		],

		sidebar: {
			'/': [
				{
					text: 'Guide',
					items: [
						{ text: 'Introduction', link: '/guide/' },
						{ text: 'Setup', link: '/guide/setup' },
						{ text: 'Demo', link: '/guide/demo' },
					],
				},
				{
					text: 'Components',
					items: [
						{ text: 'Map', link: '/api/map' },
						{ text: 'Marker', link: '/api/marker' },
						{ text: 'Info Window', link: '/api/info-window' },
						{ text: 'Circle', link: '/api/circle' },
						{ text: 'Rectangle', link: '/api/rectangle' },
						{ text: 'Polyline', link: '/api/polyline' },
						{ text: 'Polygon', link: '/api/polygon' },
						{ text: 'Heatmap', link: '/api/heatmap' },
						{ text: 'Cluster', link: '/api/cluster' },
						{ text: 'Popup', link: '/api/popup' },
					],
				},
				{
					text: 'Advanced',
					items: [
						{ text: 'Plugin Configuration', link: '/advanced/plugin-configuration' },
						{ text: 'Typescript', link: '/advanced/typescript' },
						{ text: 'API Access', link: '/advanced/api-access' },
						{ text: 'Migration from v0.1', link: '/advanced/migration' },
					],
				},
			],
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/xon52/v3-gmaps', ariaLabel: 'v3-gmaps repository' }],

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2025 Keagan Chisnall',
		},
	},
});
