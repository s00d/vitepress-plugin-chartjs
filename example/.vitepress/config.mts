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
        { text: 'API', link: '/api' }
      ],
      sidebar: [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/' },
            { text: 'Examples', link: '/examples' },
            { text: 'API Reference', link: '/api' }
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
            { text: 'Scatter & Bubble', link: '/charts/scatter' }
          ]
        },
        {
          text: 'Plugins',
          items: [
            { text: 'Zoom', link: '/plugins/zoom' },
            { text: 'Data Labels', link: '/plugins/datalabels' },
            { text: 'Annotations', link: '/plugins/annotations' }
          ]
        }
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/s00d/vitepress-plugin-chartjs' }
      ]
    },
  })
)
