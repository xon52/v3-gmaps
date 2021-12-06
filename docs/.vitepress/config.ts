export default {
  lang: 'en-US',
  title: 'v3-gmaps Docs',
  description: 'A lightweight, typed, Google Maps plugin for Vue 3',
  base: '/v3-gmaps/',
  head: [
    ['meta', { name: 'theme-color', content: '#0086ff' }],
    ['link', { rel: 'shortcut icon', href: 'favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }],
  ],

  themeConfig: {
    repo: 'xon52/v3-gmaps',
    repoLabel: 'Github',
    docsDir: 'docs',
    lastUpdated: 'Updated',
    // Algolia
    algolia: {
      appId: 'IAIXEK9AHI',
      apiKey: '289cecbec259bfeb4483673f38ccb7c9',
      indexName: 'v3-gmaps',
    },
    // Nav
    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
      { text: 'API', link: '/api/map', activeMatch: '^/api/' },
      { text: 'Demo', link: '/guide/demo' },
    ],
    // Sidebar
    sidebar: {
      '/': [
        {
          text: 'Guide',
          children: [
            { text: 'What is v3-gmaps?', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Typescript', link: '/guide/typescript' },
          ],
        },
        {
          text: 'Components',
          children: [
            { text: 'Map', link: '/api/map' },
            { text: 'Marker', link: '/api/marker' },
            { text: 'Info Window', link: '/api/info-window' },
            { text: 'Circle', link: '/api/circle' },
            { text: 'Rectangle', link: '/api/rectangle' },
            { text: 'Polyline', link: '/api/polyline' },
            { text: 'Polygon', link: '/api/polygon' },
            { text: 'Heatmap', link: '/api/heatmap' },
            { text: 'Popup', link: '/api/popup' },
            { text: 'Cluster', link: '/api/cluster' },
          ],
        },
      ],
    },
  },
}
