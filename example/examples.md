# Chart Examples

This page demonstrates all chart types supported by the plugin.

## Line Chart

```chart
type: line
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Dataset 1
      data: [65, 59, 80, 81, 56, 55]
      tension: 0.3
    - label: Dataset 2
      data: [28, 48, 40, 19, 86, 27]
      tension: 0.3
options:
  plugins:
    title:
      display: true
      text: Line Chart Example
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Dataset 1
      data: [65, 59, 80, 81, 56, 55]
      tension: 0.3
    - label: Dataset 2
      data: [28, 48, 40, 19, 86, 27]
      tension: 0.3
options:
  plugins:
    title:
      display: true
      text: Line Chart Example
```
````

---

## Bar Chart

```chart
type: bar
data:
  labels: [Red, Blue, Yellow, Green, Purple, Orange]
  datasets:
    - label: Votes
      data: [12, 19, 3, 5, 2, 3]
options:
  plugins:
    title:
      display: true
      text: Bar Chart Example
  scales:
    y:
      beginAtZero: true
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Red, Blue, Yellow, Green, Purple, Orange]
  datasets:
    - label: Votes
      data: [12, 19, 3, 5, 2, 3]
options:
  plugins:
    title:
      display: true
      text: Bar Chart Example
  scales:
    y:
      beginAtZero: true
```
````

---

## Horizontal Bar Chart

```chart
type: bar
data:
  labels: [Red, Blue, Yellow, Green, Purple, Orange]
  datasets:
    - label: Votes
      data: [12, 19, 3, 5, 2, 3]
options:
  indexAxis: y
  plugins:
    title:
      display: true
      text: Horizontal Bar Chart
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Red, Blue, Yellow, Green, Purple, Orange]
  datasets:
    - label: Votes
      data: [12, 19, 3, 5, 2, 3]
options:
  indexAxis: y
  plugins:
    title:
      display: true
      text: Horizontal Bar Chart
```
````

---

## Pie Chart

```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green, Purple]
  datasets:
    - data: [300, 50, 100, 40, 120]
options:
  plugins:
    title:
      display: true
      text: Pie Chart Example
```

**Code:**

````yaml
```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green, Purple]
  datasets:
    - data: [300, 50, 100, 40, 120]
options:
  plugins:
    title:
      display: true
      text: Pie Chart Example
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
      text: Device Usage
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
      text: Device Usage
```
````

---

## Radar Chart

```chart
type: radar
data:
  labels: [Eating, Drinking, Sleeping, Designing, Coding, Cycling]
  datasets:
    - label: Person A
      data: [65, 59, 90, 81, 56, 55]
    - label: Person B
      data: [28, 48, 40, 19, 96, 27]
options:
  plugins:
    title:
      display: true
      text: Skill Comparison
  scales:
    r:
      beginAtZero: true
```

**Code:**

````yaml
```chart
type: radar
data:
  labels: [Eating, Drinking, Sleeping, Designing, Coding, Cycling]
  datasets:
    - label: Person A
      data: [65, 59, 90, 81, 56, 55]
    - label: Person B
      data: [28, 48, 40, 19, 96, 27]
options:
  plugins:
    title:
      display: true
      text: Skill Comparison
  scales:
    r:
      beginAtZero: true
```
````

---

## Polar Area Chart

```chart
type: polarArea
data:
  labels: [Red, Green, Yellow, Grey, Blue]
  datasets:
    - data: [11, 16, 7, 3, 14]
options:
  plugins:
    title:
      display: true
      text: Polar Area Chart
```

**Code:**

````yaml
```chart
type: polarArea
data:
  labels: [Red, Green, Yellow, Grey, Blue]
  datasets:
    - data: [11, 16, 7, 3, 14]
options:
  plugins:
    title:
      display: true
      text: Polar Area Chart
```
````

---

## Scatter Chart

```chart
type: scatter
data:
  datasets:
    - label: Dataset A
      data:
        - { x: -10, y: 0 }
        - { x: 0, y: 10 }
        - { x: 10, y: 5 }
        - { x: 5, y: 5 }
        - { x: -5, y: -5 }
    - label: Dataset B
      data:
        - { x: -8, y: 3 }
        - { x: 2, y: 8 }
        - { x: 8, y: 2 }
        - { x: 3, y: -3 }
        - { x: -3, y: -8 }
options:
  plugins:
    title:
      display: true
      text: Scatter Plot
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
        - { x: -10, y: 0 }
        - { x: 0, y: 10 }
        - { x: 10, y: 5 }
        - { x: 5, y: 5 }
        - { x: -5, y: -5 }
    - label: Dataset B
      data:
        - { x: -8, y: 3 }
        - { x: 2, y: 8 }
        - { x: 8, y: 2 }
        - { x: 3, y: -3 }
        - { x: -3, y: -8 }
options:
  plugins:
    title:
      display: true
      text: Scatter Plot
  scales:
    x:
      type: linear
      position: bottom
```
````

---

## Bubble Chart

```chart
type: bubble
data:
  datasets:
    - label: Dataset 1
      data:
        - { x: 20, y: 30, r: 15 }
        - { x: 40, y: 10, r: 10 }
        - { x: 25, y: 25, r: 25 }
    - label: Dataset 2
      data:
        - { x: 10, y: 20, r: 8 }
        - { x: 30, y: 35, r: 12 }
        - { x: 15, y: 15, r: 18 }
options:
  plugins:
    title:
      display: true
      text: Bubble Chart
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
        - { x: 25, y: 25, r: 25 }
    - label: Dataset 2
      data:
        - { x: 10, y: 20, r: 8 }
        - { x: 30, y: 35, r: 12 }
        - { x: 15, y: 15, r: 18 }
options:
  plugins:
    title:
      display: true
      text: Bubble Chart
```
````

---

## Stacked Bar Chart

```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: Product A
      data: [50, 60, 70, 80]
    - label: Product B
      data: [30, 40, 35, 45]
    - label: Product C
      data: [20, 25, 30, 35]
options:
  plugins:
    title:
      display: true
      text: Quarterly Sales (Stacked)
  scales:
    x:
      stacked: true
    y:
      stacked: true
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: Product A
      data: [50, 60, 70, 80]
    - label: Product B
      data: [30, 40, 35, 45]
    - label: Product C
      data: [20, 25, 30, 35]
options:
  plugins:
    title:
      display: true
      text: Quarterly Sales (Stacked)
  scales:
    x:
      stacked: true
    y:
      stacked: true
```
````

---

## Mixed Chart (Line + Bar)

```chart
type: bar
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Revenue
      type: bar
      data: [50, 60, 70, 80, 90, 100]
    - label: Profit Margin
      type: line
      data: [20, 25, 22, 28, 30, 35]
      borderWidth: 2
      fill: false
      yAxisID: y1
options:
  plugins:
    title:
      display: true
      text: Revenue vs Profit Margin
  scales:
    y:
      type: linear
      position: left
      title:
        display: true
        text: Revenue ($K)
    y1:
      type: linear
      position: right
      title:
        display: true
        text: Profit Margin (%)
      grid:
        drawOnChartArea: false
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Revenue
      type: bar
      data: [50, 60, 70, 80, 90, 100]
    - label: Profit Margin
      type: line
      data: [20, 25, 22, 28, 30, 35]
      borderWidth: 2
      fill: false
      yAxisID: y1
options:
  plugins:
    title:
      display: true
      text: Revenue vs Profit Margin
  scales:
    y:
      type: linear
      position: left
      title:
        display: true
        text: Revenue ($K)
    y1:
      type: linear
      position: right
      title:
        display: true
        text: Profit Margin (%)
      grid:
        drawOnChartArea: false
```
````

---

## Area Chart (Filled Line)

```chart
type: line
data:
  labels: [2019, 2020, 2021, 2022, 2023, 2024]
  datasets:
    - label: Users
      data: [1000, 2500, 5000, 8000, 12000, 18000]
      fill: true
      tension: 0.4
options:
  plugins:
    title:
      display: true
      text: User Growth Over Time
  scales:
    y:
      beginAtZero: true
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [2019, 2020, 2021, 2022, 2023, 2024]
  datasets:
    - label: Users
      data: [1000, 2500, 5000, 8000, 12000, 18000]
      fill: true
      tension: 0.4
options:
  plugins:
    title:
      display: true
      text: User Growth Over Time
  scales:
    y:
      beginAtZero: true
```
````

---

## Multi-Axis Line Chart

```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Temperature (°C)
      data: [10, 15, 20, 25, 30, 28]
      yAxisID: y
    - label: Rainfall (mm)
      data: [50, 40, 60, 80, 30, 20]
      yAxisID: y1
options:
  plugins:
    title:
      display: true
      text: Weather Data
  scales:
    y:
      type: linear
      position: left
      title:
        display: true
        text: Temperature (°C)
    y1:
      type: linear
      position: right
      title:
        display: true
        text: Rainfall (mm)
      grid:
        drawOnChartArea: false
```

**Code:**

````yaml
```chart
type: line
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Temperature (°C)
      data: [10, 15, 20, 25, 30, 28]
      yAxisID: y
    - label: Rainfall (mm)
      data: [50, 40, 60, 80, 30, 20]
      yAxisID: y1
options:
  plugins:
    title:
      display: true
      text: Weather Data
  scales:
    y:
      type: linear
      position: left
      title:
        display: true
        text: Temperature (°C)
    y1:
      type: linear
      position: right
      title:
        display: true
        text: Rainfall (mm)
      grid:
        drawOnChartArea: false
```
````
