# Pie & Doughnut Charts

Pie and doughnut charts show proportional data as slices of a circle.

## Basic Pie Chart

```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green, Purple]
  datasets:
    - data: [300, 50, 100, 40, 120]
```

**Code:**

````yaml
```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green, Purple]
  datasets:
    - data: [300, 50, 100, 40, 120]
```
````

---

## Doughnut Chart

```chart
type: doughnut
data:
  labels: [Desktop, Mobile, Tablet, Other]
  datasets:
    - data: [55, 30, 10, 5]
options:
  plugins:
    title:
      display: true
      text: Device Distribution
```

**Code:**

````yaml
```chart
type: doughnut
data:
  labels: [Desktop, Mobile, Tablet, Other]
  datasets:
    - data: [55, 30, 10, 5]
options:
  plugins:
    title:
      display: true
      text: Device Distribution
```
````

---

## Custom Cutout (Doughnut)

```chart
type: doughnut
data:
  labels: [Complete, Remaining]
  datasets:
    - data: [75, 25]
      backgroundColor:
        - rgba(75, 192, 192, 0.8)
        - rgba(200, 200, 200, 0.3)
options:
  cutout: "80%"
  plugins:
    title:
      display: true
      text: Progress (75%)
```

**Code:**

````yaml
```chart
type: doughnut
data:
  labels: [Complete, Remaining]
  datasets:
    - data: [75, 25]
      backgroundColor:
        - rgba(75, 192, 192, 0.8)
        - rgba(200, 200, 200, 0.3)
options:
  cutout: "80%"
  plugins:
    title:
      display: true
      text: Progress (75%)
```
````

---

## Semi-Circle (Gauge)

```chart
type: doughnut
data:
  labels: [Used, Free]
  datasets:
    - data: [60, 40]
      backgroundColor:
        - rgba(255, 99, 132, 0.8)
        - rgba(200, 200, 200, 0.3)
options:
  circumference: 180
  rotation: -90
  cutout: "70%"
  plugins:
    title:
      display: true
      text: Storage Usage
```

**Code:**

````yaml
```chart
type: doughnut
data:
  labels: [Used, Free]
  datasets:
    - data: [60, 40]
      backgroundColor:
        - rgba(255, 99, 132, 0.8)
        - rgba(200, 200, 200, 0.3)
options:
  circumference: 180
  rotation: -90
  cutout: "70%"
  plugins:
    title:
      display: true
      text: Storage Usage
```
````

---

## Custom Colors

```chart
type: pie
data:
  labels: [Chrome, Firefox, Safari, Edge, Other]
  datasets:
    - data: [65, 15, 10, 7, 3]
      backgroundColor:
        - "#4285F4"
        - "#FF7139"
        - "#00D1B2"
        - "#0078D4"
        - "#888888"
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
      backgroundColor:
        - "#4285F4"
        - "#FF7139"
        - "#00D1B2"
        - "#0078D4"
        - "#888888"
options:
  plugins:
    title:
      display: true
      text: Browser Market Share
```
````

---

## Configuration Options

### Dataset Properties

| Property | Type | Description |
|----------|------|-------------|
| `data` | number[] | Slice values |
| `backgroundColor` | string[] | Slice colors |
| `borderColor` | string/string[] | Border colors |
| `borderWidth` | number | Border width |
| `borderAlign` | string | Border alignment |
| `hoverOffset` | number | Hover expansion |
| `offset` | number/number[] | Slice offset |
| `rotation` | number | Starting angle |
| `circumference` | number | Arc angle (degrees) |
| `spacing` | number | Space between slices |

### Doughnut Specific

| Property | Type | Description |
|----------|------|-------------|
| `cutout` | string/number | Inner radius (e.g., "50%") |

### Chart Options

```yaml
options:
  rotation: -90          # Start angle (degrees)
  circumference: 180     # Arc sweep (degrees)
  cutout: "50%"          # Doughnut hole size
```
