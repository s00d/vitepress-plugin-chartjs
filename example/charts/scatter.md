# Scatter & Bubble Charts

Scatter and bubble charts display data points on a Cartesian coordinate system.

## Basic Scatter Chart

```chart
type: scatter
data:
  datasets:
    - label: Dataset A
      data:
        - { x: 10, y: 20 }
        - { x: 15, y: 25 }
        - { x: 20, y: 30 }
        - { x: 25, y: 35 }
        - { x: 30, y: 28 }
options:
  scales:
    x:
      type: linear
      position: bottom
```

**Code:**

````yaml
```chart
type: scatter
data:
  datasets:
    - label: Dataset A
      data:
        - { x: 10, y: 20 }
        - { x: 15, y: 25 }
        - { x: 20, y: 30 }
        - { x: 25, y: 35 }
        - { x: 30, y: 28 }
options:
  scales:
    x:
      type: linear
      position: bottom
```
````

---

## Multi-Dataset Scatter

```chart
type: scatter
data:
  datasets:
    - label: Group A
      data:
        - { x: -10, y: 0 }
        - { x: 0, y: 10 }
        - { x: 10, y: 5 }
        - { x: 5, y: 5 }
    - label: Group B
      data:
        - { x: -5, y: -5 }
        - { x: 5, y: -10 }
        - { x: 15, y: -5 }
        - { x: -15, y: 5 }
options:
  plugins:
    title:
      display: true
      text: Scatter Plot Comparison
```

**Code:**

````yaml
```chart
type: scatter
data:
  datasets:
    - label: Group A
      data:
        - { x: -10, y: 0 }
        - { x: 0, y: 10 }
        - { x: 10, y: 5 }
        - { x: 5, y: 5 }
    - label: Group B
      data:
        - { x: -5, y: -5 }
        - { x: 5, y: -10 }
        - { x: 15, y: -5 }
        - { x: -15, y: 5 }
options:
  plugins:
    title:
      display: true
      text: Scatter Plot Comparison
```
````

---

## Basic Bubble Chart

```chart
type: bubble
data:
  datasets:
    - label: Dataset 1
      data:
        - { x: 20, y: 30, r: 15 }
        - { x: 40, y: 10, r: 10 }
        - { x: 30, y: 20, r: 20 }
options:
  plugins:
    title:
      display: true
      text: Basic Bubble Chart
```

**Code:**

````yaml
```chart
type: bubble
data:
  datasets:
    - label: Dataset 1
      data:
        - { x: 20, y: 30, r: 15 }
        - { x: 40, y: 10, r: 10 }
        - { x: 30, y: 20, r: 20 }
options:
  plugins:
    title:
      display: true
      text: Basic Bubble Chart
```
````

---

## Multi-Dataset Bubble

```chart
type: bubble
data:
  datasets:
    - label: Companies A
      data:
        - { x: 10, y: 20, r: 5 }
        - { x: 20, y: 30, r: 10 }
        - { x: 30, y: 25, r: 15 }
    - label: Companies B
      data:
        - { x: 15, y: 15, r: 8 }
        - { x: 25, y: 35, r: 12 }
        - { x: 35, y: 20, r: 6 }
options:
  plugins:
    title:
      display: true
      text: Market Analysis
    legend:
      position: top
```

**Code:**

````yaml
```chart
type: bubble
data:
  datasets:
    - label: Companies A
      data:
        - { x: 10, y: 20, r: 5 }
        - { x: 20, y: 30, r: 10 }
        - { x: 30, y: 25, r: 15 }
    - label: Companies B
      data:
        - { x: 15, y: 15, r: 8 }
        - { x: 25, y: 35, r: 12 }
        - { x: 35, y: 20, r: 6 }
options:
  plugins:
    title:
      display: true
      text: Market Analysis
    legend:
      position: top
```
````

---

## Configuration Options

### Scatter Dataset Properties

| Property | Type | Description |
|----------|------|-------------|
| `data` | {x, y}[] | Data points |
| `backgroundColor` | string | Point fill |
| `borderColor` | string | Point border |
| `borderWidth` | number | Border width |
| `pointRadius` | number | Point size |
| `pointStyle` | string | Point shape |
| `showLine` | boolean | Connect points |
| `tension` | number | Line curve |

### Bubble Dataset Properties

| Property | Type | Description |
|----------|------|-------------|
| `data` | {x, y, r}[] | Points with radius |
| `backgroundColor` | string | Bubble fill |
| `borderColor` | string | Bubble border |
| `hoverRadius` | number | Hover size |
| `hitRadius` | number | Click area |

### Point Styles

Available values: `circle`, `cross`, `crossRot`, `dash`, `line`, `rect`, `rectRounded`, `rectRot`, `star`, `triangle`
