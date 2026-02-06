# Matrix Charts

Matrix charts display data in a grid format, perfect for heatmaps, correlation matrices, and calendar views.

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
      
      const matrix = await import('chartjs-chart-matrix')
      Chart.register(matrix.MatrixController, matrix.MatrixElement)
    }
  }
}
```

::: tip Installation
```bash
npm install chartjs-chart-matrix
```
:::

## Basic Matrix

```chart
type: matrix
data:
  datasets:
    - label: Basic Matrix
      data:
        - { x: 1, y: 1, v: 10 }
        - { x: 1, y: 2, v: 20 }
        - { x: 1, y: 3, v: 30 }
        - { x: 2, y: 1, v: 40 }
        - { x: 2, y: 2, v: 50 }
        - { x: 2, y: 3, v: 60 }
        - { x: 3, y: 1, v: 70 }
        - { x: 3, y: 2, v: 80 }
        - { x: 3, y: 3, v: 90 }
      backgroundColor: rgba(54, 162, 235, 0.5)
      borderColor: rgba(54, 162, 235, 1)
      borderWidth: 1
      width: 50
      height: 50
options:
  plugins:
    title:
      display: true
      text: Basic 3x3 Matrix
    legend:
      display: false
  scales:
    x:
      type: linear
      min: 0.5
      max: 3.5
      offset: false
      ticks:
        stepSize: 1
      grid:
        display: false
    y:
      type: linear
      min: 0.5
      max: 3.5
      offset: false
      ticks:
        stepSize: 1
      grid:
        display: false
```

**Code:**

````yaml
```chart
type: matrix
data:
  datasets:
    - label: Basic Matrix
      data:
        - { x: 1, y: 1, v: 10 }
        - { x: 1, y: 2, v: 20 }
        - { x: 2, y: 1, v: 40 }
        - { x: 2, y: 2, v: 50 }
      backgroundColor: rgba(54, 162, 235, 0.5)
      borderColor: rgba(54, 162, 235, 1)
      borderWidth: 1
      width: 50
      height: 50
options:
  scales:
    x:
      type: linear
      min: 0.5
      max: 3.5
    y:
      type: linear
      min: 0.5
      max: 3.5
```
````

---

## Heatmap Style

```chart
type: matrix
data:
  datasets:
    - label: Heatmap
      data:
        - { x: 1, y: 1, v: 15 }
        - { x: 1, y: 2, v: 25 }
        - { x: 1, y: 3, v: 35 }
        - { x: 1, y: 4, v: 85 }
        - { x: 2, y: 1, v: 45 }
        - { x: 2, y: 2, v: 55 }
        - { x: 2, y: 3, v: 20 }
        - { x: 2, y: 4, v: 70 }
        - { x: 3, y: 1, v: 75 }
        - { x: 3, y: 2, v: 30 }
        - { x: 3, y: 3, v: 95 }
        - { x: 3, y: 4, v: 40 }
        - { x: 4, y: 1, v: 60 }
        - { x: 4, y: 2, v: 80 }
        - { x: 4, y: 3, v: 50 }
        - { x: 4, y: 4, v: 10 }
      borderWidth: 1
      borderColor: rgba(0, 0, 0, 0.1)
      width: 60
      height: 60
options:
  plugins:
    title:
      display: true
      text: Heatmap Example
    legend:
      display: false
    tooltip:
      callbacks: {}
  scales:
    x:
      type: linear
      min: 0.5
      max: 4.5
      offset: false
      ticks:
        stepSize: 1
      grid:
        display: false
    y:
      type: linear
      min: 0.5
      max: 4.5
      offset: false
      ticks:
        stepSize: 1
      grid:
        display: false
```

**Code:**

````yaml
```chart
type: matrix
data:
  datasets:
    - label: Heatmap
      data:
        - { x: 1, y: 1, v: 15 }
        - { x: 1, y: 2, v: 25 }
        - { x: 2, y: 1, v: 45 }
        - { x: 2, y: 2, v: 55 }
        # ... more cells
      borderWidth: 1
      width: 60
      height: 60
options:
  scales:
    x:
      type: linear
      min: 0.5
      max: 4.5
    y:
      type: linear
      min: 0.5
      max: 4.5
```
````

---

## Correlation Matrix

```chart
type: matrix
data:
  labels:
    x: [A, B, C, D]
    y: [A, B, C, D]
  datasets:
    - label: Correlation
      data:
        - { x: 0, y: 0, v: 1.0 }
        - { x: 0, y: 1, v: 0.8 }
        - { x: 0, y: 2, v: 0.3 }
        - { x: 0, y: 3, v: -0.2 }
        - { x: 1, y: 0, v: 0.8 }
        - { x: 1, y: 1, v: 1.0 }
        - { x: 1, y: 2, v: 0.5 }
        - { x: 1, y: 3, v: 0.1 }
        - { x: 2, y: 0, v: 0.3 }
        - { x: 2, y: 1, v: 0.5 }
        - { x: 2, y: 2, v: 1.0 }
        - { x: 2, y: 3, v: 0.7 }
        - { x: 3, y: 0, v: -0.2 }
        - { x: 3, y: 1, v: 0.1 }
        - { x: 3, y: 2, v: 0.7 }
        - { x: 3, y: 3, v: 1.0 }
      borderWidth: 1
      borderColor: white
      width: 70
      height: 70
options:
  plugins:
    title:
      display: true
      text: Correlation Matrix
    legend:
      display: false
  scales:
    x:
      type: linear
      min: -0.5
      max: 3.5
      offset: false
      ticks:
        stepSize: 1
      grid:
        display: false
    y:
      type: linear
      min: -0.5
      max: 3.5
      offset: false
      ticks:
        stepSize: 1
      grid:
        display: false
```

**Code:**

````yaml
```chart
type: matrix
data:
  datasets:
    - label: Correlation
      data:
        - { x: 0, y: 0, v: 1.0 }
        - { x: 0, y: 1, v: 0.8 }
        - { x: 1, y: 0, v: 0.8 }
        - { x: 1, y: 1, v: 1.0 }
        # ... symmetric matrix
      borderWidth: 1
      borderColor: white
      width: 70
      height: 70
options:
  scales:
    x:
      type: linear
      min: -0.5
      max: 3.5
    y:
      type: linear
      min: -0.5
      max: 3.5
```
````

---

## Weekly Activity

```chart
type: matrix
data:
  datasets:
    - label: Activity
      data:
        - { x: 0, y: 0, v: 5 }
        - { x: 0, y: 1, v: 12 }
        - { x: 0, y: 2, v: 8 }
        - { x: 0, y: 3, v: 15 }
        - { x: 0, y: 4, v: 20 }
        - { x: 0, y: 5, v: 3 }
        - { x: 0, y: 6, v: 2 }
        - { x: 1, y: 0, v: 8 }
        - { x: 1, y: 1, v: 18 }
        - { x: 1, y: 2, v: 14 }
        - { x: 1, y: 3, v: 22 }
        - { x: 1, y: 4, v: 25 }
        - { x: 1, y: 5, v: 6 }
        - { x: 1, y: 6, v: 4 }
        - { x: 2, y: 0, v: 10 }
        - { x: 2, y: 1, v: 20 }
        - { x: 2, y: 2, v: 16 }
        - { x: 2, y: 3, v: 28 }
        - { x: 2, y: 4, v: 30 }
        - { x: 2, y: 5, v: 8 }
        - { x: 2, y: 6, v: 5 }
        - { x: 3, y: 0, v: 12 }
        - { x: 3, y: 1, v: 22 }
        - { x: 3, y: 2, v: 18 }
        - { x: 3, y: 3, v: 32 }
        - { x: 3, y: 4, v: 35 }
        - { x: 3, y: 5, v: 10 }
        - { x: 3, y: 6, v: 7 }
      backgroundColor: rgba(75, 192, 192, 0.6)
      borderColor: rgba(75, 192, 192, 1)
      borderWidth: 1
      borderRadius: 4
      width: 40
      height: 40
options:
  plugins:
    title:
      display: true
      text: Weekly Activity (4 weeks)
    legend:
      display: false
  scales:
    x:
      type: linear
      position: top
      min: -0.5
      max: 3.5
      offset: false
      ticks:
        stepSize: 1
      grid:
        display: false
      title:
        display: true
        text: Week
    y:
      type: linear
      min: -0.5
      max: 6.5
      offset: false
      reverse: true
      ticks:
        stepSize: 1
      grid:
        display: false
      title:
        display: true
        text: Day
```

**Code:**

````yaml
```chart
type: matrix
data:
  datasets:
    - label: Activity
      data:
        - { x: 0, y: 0, v: 5 }   # Week 0, Day 0 (Mon)
        - { x: 0, y: 1, v: 12 }  # Week 0, Day 1 (Tue)
        # ... more data
      backgroundColor: rgba(75, 192, 192, 0.6)
      borderRadius: 4
      width: 40
      height: 40
options:
  scales:
    x:
      type: linear
      position: top
      title:
        display: true
        text: Week
    y:
      type: linear
      reverse: true
      title:
        display: true
        text: Day
```
````

---

## Configuration Reference

### Data Format

Each data point requires `x`, `y` coordinates and optionally a value `v`:

```yaml
data:
  - { x: 1, y: 1, v: 100 }
  - { x: 1, y: 2, v: 200 }
```

### Cell Sizing

```yaml
datasets:
  - width: 50        # Cell width in pixels
    height: 50       # Cell height in pixels
    # Or use functions for responsive sizing:
    # width: ({chart}) => chart.chartArea.width / 3
```

### Styling

```yaml
datasets:
  - backgroundColor: rgba(54, 162, 235, 0.5)
    borderColor: rgba(54, 162, 235, 1)
    borderWidth: 1
    borderRadius: 4   # Rounded corners
```

### Scales

```yaml
options:
  scales:
    x:
      type: linear
      min: 0.5
      max: 5.5
      offset: false
      ticks:
        stepSize: 1
      grid:
        display: false
    y:
      type: linear
      min: 0.5
      max: 5.5
      reverse: true    # Optional: flip Y axis
```

---

## Resources

- [chartjs-chart-matrix Documentation](https://chartjs-chart-matrix.pages.dev/)
- [GitHub Repository](https://github.com/kurkle/chartjs-chart-matrix)
