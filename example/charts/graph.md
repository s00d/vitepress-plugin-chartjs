# Graph Charts

Graph charts for visualizing networks, trees, and hierarchical structures.

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
      
      const graph = await import('chartjs-chart-graph')
      Chart.register(
        graph.ForceDirectedGraphController,
        graph.DendrogramController,
        graph.TreeController,
        graph.EdgeLine
      )
    }
  }
}
```

::: tip Installation
```bash
npm install chartjs-chart-graph
```
:::

## Force Directed Graph

A force-directed graph uses physics simulation to position nodes.

```chart
type: forceDirectedGraph
data:
  labels: [A, B, C, D, E, F]
  datasets:
    - data:
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
      edges:
        - { source: 0, target: 1 }
        - { source: 0, target: 2 }
        - { source: 1, target: 3 }
        - { source: 2, target: 4 }
        - { source: 2, target: 5 }
        - { source: 3, target: 4 }
      pointRadius: 10
      pointBackgroundColor: rgba(54, 162, 235, 0.8)
      pointBorderColor: rgba(54, 162, 235, 1)
      pointBorderWidth: 2
      lineBorderColor: rgba(0, 0, 0, 0.3)
      lineBorderWidth: 2
options:
  plugins:
    title:
      display: true
      text: Force Directed Graph
    legend:
      display: false
```

**Code:**

````yaml
```chart
type: forceDirectedGraph
data:
  labels: [A, B, C, D, E, F]
  datasets:
    - data:
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        # ... more nodes
      edges:
        - { source: 0, target: 1 }
        - { source: 0, target: 2 }
        # ... more edges
      pointRadius: 10
      pointBackgroundColor: rgba(54, 162, 235, 0.8)
      lineBorderColor: rgba(0, 0, 0, 0.3)
```
````

---

## Dendrogram (Horizontal)

A dendrogram shows hierarchical clustering.

```chart
type: dendrogram
data:
  labels: [Root, A, B, A1, A2, B1, B2]
  datasets:
    - data:
        - {}
        - { parent: 0 }
        - { parent: 0 }
        - { parent: 1 }
        - { parent: 1 }
        - { parent: 2 }
        - { parent: 2 }
      pointRadius: 8
      pointBackgroundColor: rgba(75, 192, 192, 0.8)
      pointBorderColor: rgba(75, 192, 192, 1)
      pointBorderWidth: 2
      lineBorderColor: rgba(75, 192, 192, 0.6)
      lineBorderWidth: 2
options:
  plugins:
    title:
      display: true
      text: Dendrogram (Horizontal)
    legend:
      display: false
  tree:
    orientation: horizontal
```

**Code:**

````yaml
```chart
type: dendrogram
data:
  labels: [Root, A, B, A1, A2, B1, B2]
  datasets:
    - data:
        - {}
        - { parent: 0 }
        - { parent: 0 }
        - { parent: 1 }
        - { parent: 1 }
        - { parent: 2 }
        - { parent: 2 }
      pointRadius: 8
      pointBackgroundColor: rgba(75, 192, 192, 0.8)
options:
  tree:
    orientation: horizontal
```
````

---

## Dendrogram (Vertical)

```chart
type: dendrogram
data:
  labels: [CEO, CTO, CFO, Dev Lead, QA Lead, Finance, Accounting]
  datasets:
    - data:
        - {}
        - { parent: 0 }
        - { parent: 0 }
        - { parent: 1 }
        - { parent: 1 }
        - { parent: 2 }
        - { parent: 2 }
      pointRadius: 8
      pointBackgroundColor: rgba(255, 99, 132, 0.8)
      pointBorderColor: rgba(255, 99, 132, 1)
      pointBorderWidth: 2
      lineBorderColor: rgba(255, 99, 132, 0.5)
      lineBorderWidth: 2
options:
  plugins:
    title:
      display: true
      text: Organization Chart (Vertical)
    legend:
      display: false
  tree:
    orientation: vertical
```

**Code:**

````yaml
```chart
type: dendrogram
data:
  labels: [CEO, CTO, CFO, Dev Lead, QA Lead, Finance, Accounting]
  datasets:
    - data:
        - {}
        - { parent: 0 }
        - { parent: 0 }
        - { parent: 1 }
        - { parent: 1 }
        - { parent: 2 }
        - { parent: 2 }
options:
  tree:
    orientation: vertical
```
````

---

## Tree Layout

Tidy tree layout with proper spacing.

```chart
type: tree
data:
  labels: [Root, Child 1, Child 2, Leaf 1, Leaf 2, Leaf 3, Leaf 4]
  datasets:
    - data:
        - {}
        - { parent: 0 }
        - { parent: 0 }
        - { parent: 1 }
        - { parent: 1 }
        - { parent: 2 }
        - { parent: 2 }
      pointRadius: 10
      pointBackgroundColor: rgba(153, 102, 255, 0.8)
      pointBorderColor: rgba(153, 102, 255, 1)
      pointBorderWidth: 2
      lineBorderColor: rgba(153, 102, 255, 0.5)
      lineBorderWidth: 2
options:
  plugins:
    title:
      display: true
      text: Tidy Tree Layout
    legend:
      display: false
  tree:
    orientation: horizontal
```

**Code:**

````yaml
```chart
type: tree
data:
  labels: [Root, Child 1, Child 2, Leaf 1, Leaf 2, Leaf 3, Leaf 4]
  datasets:
    - data:
        - {}
        - { parent: 0 }
        - { parent: 0 }
        - { parent: 1 }
        - { parent: 1 }
        - { parent: 2 }
        - { parent: 2 }
      pointRadius: 10
      pointBackgroundColor: rgba(153, 102, 255, 0.8)
options:
  tree:
    orientation: horizontal
```
````

---

## Network with Multiple Connections

```chart
type: forceDirectedGraph
data:
  labels: [Server, Client 1, Client 2, Client 3, Database, Cache]
  datasets:
    - data:
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
      edges:
        - { source: 0, target: 1 }
        - { source: 0, target: 2 }
        - { source: 0, target: 3 }
        - { source: 0, target: 4 }
        - { source: 0, target: 5 }
        - { source: 4, target: 5 }
      pointRadius: 12
      pointBackgroundColor: rgba(255, 159, 64, 0.8)
      pointBorderColor: rgba(255, 159, 64, 1)
      pointBorderWidth: 2
      lineBorderColor: rgba(100, 100, 100, 0.5)
      lineBorderWidth: 2
options:
  plugins:
    title:
      display: true
      text: Server Architecture
    legend:
      display: false
```

**Code:**

````yaml
```chart
type: forceDirectedGraph
data:
  labels: [Server, Client 1, Client 2, Client 3, Database, Cache]
  datasets:
    - data:
        - { x: 0, y: 0 }
        # ... nodes
      edges:
        - { source: 0, target: 1 }
        - { source: 0, target: 4 }
        - { source: 4, target: 5 }
        # ... edges
```
````

---

## Configuration Reference

### Chart Types

| Type | Description |
|------|-------------|
| `forceDirectedGraph` | Physics-based node positioning |
| `dendrogram` | Hierarchical cluster diagram |
| `tree` | Tidy tree layout |

### Data Structure

**With edges array:**
```yaml
data:
  labels: [A, B, C]
  datasets:
    - data:
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
        - { x: 0, y: 0 }
      edges:
        - { source: 0, target: 1 }
        - { source: 0, target: 2 }
```

**With parent references (for trees):**
```yaml
data:
  labels: [Root, Child1, Child2]
  datasets:
    - data:
        - {}
        - { parent: 0 }
        - { parent: 0 }
```

### Styling

```yaml
datasets:
  - pointRadius: 10
    pointBackgroundColor: rgba(54, 162, 235, 0.8)
    pointBorderColor: rgba(54, 162, 235, 1)
    pointBorderWidth: 2
    lineBorderColor: rgba(0, 0, 0, 0.3)
    lineBorderWidth: 2
```

### Tree Options

```yaml
options:
  tree:
    orientation: horizontal  # horizontal, vertical, radial
    mode: dendrogram        # dendrogram, tree
```

---

## Resources

- [chartjs-chart-graph Documentation](https://github.com/sgratzl/chartjs-chart-graph)
- [D3-force](https://github.com/d3/d3-force) - Force simulation
- [D3-hierarchy](https://github.com/d3/d3-hierarchy) - Tree layouts
