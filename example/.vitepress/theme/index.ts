import DefaultTheme from 'vitepress/theme'
// Import plugin styles
import 'vitepress-plugin-chartjs/style.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    // Only load on client side (SSR-safe)
    if (typeof window !== 'undefined') {
      const { Chart, registerables } = await import('chart.js')
      
      // Register all Chart.js built-in components first (including tooltip)
      Chart.register(...registerables)
      
      // === PLUGINS ===

      // Zoom - pan and zoom functionality
      const zoomPlugin = (await import('chartjs-plugin-zoom')).default
      Chart.register(zoomPlugin)

      // Datalabels - display labels on data points
      const datalabelsPlugin = (await import('chartjs-plugin-datalabels')).default
      Chart.register(datalabelsPlugin)

      // Annotation - add lines, boxes, labels
      const annotationPlugin = (await import('chartjs-plugin-annotation')).default
      Chart.register(annotationPlugin)

      // Autocolors - automatic color generation
      const autocolorsPlugin = await import('chartjs-plugin-autocolors')
      Chart.register(autocolorsPlugin)

      // Colorschemes - predefined color schemes
      await import('hw-chartjs-plugin-colorschemes')

      // Streaming - realtime data
      await import('chartjs-adapter-luxon')
      const streamingPlugin = (await import('@aziham/chartjs-plugin-streaming')).default
      Chart.register(streamingPlugin)

      // Timestack - stacked time scale
      await import('chartjs-scale-timestack')

      // === CHART TYPE EXTENSIONS ===

      // Box Plot & Violin
      const boxplot = await import('@sgratzl/chartjs-chart-boxplot')
      Chart.register(
        boxplot.BoxPlotController,
        boxplot.BoxAndWiskers,
        boxplot.ViolinController,
        boxplot.Violin
      )

      // Geographic Maps (Choropleth, BubbleMap)
      const geo = await import('chartjs-chart-geo')
      Chart.register(
        geo.ChoroplethController,
        geo.BubbleMapController,
        geo.GeoFeature,
        geo.ProjectionScale,
        geo.ColorScale,
        geo.SizeScale
      )

      // Matrix / Heatmap
      const matrix = await import('chartjs-chart-matrix')
      Chart.register(matrix.MatrixController, matrix.MatrixElement)

      // Treemap
      const treemap = await import('chartjs-chart-treemap')
      Chart.register(treemap.TreemapController, treemap.TreemapElement)

      // Graph / Tree / Dendrogram
      const graph = await import('chartjs-chart-graph')
      Chart.register(
        graph.ForceDirectedGraphController,
        graph.DendrogramController,
        graph.TreeController,
        graph.EdgeLine
      )
    }
  }
}
