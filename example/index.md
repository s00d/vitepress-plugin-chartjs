# VitePress Plugin Chart.js

A **zero-config** Chart.js plugin for VitePress - render beautiful charts directly from markdown code blocks.

## Quick Start

Write charts using simple YAML syntax in your markdown:

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

**Code:**

````yaml
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

## Features

- **Zero Config** - Just wrap your config with `withChartjs()`
- **All Chart Types** - Line, Bar, Pie, Doughnut, Radar, Polar Area, Bubble, Scatter
- **Full Chart.js 4.x Support** - Complete TypeScript types
- **Optional Plugins** - Zoom, Data Labels, Annotations
- **Dark Mode** - Automatic theme switching
- **SSR Safe** - Works with VitePress static generation
- **Config Merging** - Your vite/vue configs are preserved

## Installation

```bash
pnpm add vitepress-plugin-chartjs chart.js
```

## Setup

Wrap your config in `.vitepress/config.mts`:

```ts
import { defineConfig } from 'vitepress'
import { withChartjs } from 'vitepress-plugin-chartjs'

export default withChartjs(defineConfig({
  title: "My Site",
  // your config...
}))
```

**That's it!** No theme configuration needed. Your existing vite/vue configs are preserved.

## With Plugin Options

```ts
import { defineConfig } from 'vitepress'
import { withChartjs } from 'vitepress-plugin-chartjs'

export default withChartjs(
  defineConfig({
    title: "My Site",
  }),
  {
    defaultHeight: '400px',
    enableZoom: true,
    colorPalette: ['#3b82f6', '#ef4444', '#22c55e'],
  }
)
```

## Line Chart Example

```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  datasets:
    - label: Website Visitors
      data: [120, 190, 300, 250, 420, 380, 450]
      tension: 0.4
      fill: true
options:
  plugins:
    title:
      display: true
      text: Weekly Traffic
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  datasets:
    - label: Website Visitors
      data: [120, 190, 300, 250, 420, 380, 450]
      tension: 0.4
      fill: true
options:
  plugins:
    title:
      display: true
      text: Weekly Traffic
```
````

## Pie Chart Example

```chart
type: pie
data:
  labels: [Chrome, Firefox, Safari, Edge, Other]
  datasets:
    - data: [65, 15, 10, 7, 3]
options:
  plugins:
    title:
      display: true
      text: Browser Market Share
```

**Code:**

````yaml
```chart
type: pie
data:
  labels: [Chrome, Firefox, Safari, Edge, Other]
  datasets:
    - data: [65, 15, 10, 7, 3]
options:
  plugins:
    title:
      display: true
      text: Browser Market Share
```
````

Check out the [Examples](/examples) page for more chart types and configurations.
