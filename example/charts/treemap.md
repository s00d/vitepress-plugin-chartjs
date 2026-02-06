# Treemap Charts

Treemap charts display hierarchical data as nested rectangles. Each branch of the tree is given a rectangle, which is then tiled with smaller rectangles representing sub-branches.

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
      
      const treemap = await import('chartjs-chart-treemap')
      Chart.register(treemap.TreemapController, treemap.TreemapElement)
    }
  }
}
```

::: tip Installation
```bash
npm install chartjs-chart-treemap
```
:::

## Basic Treemap

```chart
type: treemap
data:
  datasets:
    - label: Basic Treemap
      tree: [15, 6, 6, 5, 4, 3, 2, 2]
      borderColor: rgba(54, 162, 235, 1)
      borderWidth: 1
      spacing: 1
      backgroundColor: rgba(54, 162, 235, 0.5)
options:
  plugins:
    title:
      display: true
      text: Basic Treemap
    legend:
      display: false
```

**Code:**

````yaml
```chart
type: treemap
data:
  datasets:
    - label: Basic Treemap
      tree: [15, 6, 6, 5, 4, 3, 2, 2]
      borderColor: rgba(54, 162, 235, 1)
      borderWidth: 1
      spacing: 1
      backgroundColor: rgba(54, 162, 235, 0.5)
options:
  plugins:
    title:
      display: true
      text: Basic Treemap
    legend:
      display: false
```
````

---

## Grouped Data

```chart
type: treemap
data:
  datasets:
    - label: Sales by Category
      tree:
        - { category: Electronics, product: Phone, value: 150 }
        - { category: Electronics, product: Laptop, value: 200 }
        - { category: Electronics, product: Tablet, value: 100 }
        - { category: Clothing, product: Shirts, value: 80 }
        - { category: Clothing, product: Pants, value: 60 }
        - { category: Clothing, product: Shoes, value: 90 }
        - { category: Food, product: Fruits, value: 40 }
        - { category: Food, product: Vegetables, value: 35 }
        - { category: Food, product: Dairy, value: 50 }
      key: value
      groups:
        - category
      borderColor: white
      borderWidth: 2
      spacing: 2
      backgroundColor: rgba(75, 192, 192, 0.6)
      captions:
        display: true
        color: white
options:
  plugins:
    title:
      display: true
      text: Sales by Category
    legend:
      display: false
```

**Code:**

````yaml
```chart
type: treemap
data:
  datasets:
    - label: Sales by Category
      tree:
        - { category: Electronics, product: Phone, value: 150 }
        - { category: Electronics, product: Laptop, value: 200 }
        - { category: Clothing, product: Shirts, value: 80 }
        - { category: Food, product: Fruits, value: 40 }
      key: value
      groups:
        - category
      borderColor: white
      borderWidth: 2
      spacing: 2
      captions:
        display: true
options:
  plugins:
    legend:
      display: false
```
````

---

## Multi-level Hierarchy

```chart
type: treemap
data:
  datasets:
    - label: Organization
      tree:
        - { dept: Engineering, team: Frontend, member: Alice, hours: 40 }
        - { dept: Engineering, team: Frontend, member: Bob, hours: 35 }
        - { dept: Engineering, team: Backend, member: Carol, hours: 45 }
        - { dept: Engineering, team: Backend, member: Dave, hours: 38 }
        - { dept: Engineering, team: DevOps, member: Eve, hours: 42 }
        - { dept: Marketing, team: Digital, member: Frank, hours: 30 }
        - { dept: Marketing, team: Digital, member: Grace, hours: 28 }
        - { dept: Marketing, team: Content, member: Henry, hours: 35 }
        - { dept: Sales, team: Enterprise, member: Ivy, hours: 50 }
        - { dept: Sales, team: SMB, member: Jack, hours: 45 }
      key: hours
      groups:
        - dept
        - team
      borderColor: rgba(0, 0, 0, 0.3)
      borderWidth: 1
      spacing: 1
      backgroundColor: rgba(153, 102, 255, 0.6)
      captions:
        display: true
        color: black
      dividers:
        display: true
        lineColor: rgba(0, 0, 0, 0.5)
        lineWidth: 2
options:
  plugins:
    title:
      display: true
      text: Organization Hours by Department
    legend:
      display: false
```

**Code:**

````yaml
```chart
type: treemap
data:
  datasets:
    - label: Organization
      tree:
        - { dept: Engineering, team: Frontend, member: Alice, hours: 40 }
        - { dept: Engineering, team: Backend, member: Carol, hours: 45 }
        - { dept: Marketing, team: Digital, member: Frank, hours: 30 }
      key: hours
      groups:
        - dept
        - team
      captions:
        display: true
      dividers:
        display: true
        lineColor: rgba(0, 0, 0, 0.5)
```
````

---

## With Labels

```chart
type: treemap
data:
  datasets:
    - label: File Sizes
      tree:
        - { name: node_modules, size: 500 }
        - { name: src, size: 150 }
        - { name: dist, size: 100 }
        - { name: public, size: 50 }
        - { name: tests, size: 80 }
        - { name: docs, size: 30 }
      key: size
      borderColor: rgba(255, 159, 64, 1)
      borderWidth: 2
      spacing: 2
      backgroundColor: rgba(255, 159, 64, 0.5)
      labels:
        display: true
        color: black
        align: center
        position: middle
        overflow: fit
options:
  plugins:
    title:
      display: true
      text: Project Directory Sizes
    legend:
      display: false
```

**Code:**

````yaml
```chart
type: treemap
data:
  datasets:
    - label: File Sizes
      tree:
        - { name: node_modules, size: 500 }
        - { name: src, size: 150 }
        - { name: dist, size: 100 }
      key: size
      labels:
        display: true
        color: black
        align: center
        position: middle
        overflow: fit
```
````

---

## Styled Rectangles

```chart
type: treemap
data:
  datasets:
    - label: Budget
      tree: [300, 250, 200, 150, 100, 80, 60, 40]
      borderColor: rgba(255, 99, 132, 1)
      borderWidth: 2
      borderRadius: 8
      spacing: 3
      backgroundColor: rgba(255, 99, 132, 0.4)
options:
  plugins:
    title:
      display: true
      text: Budget Allocation (with rounded corners)
    legend:
      display: false
```

**Code:**

````yaml
```chart
type: treemap
data:
  datasets:
    - label: Budget
      tree: [300, 250, 200, 150, 100, 80, 60, 40]
      borderColor: rgba(255, 99, 132, 1)
      borderWidth: 2
      borderRadius: 8
      spacing: 3
      backgroundColor: rgba(255, 99, 132, 0.4)
```
````

---

## Configuration Reference

### Tree Data Formats

**Simple array of numbers:**
```yaml
tree: [15, 6, 6, 5, 4, 3, 2, 2]
```

**Array of objects with grouping:**
```yaml
tree:
  - { category: A, value: 100 }
  - { category: B, value: 80 }
key: value
groups:
  - category
```

### Dataset Options

| Option | Description |
|--------|-------------|
| `tree` | Tree data (array of numbers or objects) |
| `key` | Property name for values in object data |
| `groups` | Array of property names for hierarchy levels |
| `backgroundColor` | Rectangle fill color |
| `borderColor` | Rectangle border color |
| `borderWidth` | Border width in pixels |
| `borderRadius` | Corner radius in pixels |
| `spacing` | Space between rectangles |

### Labels

```yaml
labels:
  display: true
  color: black
  align: center        # left, center, right
  position: middle     # top, middle, bottom
  overflow: cut        # cut, hidden, fit
```

### Captions (for groups)

```yaml
captions:
  display: true
  color: white
  align: left
  padding: 3
```

### Dividers (between groups)

```yaml
dividers:
  display: true
  lineColor: black
  lineWidth: 1
  lineDash: [5, 5]
```

---

## Resources

- [chartjs-chart-treemap Documentation](https://chartjs-chart-treemap.pages.dev/)
- [GitHub Repository](https://github.com/kurkle/chartjs-chart-treemap)
