# Zoom Plugin

The zoom plugin allows users to pan and zoom charts interactively.

## Basic Zoom

```chart
type: line
data:
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  datasets:
    - label: Data
      data: [65, 59, 80, 81, 56, 55, 40, 70, 75, 60, 85, 90]
      tension: 0.3
options:
  plugins:
    title:
      display: true
      text: Scroll to Zoom, Drag to Pan
    zoom:
      zoom:
        wheel:
          enabled: true
        pinch:
          enabled: true
        mode: xy
      pan:
        enabled: true
        mode: xy
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  datasets:
    - label: Data
      data: [65, 59, 80, 81, 56, 55, 40, 70, 75, 60, 85, 90]
      tension: 0.3
options:
  plugins:
    title:
      display: true
      text: Scroll to Zoom, Drag to Pan
    zoom:
      zoom:
        wheel:
          enabled: true
        pinch:
          enabled: true
        mode: xy
      pan:
        enabled: true
        mode: xy
```
````

---

## Zoom X-Axis Only

```chart
type: bar
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
  datasets:
    - label: Sales
      data: [120, 150, 180, 200, 170, 160, 190, 220, 250, 230, 280, 300]
options:
  plugins:
    title:
      display: true
      text: Horizontal Zoom Only
    zoom:
      zoom:
        wheel:
          enabled: true
        mode: x
      pan:
        enabled: true
        mode: x
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
  datasets:
    - label: Sales
      data: [120, 150, 180, 200, 170, 160, 190, 220, 250, 230, 280, 300]
options:
  plugins:
    title:
      display: true
      text: Horizontal Zoom Only
    zoom:
      zoom:
        wheel:
          enabled: true
        mode: x
      pan:
        enabled: true
        mode: x
```
````

---

## Drag to Zoom

```chart
type: scatter
data:
  datasets:
    - label: Points
      data:
        - { x: 10, y: 20 }
        - { x: 15, y: 35 }
        - { x: 25, y: 15 }
        - { x: 30, y: 45 }
        - { x: 40, y: 30 }
        - { x: 50, y: 55 }
        - { x: 60, y: 40 }
        - { x: 70, y: 65 }
options:
  plugins:
    title:
      display: true
      text: Drag to Select Zoom Area
    zoom:
      zoom:
        drag:
          enabled: true
          backgroundColor: rgba(54, 162, 235, 0.3)
          borderColor: rgba(54, 162, 235, 1)
          borderWidth: 1
        mode: xy
```

**Code:**

````yaml
```chart
type: scatter
data:
  datasets:
    - label: Points
      data:
        - { x: 10, y: 20 }
        - { x: 15, y: 35 }
        - { x: 25, y: 15 }
        - { x: 30, y: 45 }
        - { x: 40, y: 30 }
        - { x: 50, y: 55 }
        - { x: 60, y: 40 }
        - { x: 70, y: 65 }
options:
  plugins:
    title:
      display: true
      text: Drag to Select Zoom Area
    zoom:
      zoom:
        drag:
          enabled: true
          backgroundColor: rgba(54, 162, 235, 0.3)
          borderColor: rgba(54, 162, 235, 1)
          borderWidth: 1
        mode: xy
```
````

---

## Configuration Reference

### Zoom Options

```yaml
options:
  plugins:
    zoom:
      zoom:
        wheel:
          enabled: true          # Enable wheel zoom
          speed: 0.1             # Zoom speed
          modifierKey: ctrl      # Require modifier key
        drag:
          enabled: true          # Enable drag-to-zoom
          backgroundColor: rgba(0,0,0,0.3)
          borderColor: rgba(0,0,0,1)
          borderWidth: 1
          threshold: 10          # Min drag distance
        pinch:
          enabled: true          # Enable pinch zoom (touch)
        mode: xy                 # x, y, or xy
```

### Pan Options

```yaml
pan:
  enabled: true
  mode: xy                       # x, y, or xy
  threshold: 10                  # Min pan distance
  modifierKey: shift             # Require modifier key
```

### Limits

```yaml
limits:
  x:
    min: 0                       # Minimum x value
    max: 100                     # Maximum x value
    minRange: 10                 # Minimum visible range
  y:
    min: original                # Use original scale min
    max: original                # Use original scale max
    minRange: 20
```

## Programmatic Control

In your theme setup, you can access zoom controls:

```ts
import { getChart, resetZoom } from 'vitepress-plugin-chartjs/client'

// Get chart instance
const chart = getChart('chart-id')

// Reset zoom
resetZoom('chart-id')

// Or use chart methods directly
chart.resetZoom()
chart.zoom(1.1)  // Zoom in 10%
chart.pan({ x: 100 }, undefined, 'default')
```
