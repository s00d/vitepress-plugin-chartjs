import { defineConfig } from 'vitepress'
import { withChartjs } from 'vitepress-plugin-chartjs'

export default withChartjs(
  defineConfig({
    title: "VitePress Plugin Chart.js",
    description: "Chart.js plugin for VitePress - render beautiful charts from markdown",
    base: process.env.BASE_PATH || "/",
    
    // Plugin options
    chartjs: {
      defaultHeight: '400px',
      colorPalette: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
    },
    
    themeConfig: {
      footer: {
        message: "Released under the MIT License",
      },
      search: {
        provider: "local",
      },
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/examples' },
      ],
      sidebar: [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/' },
            { text: 'Examples', link: '/examples' },
            { text: 'External Files', link: '/charts/external' },
          ]
        },
        {
          text: 'Chart Types',
          items: [
            { text: 'Line Charts', link: '/charts/line' },
            { text: 'Bar Charts', link: '/charts/bar' },
            { text: 'Pie & Doughnut', link: '/charts/pie' },
            { text: 'Radar Charts', link: '/charts/radar' },
            { text: 'Polar Area', link: '/charts/polar' },
            { text: 'Scatter & Bubble', link: '/charts/scatter' },
            { text: 'Box Plot & Violin', link: '/charts/boxplot' },
            { text: 'Geographic Maps', link: '/charts/geo' },
            { text: 'Matrix / Heatmap', link: '/charts/matrix' },
            { text: 'Treemap', link: '/charts/treemap' },
            { text: 'Graph / Tree', link: '/charts/graph' }
          ]
        },
        {
          text: 'Plugins',
          items: [
            { text: 'Plugin Setup', link: '/plugins/setup' },
            { text: 'Zoom', link: '/plugins/zoom' },
            { text: 'Data Labels', link: '/plugins/datalabels' },
            { text: 'Annotations', link: '/plugins/annotations' },
            { text: 'Auto Colors', link: '/plugins/autocolors' },
            { text: 'Color Schemes', link: '/plugins/colorschemes' },
            { text: 'Timestack Scale', link: '/plugins/timestack' },
            { text: 'Streaming', link: '/plugins/streaming' }
          ]
        }
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/s00d/vitepress-plugin-chartjs' }
      ]
    },
  })
)
