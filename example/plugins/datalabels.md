# Data Labels Plugin

Display labels directly on chart elements.

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

## Configuration Reference

### Basic Options

```yaml
options:
  plugins:
    datalabels:
      display: true              # true, false, or 'auto'
      color: white               # Label text color
      backgroundColor: null      # Label background
      borderColor: null          # Label border
      borderRadius: 4            # Border radius
      borderWidth: 0             # Border width
      padding: 4                 # Label padding
      opacity: 1                 # Label opacity
```

### Font Options

```yaml
font:
  family: sans-serif
  size: 12
  style: normal               # normal, italic, oblique
  weight: normal              # normal, bold, or number
  lineHeight: 1.2
```

### Positioning

```yaml
anchor: center                # start, center, end
align: center                 # start, end, center, top, bottom, left, right
offset: 4                     # Distance from anchor point
rotation: 0                   # Label rotation in degrees
```

## Enabling Globally

In your VitePress config:

```ts
md.use(chartjs, {
  enableDatalabels: true,  // Enable for all charts
})
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
