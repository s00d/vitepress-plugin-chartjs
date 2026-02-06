# Bar Charts

Bar charts display data as rectangular bars with lengths proportional to the values.

## Basic Bar Chart


```chart
type: bar
data:
  labels: [Red, Blue, Yellow, Green, Purple, Orange]
  datasets:
    - label: Votes
      data: [12, 19, 3, 5, 2, 3]
options:
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
  labels: [JavaScript, Python, Java, C++, Ruby, Go]
  datasets:
    - label: Popularity
      data: [95, 90, 75, 65, 45, 55]
options:
  indexAxis: y
  plugins:
    title:
      display: true
      text: Programming Language Popularity
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [JavaScript, Python, Java, C++, Ruby, Go]
  datasets:
    - label: Popularity
      data: [95, 90, 75, 65, 45, 55]
options:
  indexAxis: y
  plugins:
    title:
      display: true
      text: Programming Language Popularity
```
````

---

## Grouped Bar Chart

```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: 2023
      data: [50, 60, 70, 80]
    - label: 2024
      data: [55, 70, 85, 95]
options:
  plugins:
    title:
      display: true
      text: Quarterly Revenue Comparison
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: 2023
      data: [50, 60, 70, 80]
    - label: 2024
      data: [55, 70, 85, 95]
options:
  plugins:
    title:
      display: true
      text: Quarterly Revenue Comparison
```
````

---

## Stacked Bar Chart

```chart
type: bar
data:
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Direct
      data: [50, 60, 70, 80, 90, 100]
    - label: Referral
      data: [30, 40, 35, 45, 50, 55]
    - label: Organic
      data: [20, 25, 30, 35, 40, 45]
options:
  plugins:
    title:
      display: true
      text: Traffic Sources
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
  labels: [Jan, Feb, Mar, Apr, May, Jun]
  datasets:
    - label: Direct
      data: [50, 60, 70, 80, 90, 100]
    - label: Referral
      data: [30, 40, 35, 45, 50, 55]
    - label: Organic
      data: [20, 25, 30, 35, 40, 45]
options:
  plugins:
    title:
      display: true
      text: Traffic Sources
  scales:
    x:
      stacked: true
    y:
      stacked: true
```
````

---

## Floating Bars (Range)

```chart
type: bar
data:
  labels: [Mon, Tue, Wed, Thu, Fri]
  datasets:
    - label: Temperature Range
      data:
        - [5, 15]
        - [8, 18]
        - [10, 22]
        - [12, 25]
        - [9, 20]
options:
  plugins:
    title:
      display: true
      text: Daily Temperature Range
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [Mon, Tue, Wed, Thu, Fri]
  datasets:
    - label: Temperature Range
      data:
        - [5, 15]
        - [8, 18]
        - [10, 22]
        - [12, 25]
        - [9, 20]
options:
  plugins:
    title:
      display: true
      text: Daily Temperature Range
```
````

---

## Border Radius

```chart
type: bar
data:
  labels: [A, B, C, D, E]
  datasets:
    - label: Values
      data: [40, 60, 80, 70, 50]
      borderRadius: 10
      borderWidth: 2
options:
  plugins:
    title:
      display: true
      text: Rounded Bars
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
      borderRadius: 10
      borderWidth: 2
options:
  plugins:
    title:
      display: true
      text: Rounded Bars
```
````

---

## Configuration Options

### Dataset Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Dataset label |
| `data` | number[]/[number, number][] | Data values or ranges |
| `backgroundColor` | string/string[] | Bar fill color(s) |
| `borderColor` | string/string[] | Bar border color(s) |
| `borderWidth` | number | Border width |
| `borderRadius` | number | Corner radius |
| `borderSkipped` | string | Which border to skip |
| `barThickness` | number | Bar width in pixels |
| `barPercentage` | number | Bar width as ratio (0-1) |
| `categoryPercentage` | number | Category width ratio |

### Stacking

```yaml
options:
  scales:
    x:
      stacked: true
    y:
      stacked: true
```

### Horizontal Orientation

```yaml
options:
  indexAxis: y
```
