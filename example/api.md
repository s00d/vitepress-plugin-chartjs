# API Reference

Complete API documentation for vitepress-plugin-chartjs.

## Installation

```bash
pnpm add vitepress-plugin-chartjs chart.js
```

## Setup

Wrap your config with `withChartjs()` in `.vitepress/config.mts`:

```ts
import { defineConfig } from 'vitepress'
import { withChartjs } from 'vitepress-plugin-chartjs'

export default withChartjs(defineConfig({
  title: "My Site",
  // your config...
}))
```

**That's it!** No theme configuration needed.

## Plugin Options

Pass options as the second argument to `withChartjs()`:

```ts
export default withChartjs(
  defineConfig({ /* ... */ }),
  {
    defaultHeight: '400px',
    enableZoom: true,
  }
)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultOptions` | `ChartOptions` | `{}` | Default options for all charts |
| `defaultHeight` | `string` | `'400px'` | Default chart height |
| `enableZoom` | `boolean` | `false` | Enable zoom plugin globally |
| `enableDatalabels` | `boolean` | `false` | Enable datalabels plugin globally |
| `colorPalette` | `string[]` | Default colors | Custom color palette |

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
    
    // Your vue options are preserved!
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('my-')
        }
      }
    },
    
    // Your markdown config is preserved!
    markdown: {
      config: (md) => {
        // your markdown-it plugins
      }
    }
  }),
  {
    defaultHeight: '400px',
    colorPalette: [
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 99, 132, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(255, 206, 86, 0.8)',
    ],
  }
)
```

## Chart Configuration

### Basic Structure

```yaml
type: line                    # Required: chart type
data:                         # Required: chart data
  labels: [...]               # X-axis labels
  datasets:                   # Data series
    - label: Series 1
      data: [...]
options:                      # Optional: chart options
  plugins: {...}
  scales: {...}
```

### Supported Chart Types

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
  SupportedChartType,
} from 'vitepress-plugin-chartjs'
```

## Default Color Palette

```ts
const DEFAULT_COLORS = [
  'rgba(54, 162, 235, 0.8)',   // Blue
  'rgba(255, 99, 132, 0.8)',   // Red
  'rgba(75, 192, 192, 0.8)',   // Teal
  'rgba(255, 206, 86, 0.8)',   // Yellow
  'rgba(153, 102, 255, 0.8)',  // Purple
  'rgba(255, 159, 64, 0.8)',   // Orange
]
```

## How It Works

1. **withChartjs()** wrapper merges your config with plugin settings
2. **Vite plugin** injects client script into .md files with charts
3. **Markdown plugin** converts chart blocks to `<vp-chart>` elements
4. **Client script** registers Web Component (SSR-safe)
5. **connectedCallback** initializes Chart.js when element appears

This approach:
- Preserves your existing vite/vue/markdown configs
- Is SSR-safe (no `HTMLElement is not defined` errors)
- Works with VitePress SPA navigation
- Properly cleans up chart instances

## Legacy API

If you prefer explicit config, use `chartjsPlugin()`:

```ts
import { chartjsPlugin } from 'vitepress-plugin-chartjs'

const chartjs = chartjsPlugin({ defaultHeight: '400px' })

export default defineConfig({
  vue: chartjs.vue,
  vite: chartjs.vite,
  markdown: chartjs.markdown,
})
```

However, `withChartjs()` is recommended for better DX.
