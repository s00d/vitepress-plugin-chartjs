# API Reference

Complete API documentation for vitepress-plugin-chartjs.

## Installation

```bash
pnpm add vitepress-plugin-chartjs chart.js
```

## Setup

### 1. VitePress Config

Wrap your config with `withChartjs()` in `.vitepress/config.mts`:

```ts
import { defineConfig } from 'vitepress'
import { withChartjs } from 'vitepress-plugin-chartjs'

export default withChartjs(defineConfig({
  title: "My Site",
  chartjs: {
    // plugin options here
  },
}))
```

### 2. Theme Setup

Create `.vitepress/theme/index.ts` and import styles:

```ts
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-chartjs/style.css'

export default DefaultTheme
```

::: warning Style Import Required
You must import `vitepress-plugin-chartjs/style.css` in your theme for charts to render correctly.
:::

### 3. With Plugins

If you need Chart.js plugins or extended chart types, register them in the theme:

```ts
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-chartjs/style.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      const { Chart } = await import('chart.js')

      // Example: register zoom plugin
      const zoomPlugin = (await import('chartjs-plugin-zoom')).default
      Chart.register(zoomPlugin)
    }
  }
}
```

## Plugin Options

Pass options via `chartjs` in your VitePress config:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultOptions` | `object` | `{}` | Default options for all charts |
| `defaultWidth` | `string \| number` | `'100%'` | Default chart width |
| `defaultHeight` | `string \| number` | `'400px'` | Default chart height |
| `enableZoom` | `boolean` | `false` | Enable zoom plugin globally |
| `enableDatalabels` | `boolean` | `false` | Enable datalabels plugin globally |
| `colorPalette` | `string[]` | Default colors | Custom color palette |
| `darkColorPalette` | `string[]` | Default dark colors | Color palette for dark mode |
| `autoDarkMode` | `boolean` | `undefined` | Auto dark mode detection |
| `containerClass` | `string` | `undefined` | Custom CSS class for chart containers |
| `root` | `string` | `process.cwd()` | Root directory for resolving `url:` paths |

## Full Configuration Example

```ts
import { defineConfig } from 'vitepress'
import { withChartjs } from 'vitepress-plugin-chartjs'

export default withChartjs(
  defineConfig({
    title: "My Docs",

    // Your vite plugins are preserved!
    vite: {
      plugins: [/* your plugins */]
    },

    // Your markdown config is preserved!
    markdown: {
      config: (md) => {
        // your markdown-it plugins
      }
    },

    chartjs: {
      defaultHeight: '400px',
      colorPalette: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
      ],
    },
  })
)
```

## Chart Configuration

### Basic Structure

```yaml
type: line                    # Required: chart type (any string)
data:                         # Required: chart data
  labels: [...]               # X-axis labels
  datasets:                   # Data series
    - label: Series 1
      data: [...]
options:                      # Optional: chart options
  plugins: {...}
  scales: {...}
height: 400px                 # Optional: chart height
```

### Chart Types

Any chart type string is accepted. Built-in Chart.js types:

| Type | Description |
|------|-------------|
| `line` | Line/area charts |
| `bar` | Vertical/horizontal bar charts |
| `pie` | Pie charts |
| `doughnut` | Doughnut charts |
| `radar` | Radar/spider charts |
| `polarArea` | Polar area charts |
| `scatter` | Scatter plots |
| `bubble` | Bubble charts |

Extended types (require plugin registration):

| Type | Package |
|------|---------|
| `boxplot`, `violin` | `@sgratzl/chartjs-chart-boxplot` |
| `choropleth`, `bubbleMap` | `chartjs-chart-geo` |
| `matrix` | `chartjs-chart-matrix` |
| `treemap` | `chartjs-chart-treemap` |
| `forceDirectedGraph`, `tree`, `dendrogram` | `chartjs-chart-graph` |

## External Files

Load configs from `public/` folder. All resolved at **build time**.

```yaml
url: /charts/my-chart.yaml
```

| Extension | Description | Export Type |
|-----------|-------------|-------------|
| `.yaml` | YAML configuration | N/A (parsed as YAML) |
| `.json` | JSON configuration | N/A (parsed as JSON) |
| `.js`, `.mjs` | JavaScript module | `export default` (function, async function, or object) |

JS modules run in Node.js at build time — you can use `fs`, `path`, `fetch`, and any installed npm packages.

## Data Formats

### Simple Data

```yaml
data:
  labels: [Jan, Feb, Mar, Apr]
  datasets:
    - label: Sales
      data: [10, 20, 30, 40]
```

### Point Data (Scatter/Bubble)

```yaml
data:
  datasets:
    - label: Points
      data:
        - { x: 10, y: 20 }
        - { x: 20, y: 30 }
```

### Bubble Data

```yaml
data:
  datasets:
    - label: Bubbles
      data:
        - { x: 10, y: 20, r: 5 }
        - { x: 20, y: 30, r: 10 }
```

## Options Reference

### Scale Options

```yaml
options:
  scales:
    x:
      type: category
      display: true
      title:
        display: true
        text: X Axis
    y:
      type: linear
      beginAtZero: true
```

### Plugin Options

```yaml
options:
  plugins:
    title:
      display: true
      text: Chart Title
    legend:
      display: true
      position: top
    tooltip:
      enabled: true
```

## TypeScript Types

```ts
import type {
  ChartConfig,
  PluginConfig,
  ChartData,
  ChartOptions,
  DatasetConfig,
  SupportedChartType,
  ValidationResult,
} from 'vitepress-plugin-chartjs'
```

## How It Works

1. **`withChartjs()`** wraps your VitePress config, adding markdown and Vite plugins
2. **Markdown plugin** converts `` ```chart `` blocks to `<VpChart />` Vue components at build time
3. **Build-time resolver** handles `url:` directives — reads files, executes JS modules
4. **Vite plugin** registers the `VpChart` Vue component in the client app
5. **Vue component** renders the chart with Chart.js when visible (IntersectionObserver)

All data resolution happens at build time. The client only receives pre-computed chart configurations — no runtime fetching.
