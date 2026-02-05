# Line Charts

Line charts are used to display data points connected by straight or curved lines.

## Basic Line Chart

```chart
type: line
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Sales
      data: [65, 59, 80, 81, 56, 55]
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Sales
      data: [65, 59, 80, 81, 56, 55]
```
````

---

## Multi-Dataset Line Chart

```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  datasets:
    - label: This Week
      data: [120, 190, 300, 250, 420, 380, 450]
    - label: Last Week
      data: [100, 150, 280, 220, 380, 350, 400]
options:
  plugins:
    title:
      display: true
      text: Weekly Comparison
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  datasets:
    - label: This Week
      data: [120, 190, 300, 250, 420, 380, 450]
    - label: Last Week
      data: [100, 150, 280, 220, 380, 350, 400]
options:
  plugins:
    title:
      display: true
      text: Weekly Comparison
```
````

---

## Curved Line (Tension)

```chart
type: line
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: Revenue
      data: [100, 150, 180, 220]
      tension: 0.4
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: Revenue
      data: [100, 150, 180, 220]
      tension: 0.4
```
````

---

## Area Chart (Filled)

```chart
type: line
data:
  labels: [2020, 2021, 2022, 2023, 2024]
  datasets:
    - label: Users
      data: [1000, 2500, 5000, 8000, 12000]
      fill: true
      backgroundColor: rgba(54, 162, 235, 0.3)
      tension: 0.4
options:
  scales:
    y:
      beginAtZero: true
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [2020, 2021, 2022, 2023, 2024]
  datasets:
    - label: Users
      data: [1000, 2500, 5000, 8000, 12000]
      fill: true
      backgroundColor: rgba(54, 162, 235, 0.3)
      tension: 0.4
options:
  scales:
    y:
      beginAtZero: true
```
````

---

## Stacked Area Chart

```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Desktop
      data: [100, 120, 115, 134, 168, 132]
      fill: true
    - label: Mobile
      data: [50, 65, 70, 80, 95, 100]
      fill: true
    - label: Tablet
      data: [20, 25, 30, 28, 35, 40]
      fill: true
options:
  plugins:
    title:
      display: true
      text: Traffic by Device
  scales:
    y:
      stacked: true
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Desktop
      data: [100, 120, 115, 134, 168, 132]
      fill: true
    - label: Mobile
      data: [50, 65, 70, 80, 95, 100]
      fill: true
    - label: Tablet
      data: [20, 25, 30, 28, 35, 40]
      fill: true
options:
  plugins:
    title:
      display: true
      text: Traffic by Device
  scales:
    y:
      stacked: true
```
````

---

## Stepped Line

```chart
type: line
data:
  labels: [Day 1, Day 2, Day 3, Day 4, Day 5]
  datasets:
    - label: Price
      data: [100, 100, 120, 120, 150]
      stepped: true
      borderColor: rgba(255, 99, 132, 1)
      backgroundColor: rgba(255, 99, 132, 0.2)
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Day 1, Day 2, Day 3, Day 4, Day 5]
  datasets:
    - label: Price
      data: [100, 100, 120, 120, 150]
      stepped: true
      borderColor: rgba(255, 99, 132, 1)
      backgroundColor: rgba(255, 99, 132, 0.2)
```
````

---

## Point Styles

```chart
type: line
data:
  labels: [A, B, C, D, E]
  datasets:
    - label: Circle
      data: [20, 30, 25, 35, 40]
      pointStyle: circle
      pointRadius: 8
    - label: Triangle
      data: [15, 25, 30, 28, 35]
      pointStyle: triangle
      pointRadius: 8
    - label: Rect
      data: [10, 20, 22, 25, 30]
      pointStyle: rect
      pointRadius: 8
options:
  plugins:
    title:
      display: true
      text: Different Point Styles
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [A, B, C, D, E]
  datasets:
    - label: Circle
      data: [20, 30, 25, 35, 40]
      pointStyle: circle
      pointRadius: 8
    - label: Triangle
      data: [15, 25, 30, 28, 35]
      pointStyle: triangle
      pointRadius: 8
    - label: Rect
      data: [10, 20, 22, 25, 30]
      pointStyle: rect
      pointRadius: 8
options:
  plugins:
    title:
      display: true
      text: Different Point Styles
```
````

---

## Configuration Options

### Dataset Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Dataset label |
| `data` | number[] | Data points |
| `backgroundColor` | string | Fill color |
| `borderColor` | string | Line color |
| `borderWidth` | number | Line width |
| `borderDash` | number[] | Dash pattern [dash, gap] |
| `tension` | number | Line curvature (0-1) |
| `fill` | boolean/string | Fill area under line |
| `pointRadius` | number | Point size |
| `pointStyle` | string | Point shape |
| `stepped` | boolean/string | Stepped line mode |
| `spanGaps` | boolean | Connect across null values |

### Scale Options

```yaml
options:
  scales:
    x:
      type: category
      title:
        display: true
        text: X Axis Label
    y:
      type: linear
      beginAtZero: true
      title:
        display: true
        text: Y Axis Label
```
