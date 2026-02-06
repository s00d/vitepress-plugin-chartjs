# vitepress-plugin-chartjs

[![npm version](https://img.shields.io/npm/v/vitepress-plugin-chartjs/latest?style=for-the-badge)](https://www.npmjs.com/package/vitepress-plugin-chartjs)
[![npm downloads](https://img.shields.io/npm/dw/vitepress-plugin-chartjs?style=for-the-badge)](https://www.npmjs.com/package/vitepress-plugin-chartjs)
[![License](https://img.shields.io/npm/l/vitepress-plugin-chartjs?style=for-the-badge)](https://www.npmjs.com/package/vitepress-plugin-chartjs)
[![Donate](https://img.shields.io/badge/Donate-Donationalerts-ff4081?style=for-the-badge)](https://www.donationalerts.com/r/s00d88)

A powerful VitePress plugin for rendering Chart.js charts directly from markdown code blocks with full TypeScript support.

![vitepress-plugin-chartjs](img.png)

## Features

- **All Chart Types**: Line, Bar, Pie, Doughnut, Radar, Polar Area, Bubble, Scatter and more
- **Full Chart.js 4.x Support**: Complete TypeScript types for all options
- **Any Plugin Support**: Register any Chart.js plugin or chart type extension in your theme - the core is completely plugin-agnostic
- **Lazy Loading**: Charts initialize only when visible on screen (IntersectionObserver)
- **External Config**: Load chart configurations from YAML, JSON, or JavaScript files
- **Auto-Refresh**: Periodically reload data from JavaScript config files
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
import { withChartjs } from 'vitepress-plugin-chartjs'

export default withChartjs(
  defineConfig({
    title: "My Docs",
    
    // Plugin options
    chartjs: {
      defaultHeight: '400px',
      colorPalette: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
      ],
    },
  })
)
```

### 2. Setup Theme (Optional)

If you want to use Chart.js plugins or extended chart types, create `.vitepress/theme/index.ts`:

```ts
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    // Only load on client (SSR-safe)
    if (typeof window !== 'undefined') {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      
      const zoomPlugin = (await import('chartjs-plugin-zoom')).default
      Chart.register(zoomPlugin)
    }
  }
}
```

If you don't need plugins, you can skip this step — basic chart types work without any setup.

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

### 4. Load Configuration from File

You can load chart configuration from external files in your `public` folder. Supports **YAML**, **JSON**, and **JavaScript** files.

#### YAML/JSON Files

````markdown
```chart
url: /charts/my-chart.yaml
```
````

Example YAML file (`public/charts/my-chart.yaml`):

```yaml
type: line
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Sales 2024
      data: [65, 59, 80, 81, 56, 55]
      borderColor: rgba(54, 162, 235, 1)
      tension: 0.4
```

#### JavaScript Files (Dynamic Data)

Use JavaScript files to generate dynamic configurations:

````markdown
```chart
url: /charts/dynamic-chart.js
```
````

Example JS file (`public/charts/dynamic-chart.js`):

```javascript
// Function export - called each time chart is rendered
export default function() {
  const randomData = Array.from({ length: 6 }, () => 
    Math.floor(Math.random() * 100)
  );
  
  return {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Random Data',
        data: randomData
      }]
    }
  };
}
```

Async functions are also supported for API data fetching:

```javascript
export default async function() {
  const response = await fetch('/api/data');
  const data = await response.json();
  
  return {
    type: 'line',
    data: data
  };
}
```

| File Type | Extension | Description |
|-----------|-----------|-------------|
| YAML | `.yaml` | Static configuration |
| JSON | `.json` | Static configuration |
| JavaScript | `.js`, `.mjs` | Dynamic/computed configuration |

This allows you to:
- **Reuse** chart configurations across multiple pages
- **Separate** data from documentation content
- **Generate** dynamic data with JavaScript
- **Fetch** data from APIs with async functions
- **Share** chart templates between projects

#### Auto-Refresh

Add the `refresh` parameter to automatically reload data at a specified interval (in milliseconds):

````markdown
```chart
url: /charts/realtime-data.js
refresh: 2000
```
````

This will call the JS function every 2 seconds and update the chart with new data. Perfect for:
- **Server monitoring** dashboards
- **Live data** visualizations
- **Simulated realtime** demos

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

### Box Plot / Violin

```yaml
type: boxplot
data:
  labels: [Group A, Group B, Group C]
  datasets:
    - label: Distribution
      data:
        - [10, 15, 20, 25, 30, 35, 40]
        - [5, 10, 15, 20, 25, 30, 35, 40]
        - [15, 20, 25, 30, 35, 40, 45]
```

### Choropleth / Geographic Maps

Geographic charts require loading data via JavaScript files. Create a JS config file:

```javascript
// public/charts/us-map.js
export default async function() {
  const topojson = await import('https://esm.sh/topojson-client@3')
  const response = await fetch('https://unpkg.com/us-atlas/states-10m.json')
  const us = await response.json()
  
  const nation = topojson.feature(us, us.objects.nation).features[0]
  const states = topojson.feature(us, us.objects.states).features
  
  return {
    type: 'choropleth',
    data: {
      labels: states.map((d) => d.properties.name),
      datasets: [{
        label: 'States',
        outline: nation,
        data: states.map((d) => ({ feature: d, value: Math.random() * 10 }))
      }]
    },
    options: {
      scales: {
        projection: { axis: 'x', projection: 'albersUsa' },
        color: { axis: 'x', quantize: 5 }
      }
    }
  }
}
```

Then use in markdown:

````markdown
```chart
url: /charts/us-map.js
height: 350px
```
````

## Plugin Configuration

Plugins must be registered in your theme (see Setup Theme above). Then configure per-chart:

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

Options are passed via `chartjs:` in your VitePress config:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultOptions` | `ChartOptions` | `{}` | Default options for all charts |
| `defaultWidth` | `string \| number` | `'100%'` | Default chart width |
| `defaultHeight` | `string \| number` | `'400px'` | Default chart height |
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

- [Chart.js](https://www.chartjs.org/) ^4.0.0
- [VitePress](https://vitepress.dev/) ^1.0.0

Any Chart.js plugins you want to use should be installed separately and registered in your theme.

## License

MIT License
