# Loading from External Files

You can load chart configuration from external files in your `public` folder. This supports **YAML**, **JSON**, and **JavaScript** files.

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

JavaScript files can export a function that returns the configuration. This allows for dynamic data generation. The function is called each time the chart is rendered, so data can be randomized.

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

JavaScript files can export async functions for data fetching. This is useful when you need to load data from an API before rendering the chart.

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

You can also export a configuration object directly. Note that the code runs once when the module is loaded.

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

Generate complex mathematical data with JavaScript. This example shows sine and cosine waves computed programmatically.

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

## Auto-Refresh

You can automatically refresh chart data at a specified interval using the `refresh` parameter. The value is in milliseconds.

### Realtime Server Metrics

This chart updates every 2 seconds with new random data:

```chart
url: /charts/realtime-data.js
refresh: 2000
```

**Code:** | [View Config](/charts/realtime-data.js)

````yaml
```chart
url: /charts/realtime-data.js
refresh: 2000
```
````

::: details View realtime-data.js source code
```javascript
// Realtime data generator - returns new random data on each call
export default function() {
  const now = Date.now();
  const labels = [];
  const data1 = [];
  const data2 = [];
  
  // Generate last 10 data points
  for (let i = 9; i >= 0; i--) {
    const time = new Date(now - i * 1000);
    labels.push(time.toLocaleTimeString());
    data1.push(Math.floor(Math.random() * 100));
    data2.push(Math.floor(Math.random() * 80));
  }
  
  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'CPU Usage (%)',
          data: data1,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Memory Usage (%)',
          data: data2,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 300
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Usage (%)'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Server Metrics (Auto-Refresh)'
        }
      }
    }
  };
}
```
:::

---

### Live Bar Chart

Bar chart that refreshes every 3 seconds:

```chart
url: /charts/live-bar.js
refresh: 3000
```

**Code:** | [View Config](/charts/live-bar.js)

````yaml
```chart
url: /charts/live-bar.js
refresh: 3000
```
````

::: details View live-bar.js source code
```javascript
// Live bar chart - simulates API data
export default async function() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const categories = ['Products', 'Services', 'Support', 'Marketing', 'Sales'];
  const currentValues = categories.map(() => Math.floor(Math.random() * 1000));
  const previousValues = categories.map(() => Math.floor(Math.random() * 800));
  
  return {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Current Period',
          data: currentValues,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Previous Period',
          data: previousValues,
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 500
      },
      plugins: {
        title: {
          display: true,
          text: 'Revenue by Category (Updates every 3s)'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Revenue ($)'
          }
        }
      }
    }
  };
}
```
:::

---

### Refresh Parameter

| Parameter | Type | Description |
|-----------|------|-------------|
| `refresh` | number | Interval in milliseconds to reload data from the URL |

**Examples:**

| Value | Interval |
|-------|----------|
| `1000` | Every 1 second |
| `5000` | Every 5 seconds |
| `30000` | Every 30 seconds |
| `60000` | Every 1 minute |

::: tip
Use `refresh` with JavaScript functions that generate new data on each call. YAML/JSON files will return the same data, so refreshing them is less useful unless the file is updated externally.
:::

::: warning Performance
Be mindful of refresh intervals. Very short intervals (< 1000ms) may impact performance. For real-time data, consider using the streaming plugin instead.
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
| `export default { ... }` | Once on module load | Static config with computed values |
| `export default function() { ... }` | Each chart render | Random/dynamic data |
| `export default async function() { ... }` | Each chart render | API data fetching |

## Benefits

- **Reusability**: Share configurations across multiple pages
- **Maintainability**: Keep complex configs in separate files
- **Dynamic Data**: Generate data at runtime with JavaScript
- **Async Loading**: Fetch data from APIs before rendering
- **Separation of Concerns**: Keep data separate from documentation
- **Version Control**: Track config changes in git

## Best Practices

1. **Use YAML/JSON** for static configurations
2. **Use JS functions** when you need dynamic/random data
3. **Use async functions** when fetching from APIs
4. **Place files in `public/charts/`** for organized structure
5. **Use descriptive filenames** like `sales-2024.yaml` or `user-growth.js`
6. **Add comments** in JS files to explain data generation logic
