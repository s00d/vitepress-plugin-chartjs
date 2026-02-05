# vitepress-plugin-chartjs

[![npm version](https://img.shields.io/npm/v/vitepress-plugin-chartjs/latest?style=for-the-badge)](https://www.npmjs.com/package/vitepress-plugin-chartjs)
[![npm downloads](https://img.shields.io/npm/dw/vitepress-plugin-chartjs?style=for-the-badge)](https://www.npmjs.com/package/vitepress-plugin-chartjs)
[![License](https://img.shields.io/npm/l/vitepress-plugin-chartjs?style=for-the-badge)](https://www.npmjs.com/package/vitepress-plugin-chartjs)
[![Donate](https://img.shields.io/badge/Donate-Donationalerts-ff4081?style=for-the-badge)](https://www.donationalerts.com/r/s00d88)

A powerful VitePress plugin for rendering Chart.js charts directly from markdown code blocks with full TypeScript support.

## Features

- **All Chart Types**: Line, Bar, Pie, Doughnut, Radar, Polar Area, Bubble, Scatter
- **Full Chart.js 4.x Support**: Complete TypeScript types for all options
- **Popular Plugins Included**:
  - `chartjs-plugin-zoom` - Pan and zoom functionality
  - `chartjs-plugin-datalabels` - Display labels on data points
  - `chartjs-plugin-annotation` - Add lines, boxes, and labels
- **Dark Mode Support**: Automatic theme switching
- **Responsive**: Charts adapt to container size
- **Simple Syntax**: YAML or JSON configuration in code blocks

## Installation

```bash
# npm
npm install vitepress-plugin-chartjs

# pnpm
pnpm add vitepress-plugin-chartjs

# yarn
yarn add vitepress-plugin-chartjs
```

## Quick Start

### 1. Configure VitePress

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import chartjs from 'vitepress-plugin-chartjs'

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(chartjs, {
        // Default options for all charts
        defaultOptions: {
          responsive: true,
          maintainAspectRatio: false,
        },
        defaultHeight: '400px',
      })
    },
  },
})
```

### 2. Setup Theme

Create `.vitepress/theme/index.ts`:

```ts
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { initCharts, destroyCharts } from 'vitepress-plugin-chartjs/client'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    
    onMounted(() => {
      nextTick(() => initCharts())
    })
    
    watch(() => route.path, () => {
      nextTick(() => {
        destroyCharts()
        initCharts()
      })
    })
  }
}
```

### 3. Create Charts in Markdown

Use `chart` or `chartjs` as the code block language:

````markdown
```chart
type: bar
data:
  labels: [January, February, March, April, May]
  datasets:
    - label: Sales 2024
      data: [65, 59, 80, 81, 56]
    - label: Sales 2025
      data: [45, 79, 60, 91, 76]
options:
  plugins:
    title:
      display: true
      text: Monthly Sales Comparison
```
````

## Chart Types

### Line Chart

```yaml
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri]
  datasets:
    - label: Visitors
      data: [120, 190, 300, 250, 420]
      tension: 0.4
      fill: true
```

### Bar Chart

```yaml
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: Revenue
      data: [50, 60, 70, 80]
```

### Pie / Doughnut

```yaml
type: doughnut
data:
  labels: [Desktop, Mobile, Tablet]
  datasets:
    - data: [55, 30, 15]
```

### Radar Chart

```yaml
type: radar
data:
  labels: [Speed, Power, Defense, Stamina, Agility]
  datasets:
    - label: Player A
      data: [80, 90, 70, 85, 75]
```

### Scatter / Bubble

```yaml
type: scatter
data:
  datasets:
    - label: Data Points
      data:
        - { x: 10, y: 20 }
        - { x: 20, y: 30 }
```

## Plugin Configuration

### Enable Zoom

```ts
md.use(chartjs, {
  enableZoom: true,
})
```

Or per-chart:

```yaml
options:
  plugins:
    zoom:
      zoom:
        wheel:
          enabled: true
        mode: xy
      pan:
        enabled: true
```

### Enable Data Labels

```yaml
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
```

### Add Annotations

```yaml
options:
  plugins:
    annotation:
      annotations:
        line1:
          type: line
          yMin: 50
          yMax: 50
          borderColor: red
          borderDash: [5, 5]
          label:
            display: true
            content: Target
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultOptions` | `ChartOptions` | `{}` | Default options for all charts |
| `defaultWidth` | `string \| number` | `'100%'` | Default chart width |
| `defaultHeight` | `string \| number` | `'400px'` | Default chart height |
| `enableZoom` | `boolean` | `false` | Enable zoom plugin globally |
| `enableDatalabels` | `boolean` | `false` | Enable datalabels globally |
| `colorPalette` | `string[]` | Built-in | Custom color palette |

## Client API

```ts
import { 
  initCharts, 
  destroyCharts, 
  getChart, 
  resetZoom 
} from 'vitepress-plugin-chartjs/client'

// Initialize all charts
initCharts()

// Destroy all charts
destroyCharts()

// Get specific chart instance
const chart = getChart('chart-id')

// Reset zoom
resetZoom('chart-id')
```

## TypeScript Support

Full TypeScript support with types for all chart configurations:

```ts
import type {
  ChartConfig,
  PluginConfig,
  LineDatasetConfig,
  BarDatasetConfig,
  // ... and more
} from 'vitepress-plugin-chartjs'
```

## Dependencies

- [Chart.js](https://www.chartjs.org/) ^4.4.0
- [chartjs-plugin-zoom](https://www.chartjs.org/chartjs-plugin-zoom/) ^2.2.0
- [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/) ^2.2.0
- [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/) ^3.1.0

## License

MIT License
