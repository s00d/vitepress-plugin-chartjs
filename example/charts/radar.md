# Radar Charts

Radar charts display multivariate data on axes starting from the same point.

## Basic Radar Chart

```chart
type: radar
data:
  labels: [Eating, Drinking, Sleeping, Designing, Coding, Running]
  datasets:
    - label: Person A
      data: [65, 59, 90, 81, 56, 55]
options:
  scales:
    r:
      beginAtZero: true
```

**Code:**

````yaml
```chart
type: radar
data:
  labels: [Eating, Drinking, Sleeping, Designing, Coding, Running]
  datasets:
    - label: Person A
      data: [65, 59, 90, 81, 56, 55]
options:
  scales:
    r:
      beginAtZero: true
```
````

---

## Multi-Dataset Comparison

```chart
type: radar
data:
  labels: [Speed, Reliability, Comfort, Safety, Efficiency]
  datasets:
    - label: Car A
      data: [85, 90, 80, 95, 75]
    - label: Car B
      data: [70, 85, 95, 80, 90]
options:
  plugins:
    title:
      display: true
      text: Vehicle Comparison
```

**Code:**

````yaml
```chart
type: radar
data:
  labels: [Speed, Reliability, Comfort, Safety, Efficiency]
  datasets:
    - label: Car A
      data: [85, 90, 80, 95, 75]
    - label: Car B
      data: [70, 85, 95, 80, 90]
options:
  plugins:
    title:
      display: true
      text: Vehicle Comparison
```
````

---

## Filled Radar

```chart
type: radar
data:
  labels: [HTML, CSS, JavaScript, Python, SQL, Git]
  datasets:
    - label: Skills
      data: [90, 85, 80, 70, 75, 65]
      fill: true
      backgroundColor: rgba(54, 162, 235, 0.3)
options:
  plugins:
    title:
      display: true
      text: Developer Skills
```

**Code:**

````yaml
```chart
type: radar
data:
  labels: [HTML, CSS, JavaScript, Python, SQL, Git]
  datasets:
    - label: Skills
      data: [90, 85, 80, 70, 75, 65]
      fill: true
      backgroundColor: rgba(54, 162, 235, 0.3)
options:
  plugins:
    title:
      display: true
      text: Developer Skills
```
````

---

## Custom Scale

```chart
type: radar
data:
  labels: [Str, Dex, Con, Int, Wis, Cha]
  datasets:
    - label: Character Stats
      data: [16, 14, 12, 10, 13, 8]
      fill: true
options:
  scales:
    r:
      min: 0
      max: 20
      ticks:
        stepSize: 5
      pointLabels:
        font:
          size: 14
  plugins:
    title:
      display: true
      text: RPG Character Stats
```

**Code:**

````yaml
```chart
type: radar
data:
  labels: [Str, Dex, Con, Int, Wis, Cha]
  datasets:
    - label: Character Stats
      data: [16, 14, 12, 10, 13, 8]
      fill: true
options:
  scales:
    r:
      min: 0
      max: 20
      ticks:
        stepSize: 5
      pointLabels:
        font:
          size: 14
  plugins:
    title:
      display: true
      text: RPG Character Stats
```
````

---

## Configuration Options

### Dataset Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Dataset label |
| `data` | number[] | Data values |
| `backgroundColor` | string | Fill color |
| `borderColor` | string | Line color |
| `borderWidth` | number | Line width |
| `fill` | boolean | Fill the area |
| `tension` | number | Line smoothness |
| `pointRadius` | number | Point size |
| `pointBackgroundColor` | string | Point fill |
| `pointBorderColor` | string | Point border |

### Scale Options (r)

```yaml
options:
  scales:
    r:
      beginAtZero: true
      min: 0
      max: 100
      ticks:
        stepSize: 20
        display: true
      grid:
        display: true
        color: rgba(0, 0, 0, 0.1)
      angleLines:
        display: true
        color: rgba(0, 0, 0, 0.1)
      pointLabels:
        display: true
        font:
          size: 12
```
