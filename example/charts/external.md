# Loading from External Files

You can load chart configuration from external files in your `public` folder. This supports **YAML**, **JSON**, and **JavaScript** files.

All external files are resolved **at build time** — the client never fetches data. This means:
- Faster page loads (no runtime fetch)
- Works in offline/static builds
- JS modules are executed once during build

## YAML File

Load configuration from a YAML file:

```chart
url: /charts/line-basic.yaml
```

**Code:** | [View Config](/charts/line-basic.yaml)

````yaml
```chart
url: /charts/line-basic.yaml
```
````

---

## Bar Chart from YAML

```chart
url: /charts/bar-horizontal.yaml
```

**Code:** | [View Config](/charts/bar-horizontal.yaml)

````yaml
```chart
url: /charts/bar-horizontal.yaml
```
````

---

## JavaScript - Function Export

JavaScript files can export a function that returns the configuration. The function is called **at build time** in Node.js, so you can use `fs`, `path`, and other Node APIs.

```chart
url: /charts/dynamic-line.js
```

**Code:** | [View Config](/charts/dynamic-line.js)

````yaml
```chart
url: /charts/dynamic-line.js
```
````

::: details View dynamic-line.js source code
```javascript
// Dynamic chart configuration with JavaScript
// This file exports a function that generates chart config

export default function() {
  // Generate random data
  const generateData = (count, min, max) => {
    return Array.from({ length: count }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Revenue 2024',
          data: generateData(12, 50, 150),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Revenue 2023',
          data: generateData(12, 40, 120),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Dynamic Data (Generated with JavaScript)'
        }
      }
    }
  };
}
```
:::

---

## JavaScript - Async Function

JavaScript files can export async functions for data fetching. This is useful when you need to load data from an API **during build**.

```chart
url: /charts/realtime-bar.js
```

**Code:** | [View Config](/charts/realtime-bar.js)

````yaml
```chart
url: /charts/realtime-bar.js
```
````

::: details View realtime-bar.js source code
```javascript
// Bar chart with dynamically generated data
// Demonstrates async config generation

export default async function() {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports', 'Home'];
  
  // Generate sales data
  const salesData = categories.map(() => Math.floor(Math.random() * 500) + 100);
  const profitData = salesData.map(sale => Math.floor(sale * (0.1 + Math.random() * 0.3)));
  
  return {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Sales ($K)',
          data: salesData,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Profit ($K)',
          data: profitData,
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Sales & Profit by Category (Async JS)'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}
```
:::

---

## JavaScript - Object Export

You can also export a configuration object directly. Note that the code runs once when the module is loaded at build time.

```chart
url: /charts/pie-random.js
```

**Code:** | [View Config](/charts/pie-random.js)

````yaml
```chart
url: /charts/pie-random.js
```
````

::: details View pie-random.js source code
```javascript
// Pie chart with random distribution
// Export config object directly

const segments = ['Segment A', 'Segment B', 'Segment C', 'Segment D', 'Segment E'];

// Generate random percentages that sum to 100
function generatePercentages(count) {
  const values = Array.from({ length: count }, () => Math.random());
  const sum = values.reduce((a, b) => a + b, 0);
  return values.map(v => Math.round((v / sum) * 100));
}

const data = generatePercentages(segments.length);

export default {
  type: 'pie',
  data: {
    labels: segments,
    datasets: [{
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ],
      borderWidth: 2
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Random Distribution (JS Object Export)'
      },
      legend: {
        position: 'right'
      }
    }
  }
};
```
:::

---

## Computed Data Example

Generate complex mathematical data with JavaScript. This example shows sine and cosine waves computed programmatically at build time.

```chart
url: /charts/scatter-computed.js
```

**Code:** | [View Config](/charts/scatter-computed.js)

````yaml
```chart
url: /charts/scatter-computed.js
```
````

::: details View scatter-computed.js source code
```javascript
// Scatter chart with computed mathematical data
// Demonstrates complex data generation

export default function() {
  // Generate sine wave points
  const sineData = [];
  for (let i = 0; i <= 360; i += 15) {
    sineData.push({
      x: i,
      y: Math.sin(i * Math.PI / 180) * 50 + 50
    });
  }
  
  // Generate cosine wave points
  const cosineData = [];
  for (let i = 0; i <= 360; i += 15) {
    cosineData.push({
      x: i,
      y: Math.cos(i * Math.PI / 180) * 50 + 50
    });
  }
  
  // Generate random cluster
  const clusterData = [];
  for (let i = 0; i < 20; i++) {
    clusterData.push({
      x: 180 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 40
    });
  }
  
  return {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Sine Wave',
          data: sineData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          pointRadius: 4
        },
        {
          label: 'Cosine Wave',
          data: cosineData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          pointRadius: 4
        },
        {
          label: 'Random Cluster',
          data: clusterData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          pointRadius: 6
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Mathematical Functions (JS Computed)'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Degrees'
          },
          min: 0,
          max: 360
        },
        y: {
          title: {
            display: true,
            text: 'Value'
          },
          min: 0,
          max: 100
        }
      }
    }
  };
}
```
:::

---

## JavaScript with Node.js APIs

Since JS modules are executed at build time in Node.js, you can use `fs`, `path`, and other Node APIs to read local files:

::: details Example: reading a JSON data file
```javascript
// public/charts/from-file.js
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export default function () {
  const __dir = dirname(fileURLToPath(import.meta.url));
  const data = JSON.parse(readFileSync(join(__dir, 'data.json'), 'utf-8'));

  return {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Sales',
        data: data.values,
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Data from JSON file'
        }
      }
    }
  };
}
```
:::

---

## File Types Summary

| Extension | Description | Export Type |
|-----------|-------------|-------------|
| `.yaml` | YAML configuration | N/A (parsed as YAML) |
| `.json` | JSON configuration | N/A (parsed as JSON) |
| `.js` | JavaScript module | `export default` (function, async function, or object) |
| `.mjs` | ES Module | `export default` (function, async function, or object) |

## JavaScript Export Types

| Export Type | When Called | Use Case |
|-------------|-------------|----------|
| `export default { ... }` | Once at build time | Static config with computed values |
| `export default function() { ... }` | Once at build time | Random/dynamic data |
| `export default async function() { ... }` | Once at build time | API data fetching during build |

## Benefits

- **Fast loading**: Data is embedded at build time — no runtime fetch
- **Reusability**: Share configurations across multiple pages
- **Maintainability**: Keep complex configs in separate files
- **Dynamic Data**: Generate data at build time with JavaScript
- **Node.js APIs**: Use `fs`, `path`, `fetch` in JS modules during build
- **Separation of Concerns**: Keep data separate from documentation
- **Version Control**: Track config changes in git

## Best Practices

1. **Use YAML/JSON** for static configurations
2. **Use JS functions** when you need computed/random data
3. **Use async functions** when fetching from APIs during build
4. **Place files in `public/charts/`** for organized structure
5. **Use descriptive filenames** like `sales-2024.yaml` or `user-growth.js`
6. **Add comments** in JS files to explain data generation logic
