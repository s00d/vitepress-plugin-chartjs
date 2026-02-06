# Data Labels Plugin

Display labels directly on chart elements using `chartjs-plugin-datalabels`.

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
      
      const datalabelsPlugin = (await import('chartjs-plugin-datalabels')).default
      Chart.register(datalabelsPlugin)
    }
  }
}
```

::: tip Installation
```bash
npm install chartjs-plugin-datalabels
```
:::

## Basic Labels

```chart
type: bar
data:
  labels: [Jan, Feb, Mar, Apr, May]
  datasets:
    - label: Sales
      data: [65, 59, 80, 81, 56]
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Jan, Feb, Mar, Apr, May]
  datasets:
    - label: Sales
      data: [65, 59, 80, 81, 56]
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
```
````

---

## Labels with Formatting

```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: Revenue ($K)
      data: [150, 200, 180, 250]
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
        size: 14
      anchor: center
      align: center
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: Revenue ($K)
      data: [150, 200, 180, 250]
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
        size: 14
      anchor: center
      align: center
```
````

---

## Pie Chart Labels

```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green]
  datasets:
    - data: [30, 25, 25, 20]
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
        size: 14
```

**Code:**

````yaml
```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green]
  datasets:
    - data: [30, 25, 25, 20]
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
        size: 14
```
````

---

## Label Positioning

```chart
type: bar
data:
  labels: [A, B, C, D, E]
  datasets:
    - label: Values
      data: [40, 60, 80, 70, 50]
options:
  plugins:
    datalabels:
      display: true
      anchor: end
      align: top
      offset: 4
      color: black
      font:
        weight: bold
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [A, B, C, D, E]
  datasets:
    - label: Values
      data: [40, 60, 80, 70, 50]
options:
  plugins:
    datalabels:
      display: true
      anchor: end
      align: top
      offset: 4
      color: black
      font:
        weight: bold
```
````

---

## Line Chart Labels

```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri]
  datasets:
    - label: Orders
      data: [12, 19, 15, 25, 22]
      tension: 0.3
options:
  plugins:
    datalabels:
      display: true
      backgroundColor: rgba(54, 162, 235, 0.8)
      borderRadius: 4
      color: white
      padding: 4
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri]
  datasets:
    - label: Orders
      data: [12, 19, 15, 25, 22]
      tension: 0.3
options:
  plugins:
    datalabels:
      display: true
      backgroundColor: rgba(54, 162, 235, 0.8)
      borderRadius: 4
      color: white
      padding: 4
```
````

---

## Doughnut with Percentage Labels

```chart
type: doughnut
data:
  labels: [Chrome, Firefox, Safari, Edge, Other]
  datasets:
    - data: [65, 15, 10, 7, 3]
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
        size: 12
      anchor: center
      align: center
    title:
      display: true
      text: Browser Market Share
```

**Code:**

````yaml
```chart
type: doughnut
data:
  labels: [Chrome, Firefox, Safari, Edge, Other]
  datasets:
    - data: [65, 15, 10, 7, 3]
options:
  plugins:
    datalabels:
      display: true
      color: white
      font:
        weight: bold
```
````

---

## Horizontal Bar with Labels

```chart
type: bar
data:
  labels: [Product A, Product B, Product C, Product D]
  datasets:
    - label: Sales
      data: [120, 190, 150, 80]
options:
  indexAxis: y
  plugins:
    datalabels:
      display: true
      anchor: end
      align: right
      offset: 4
      color: black
      font:
        weight: bold
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Product A, Product B, Product C, Product D]
  datasets:
    - label: Sales
      data: [120, 190, 150, 80]
options:
  indexAxis: y
  plugins:
    datalabels:
      display: true
      anchor: end
      align: right
      offset: 4
```
````

---

## Per-Dataset Configuration

You can configure datalabels differently for each dataset:

```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: 2023
      data: [50, 60, 70, 80]
      datalabels:
        color: white
        anchor: center
    - label: 2024
      data: [55, 70, 85, 95]
      datalabels:
        color: black
        anchor: end
        align: top
options:
  plugins:
    datalabels:
      display: true
      font:
        weight: bold
    title:
      display: true
      text: Per-Dataset Labels Configuration
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: 2023
      data: [50, 60, 70, 80]
      datalabels:
        color: white
        anchor: center
    - label: 2024
      data: [55, 70, 85, 95]
      datalabels:
        color: black
        anchor: end
        align: top
options:
  plugins:
    datalabels:
      display: true
```
````

---

## Configuration Levels

Plugin options can be set at 3 different levels (evaluated with this priority):

1. **Per dataset**: `dataset.datalabels.*` (highest priority)
2. **Per chart**: `options.plugins.datalabels.*`
3. **Globally**: Via VitePress config (lowest priority)

```yaml
data:
  datasets:
    - label: Dataset 1
      data: [10, 20, 30]
      datalabels:           # Per-dataset options (highest priority)
        color: '#FFCE56'
options:
  plugins:
    datalabels:             # Per-chart options
      color: '#36A2EB'
```

---

## Configuration Reference

### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `display` | boolean/string | `true` | Show labels: `true`, `false`, or `'auto'` |
| `color` | string | `'#666'` | Label text color |
| `backgroundColor` | string | `null` | Label background color |
| `borderColor` | string | `null` | Label border color |
| `borderRadius` | number | `0` | Border corner radius |
| `borderWidth` | number | `0` | Border width |
| `padding` | number/object | `4` | Label padding |
| `opacity` | number | `1` | Label opacity (0-1) |

### Font Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `font.family` | string | `'sans-serif'` | Font family |
| `font.size` | number | `12` | Font size in pixels |
| `font.style` | string | `'normal'` | Font style: `'normal'`, `'italic'`, `'oblique'` |
| `font.weight` | string/number | `'normal'` | Font weight: `'normal'`, `'bold'`, or number |
| `font.lineHeight` | number | `1.2` | Line height |

### Positioning Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `anchor` | string | `'center'` | Anchor point: `'start'`, `'center'`, `'end'` |
| `align` | string | `'center'` | Alignment: `'start'`, `'end'`, `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'` |
| `offset` | number | `4` | Distance from anchor point in pixels |
| `rotation` | number | `0` | Label rotation in degrees |
| `clamp` | boolean | `false` | Clamp label to chart area |
| `clip` | boolean | `false` | Clip label to chart area |

### Anchor & Align Visualization

```
                  align: 'top'
                      ↑
                      |
align: 'left' ← [ anchor ] → align: 'right'
                      |
                      ↓
                 align: 'bottom'
```

---

## Enabling Globally

In your VitePress config:

```ts
// .vitepress/config.mts
import { withChartjs } from 'vitepress-plugin-chartjs'

export default withChartjs(
  defineConfig({
    chartjs: {
      enableDatalabels: true,  // Enable for all charts
    },
  })
)
```

Or per-chart:

```yaml
options:
  plugins:
    datalabels:
      display: true
      # ... other options
```

To disable for a specific chart when globally enabled:

```yaml
options:
  plugins:
    datalabels: false
```

---

## Resources

- [Official Documentation](https://chartjs-plugin-datalabels.netlify.app/)
- [GitHub Repository](https://github.com/chartjs/chartjs-plugin-datalabels)
- [Options Reference](https://chartjs-plugin-datalabels.netlify.app/guide/options.html)
