# Auto Colors

The `chartjs-plugin-autocolors` plugin automatically generates colors for your chart datasets, so you don't need to specify colors manually.

## Registration

Add to `.vitepress/theme/index.ts`:

```typescript
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)
      
      const autocolorsPlugin = await import('chartjs-plugin-autocolors')
      Chart.register(autocolorsPlugin.default || autocolorsPlugin)
    }
  }
}
```

::: tip Installation
```bash
npm install chartjs-plugin-autocolors
```
:::

## Basic Usage

Enable autocolors by adding `autocolors: {}` or `autocolors: { enabled: true }` to your plugins options:

```chart
type: bar
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Dataset 1
      data: [65, 59, 80, 81, 56, 55]
    - label: Dataset 2
      data: [45, 79, 60, 91, 76, 85]
    - label: Dataset 3
      data: [35, 49, 70, 71, 46, 65]
    - label: Dataset 4
      data: [25, 39, 50, 61, 36, 45]
options:
  plugins:
    autocolors: {}
    title:
      display: true
      text: Auto Colors - Dataset Mode (Default)
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Dataset 1
      data: [65, 59, 80, 81, 56, 55]
    - label: Dataset 2
      data: [45, 79, 60, 91, 76, 85]
    - label: Dataset 3
      data: [35, 49, 70, 71, 46, 65]
    - label: Dataset 4
      data: [25, 39, 50, 61, 36, 45]
options:
  plugins:
    autocolors: {}
```
````

---

## Data Mode

In 'data' mode, each data point gets a unique color. This is recommended for Pie and Doughnut charts.

```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green, Purple, Orange, Pink]
  datasets:
    - data: [12, 19, 3, 5, 2, 3, 7]
options:
  plugins:
    autocolors:
      mode: data
    title:
      display: true
      text: Auto Colors - Data Mode
```

**Code:**

````yaml
```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green, Purple, Orange, Pink]
  datasets:
    - data: [12, 19, 3, 5, 2, 3, 7]
options:
  plugins:
    autocolors:
      mode: data
```
````

---

## Line Chart with Auto Colors

```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  datasets:
    - label: Website A
      data: [120, 190, 300, 250, 420, 380, 450]
    - label: Website B
      data: [100, 150, 280, 220, 380, 350, 400]
    - label: Website C
      data: [80, 120, 200, 180, 300, 280, 350]
    - label: Website D
      data: [60, 90, 150, 140, 220, 200, 280]
options:
  plugins:
    autocolors: {}
    title:
      display: true
      text: Multiple Line Datasets with Auto Colors
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  datasets:
    - label: Website A
      data: [120, 190, 300, 250, 420, 380, 450]
    - label: Website B
      data: [100, 150, 280, 220, 380, 350, 400]
    - label: Website C
      data: [80, 120, 200, 180, 300, 280, 350]
    - label: Website D
      data: [60, 90, 150, 140, 220, 200, 280]
options:
  plugins:
    autocolors: {}
```
````

---

## Doughnut with Auto Colors

```chart
type: doughnut
data:
  labels: [Chrome, Firefox, Safari, Edge, Opera, Other]
  datasets:
    - data: [65, 15, 10, 5, 3, 2]
options:
  plugins:
    autocolors:
      mode: data
    title:
      display: true
      text: Browser Market Share
```

**Code:**

````yaml
```chart
type: doughnut
data:
  labels: [Chrome, Firefox, Safari, Edge, Opera, Other]
  datasets:
    - data: [65, 15, 10, 5, 3, 2]
options:
  plugins:
    autocolors:
      mode: data
```
````

---

## Offset Option

Use `offset` to skip a number of colors in the generation sequence:

```chart
type: bar
data:
  labels: [A, B, C, D, E]
  datasets:
    - label: With Offset 5
      data: [40, 60, 80, 70, 50]
    - label: Dataset 2
      data: [30, 50, 70, 60, 40]
options:
  plugins:
    autocolors:
      offset: 5
    title:
      display: true
      text: Auto Colors with Offset
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [A, B, C, D, E]
  datasets:
    - label: With Offset 5
      data: [40, 60, 80, 70, 50]
    - label: Dataset 2
      data: [30, 50, 70, 60, 40]
options:
  plugins:
    autocolors:
      offset: 5
```
````

---

## Polar Area with Auto Colors

```chart
type: polarArea
data:
  labels: [Speed, Reliability, Comfort, Safety, Efficiency]
  datasets:
    - data: [11, 16, 7, 14, 10]
options:
  plugins:
    autocolors:
      mode: data
    title:
      display: true
      text: Polar Area with Auto Colors
```

**Code:**

````yaml
```chart
type: polarArea
data:
  labels: [Speed, Reliability, Comfort, Safety, Efficiency]
  datasets:
    - data: [11, 16, 7, 14, 10]
options:
  plugins:
    autocolors:
      mode: data
```
````

---

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Enable/disable the plugin |
| `mode` | string | `'dataset'` | Color mode: `'dataset'`, `'data'`, or `'label'` |
| `offset` | number | `0` | Skip N colors in the generation |
| `repeat` | number | `1` | Repeat each color N times |
| `customize` | function | - | Custom function to modify generated colors |

## Mode Descriptions

| Mode | Description | Best For |
|------|-------------|----------|
| `dataset` | One color per dataset | Bar, Line, Radar charts |
| `data` | One color per data point | Pie, Doughnut, Polar Area charts |
| `label` | Same color for datasets with same label | Grouped comparisons |

## Disabling Auto Colors

To disable autocolors for a specific chart when registered globally:

```yaml
options:
  plugins:
    autocolors:
      enabled: false
```
