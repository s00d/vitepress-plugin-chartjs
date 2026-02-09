# Plugin Setup

Chart.js plugins and chart type extensions must be registered in your VitePress theme. The core plugin only includes Chart.js itself — you control which plugins to add.

## Quick Start

Create `.vitepress/theme/index.ts`:

```typescript
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-chartjs/style.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)

      // Add plugins you need
      const zoomPlugin = (await import('chartjs-plugin-zoom')).default
      Chart.register(zoomPlugin)
    }
  }
}
```

::: warning Style Import Required
You must import `vitepress-plugin-chartjs/style.css` in your theme. Without it, chart containers will not be styled correctly.
:::

::: warning SSR Compatibility
Always wrap imports with `if (typeof window !== 'undefined')` to avoid SSR errors.
:::

## Full Example

Here's a complete theme setup with all available plugins:

```typescript
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-chartjs/style.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      const { Chart } = await import('chart.js')
      // === PLUGINS ===

      // Zoom - pan and zoom
      const zoomPlugin = (await import('chartjs-plugin-zoom')).default
      Chart.register(zoomPlugin)

      // Datalabels - labels on data points
      const datalabelsPlugin = (await import('chartjs-plugin-datalabels')).default
      Chart.register(datalabelsPlugin)

      // Annotation - lines, boxes, labels
      const annotationPlugin = (await import('chartjs-plugin-annotation')).default
      Chart.register(annotationPlugin)

      // Autocolors - automatic color generation
      const autocolorsPlugin = await import('chartjs-plugin-autocolors')
      Chart.register(autocolorsPlugin.default || autocolorsPlugin)

      // Colorschemes - predefined schemes
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

      // Geographic Maps
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
```

## Available Plugins

| Package | Description |
|---------|-------------|
| `chartjs-plugin-zoom` | Pan and zoom |
| `chartjs-plugin-datalabels` | Data point labels |
| `chartjs-plugin-annotation` | Lines, boxes, annotations |
| `chartjs-plugin-autocolors` | Auto color generation |
| `hw-chartjs-plugin-colorschemes` | Predefined color schemes |
| `@aziham/chartjs-plugin-streaming` | Realtime data |
| `chartjs-scale-timestack` | Stacked time scale |

## Chart Type Extensions

| Package | Chart Types |
|---------|-------------|
| `@sgratzl/chartjs-chart-boxplot` | `boxplot`, `violin` |
| `chartjs-chart-geo` | `choropleth`, `bubbleMap` |
| `chartjs-chart-matrix` | `matrix` |
| `chartjs-chart-treemap` | `treemap` |
| `chartjs-chart-graph` | `forceDirectedGraph`, `tree`, `dendrogram` |

## Install Dependencies

```bash
# Core (required)
npm install chart.js

# Plugins (optional - install what you need)
npm install chartjs-plugin-zoom
npm install chartjs-plugin-datalabels
npm install chartjs-plugin-annotation
npm install chartjs-plugin-autocolors
npm install hw-chartjs-plugin-colorschemes
npm install @aziham/chartjs-plugin-streaming chartjs-adapter-luxon luxon
npm install chartjs-scale-timestack luxon

# Chart types (optional)
npm install @sgratzl/chartjs-chart-boxplot
npm install chartjs-chart-geo topojson-client
npm install chartjs-chart-matrix
npm install chartjs-chart-treemap
npm install chartjs-chart-graph
```

## No Plugins Needed?

If you only use basic chart types (line, bar, pie, etc.), you still need to import styles:

```typescript
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-chartjs/style.css'

export default DefaultTheme
```
