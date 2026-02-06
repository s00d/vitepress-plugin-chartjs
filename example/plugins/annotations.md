# Annotations Plugin

Add lines, boxes, labels, and other annotations to charts.

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
      
      const annotationPlugin = (await import('chartjs-plugin-annotation')).default
      Chart.register(annotationPlugin)
    }
  }
}
```

::: tip Installation
```bash
npm install chartjs-plugin-annotation
```
:::

## Line Annotation

```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Sales
      data: [65, 59, 80, 81, 56, 72]
options:
  plugins:
    annotation:
      annotations:
        line1:
          type: line
          yMin: 70
          yMax: 70
          borderColor: rgba(255, 99, 132, 1)
          borderWidth: 2
          borderDash: [5, 5]
          label:
            display: true
            content: Target
            position: end
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Sales
      data: [65, 59, 80, 81, 56, 72]
options:
  plugins:
    annotation:
      annotations:
        line1:
          type: line
          yMin: 70
          yMax: 70
          borderColor: rgba(255, 99, 132, 1)
          borderWidth: 2
          borderDash: [5, 5]
          label:
            display: true
            content: Target
            position: end
```
````

---

## Box Annotation

```chart
type: line
data:
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  datasets:
    - label: Data
      data: [20, 35, 40, 55, 45, 60, 70, 65, 80, 75]
options:
  plugins:
    annotation:
      annotations:
        box1:
          type: box
          xMin: 3
          xMax: 7
          yMin: 40
          yMax: 70
          backgroundColor: rgba(255, 99, 132, 0.2)
          borderColor: rgba(255, 99, 132, 1)
          borderWidth: 1
          label:
            display: true
            content: Target Zone
            position:
              x: center
              y: center
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  datasets:
    - label: Data
      data: [20, 35, 40, 55, 45, 60, 70, 65, 80, 75]
options:
  plugins:
    annotation:
      annotations:
        box1:
          type: box
          xMin: 3
          xMax: 7
          yMin: 40
          yMax: 70
          backgroundColor: rgba(255, 99, 132, 0.2)
          borderColor: rgba(255, 99, 132, 1)
          borderWidth: 1
          label:
            display: true
            content: Target Zone
            position:
              x: center
              y: center
```
````

---

## Multiple Annotations

```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep]
  datasets:
    - label: Revenue
      data: [30, 45, 55, 60, 50, 70, 85, 75, 90]
      tension: 0.3
options:
  plugins:
    annotation:
      annotations:
        target:
          type: line
          yMin: 60
          yMax: 60
          borderColor: green
          borderDash: [5, 5]
          label:
            display: true
            content: Target
        warning:
          type: line
          yMin: 40
          yMax: 40
          borderColor: orange
          borderDash: [5, 5]
          label:
            display: true
            content: Warning
        highlight:
          type: box
          xMin: 5
          xMax: 8
          backgroundColor: rgba(75, 192, 192, 0.2)
          label:
            display: true
            content: Growth Period
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep]
  datasets:
    - label: Revenue
      data: [30, 45, 55, 60, 50, 70, 85, 75, 90]
      tension: 0.3
options:
  plugins:
    annotation:
      annotations:
        target:
          type: line
          yMin: 60
          yMax: 60
          borderColor: green
          borderDash: [5, 5]
          label:
            display: true
            content: Target
        warning:
          type: line
          yMin: 40
          yMax: 40
          borderColor: orange
          borderDash: [5, 5]
          label:
            display: true
            content: Warning
        highlight:
          type: box
          xMin: 5
          xMax: 8
          backgroundColor: rgba(75, 192, 192, 0.2)
          label:
            display: true
            content: Growth Period
```
````

---

## Configuration Reference

### Line Annotation

```yaml
type: line
xMin: 0                       # Start x (optional)
xMax: 5                       # End x (optional)
yMin: 50                      # Start y (optional)
yMax: 50                      # End y (for horizontal)
borderColor: red
borderWidth: 2
borderDash: [5, 5]            # Dash pattern
label:
  display: true
  content: Label Text
  position: center            # start, center, end
  rotation: 0
```

### Box Annotation

```yaml
type: box
xMin: 1
xMax: 4
yMin: 20
yMax: 80
backgroundColor: rgba(0,0,0,0.1)
borderColor: black
borderWidth: 1
borderRadius: 4
```

### Point Annotation

```yaml
type: point
xValue: 3
yValue: 50
radius: 10
backgroundColor: red
pointStyle: circle            # circle, cross, star, triangle, etc.
```

### Label Annotation

```yaml
type: label
xValue: 3
yValue: 50
content: ["Line 1", "Line 2"]
backgroundColor: black
color: white
font:
  size: 12
  weight: bold
padding: 8
borderRadius: 4
```
