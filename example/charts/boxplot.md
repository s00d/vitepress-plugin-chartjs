# Box Plot & Violin Charts

Statistical charts for displaying data distribution.

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
      
      const boxplot = await import('@sgratzl/chartjs-chart-boxplot')
      Chart.register(
        boxplot.BoxPlotController,
        boxplot.BoxAndWiskers,
        boxplot.ViolinController,
        boxplot.Violin
      )
    }
  }
}
```

::: tip Installation
```bash
npm install @sgratzl/chartjs-chart-boxplot
```
:::

## Box Plot

```chart
type: boxplot
data:
  labels: [Group A, Group B, Group C]
  datasets:
    - label: Dataset 1
      data:
        - [10, 15, 20, 25, 30, 35, 40, 45, 50]
        - [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
        - [15, 20, 25, 30, 35, 40, 45]
options:
  plugins:
    title:
      display: true
      text: Box Plot Example
```

**Code:**

````yaml
```chart
type: boxplot
data:
  labels: [Group A, Group B, Group C]
  datasets:
    - label: Dataset 1
      data:
        - [10, 15, 20, 25, 30, 35, 40, 45, 50]
        - [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
        - [15, 20, 25, 30, 35, 40, 45]
options:
  plugins:
    title:
      display: true
      text: Box Plot Example
```
````

---

## Violin Plot

```chart
type: violin
data:
  labels: [Category 1, Category 2, Category 3]
  datasets:
    - label: Distribution
      data:
        - [12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40]
        - [8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]
        - [20, 22, 24, 26, 28, 30, 32, 34, 36]
options:
  plugins:
    title:
      display: true
      text: Violin Plot Example
```

**Code:**

````yaml
```chart
type: violin
data:
  labels: [Category 1, Category 2, Category 3]
  datasets:
    - label: Distribution
      data:
        - [12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40]
        - [8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]
        - [20, 22, 24, 26, 28, 30, 32, 34, 36]
options:
  plugins:
    title:
      display: true
      text: Violin Plot Example
```
````

---

## Multiple Datasets

```chart
type: boxplot
data:
  labels: [Jan, Feb, Mar, Apr, May]
  datasets:
    - label: Sales Team A
      data:
        - [100, 120, 130, 140, 150, 160, 180]
        - [90, 110, 125, 135, 145, 155, 170]
        - [110, 130, 145, 155, 165, 175, 190]
        - [95, 115, 130, 140, 150, 160, 175]
        - [105, 125, 140, 150, 160, 170, 185]
    - label: Sales Team B
      data:
        - [80, 95, 110, 120, 130, 140, 155]
        - [85, 100, 115, 125, 135, 145, 160]
        - [90, 105, 120, 130, 140, 150, 165]
        - [75, 90, 105, 115, 125, 135, 150]
        - [95, 110, 125, 135, 145, 155, 170]
options:
  plugins:
    title:
      display: true
      text: Monthly Sales Comparison
```

**Code:**

````yaml
```chart
type: boxplot
data:
  labels: [Jan, Feb, Mar, Apr, May]
  datasets:
    - label: Sales Team A
      data:
        - [100, 120, 130, 140, 150, 160, 180]
        - [90, 110, 125, 135, 145, 155, 170]
        - [110, 130, 145, 155, 165, 175, 190]
        - [95, 115, 130, 140, 150, 160, 175]
        - [105, 125, 140, 150, 160, 170, 185]
    - label: Sales Team B
      data:
        - [80, 95, 110, 120, 130, 140, 155]
        - [85, 100, 115, 125, 135, 145, 160]
        - [90, 105, 120, 130, 140, 150, 165]
        - [75, 90, 105, 115, 125, 135, 150]
        - [95, 110, 125, 135, 145, 155, 170]
options:
  plugins:
    title:
      display: true
      text: Monthly Sales Comparison
```
````

---

## Installation

To use box plot and violin charts, install the plugin:

```bash
npm install @sgratzl/chartjs-chart-boxplot
```

The plugin will be automatically loaded when you use `type: boxplot` or `type: violin`.

## Data Format

Box plot and violin charts accept arrays of numbers. The statistics (min, max, median, quartiles) are calculated automatically:

```yaml
data:
  labels: [Group 1, Group 2]
  datasets:
    - label: My Data
      data:
        - [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  # Raw numbers for Group 1
        - [2, 4, 6, 8, 10, 12, 14, 16]     # Raw numbers for Group 2
```
