# Polar Area Charts

Polar area charts display data as sectors with equal angles but varying radii.

## Basic Polar Area

```chart
type: polarArea
data:
  labels: [Red, Green, Yellow, Grey, Blue]
  datasets:
    - data: [11, 16, 7, 3, 14]
```

**Code:**

````yaml
```chart
type: polarArea
data:
  labels: [Red, Green, Yellow, Grey, Blue]
  datasets:
    - data: [11, 16, 7, 3, 14]
```
````

---

## Custom Colors

```chart
type: polarArea
data:
  labels: [North, South, East, West, Center]
  datasets:
    - data: [25, 20, 30, 15, 10]
      backgroundColor:
        - rgba(255, 99, 132, 0.7)
        - rgba(75, 192, 192, 0.7)
        - rgba(255, 206, 86, 0.7)
        - rgba(54, 162, 235, 0.7)
        - rgba(153, 102, 255, 0.7)
options:
  plugins:
    title:
      display: true
      text: Regional Distribution
```

**Code:**

````yaml
```chart
type: polarArea
data:
  labels: [North, South, East, West, Center]
  datasets:
    - data: [25, 20, 30, 15, 10]
      backgroundColor:
        - rgba(255, 99, 132, 0.7)
        - rgba(75, 192, 192, 0.7)
        - rgba(255, 206, 86, 0.7)
        - rgba(54, 162, 235, 0.7)
        - rgba(153, 102, 255, 0.7)
options:
  plugins:
    title:
      display: true
      text: Regional Distribution
```
````

---

## With Legend

```chart
type: polarArea
data:
  labels: [Download, Upload, Latency, Uptime, Reliability]
  datasets:
    - data: [95, 80, 70, 99, 95]
options:
  plugins:
    title:
      display: true
      text: Network Performance
    legend:
      position: right
```

**Code:**

````yaml
```chart
type: polarArea
data:
  labels: [Download, Upload, Latency, Uptime, Reliability]
  datasets:
    - data: [95, 80, 70, 99, 95]
options:
  plugins:
    title:
      display: true
      text: Network Performance
    legend:
      position: right
```
````

---

## Configuration Options

### Dataset Properties

| Property | Type | Description |
|----------|------|-------------|
| `data` | number[] | Sector values |
| `backgroundColor` | string[] | Sector colors |
| `borderColor` | string[] | Border colors |
| `borderWidth` | number | Border width |
| `borderAlign` | string | Border alignment |
| `hoverBackgroundColor` | string[] | Hover colors |
| `hoverBorderColor` | string[] | Hover borders |
| `circular` | boolean | Circular sectors |

### Scale Options

```yaml
options:
  scales:
    r:
      min: 0
      max: 100
      beginAtZero: true
      ticks:
        display: true
        stepSize: 20
      grid:
        display: true
      angleLines:
        display: true
```
