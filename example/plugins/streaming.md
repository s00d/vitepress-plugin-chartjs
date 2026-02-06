# Streaming / Realtime Charts

The `@aziham/chartjs-plugin-streaming` enables realtime streaming data visualization with automatic scrolling. This is a modernized fork for Chart.js 4.x with TypeScript support.

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
      
      await import('chartjs-adapter-luxon')
      const streamingPlugin = (await import('@aziham/chartjs-plugin-streaming')).default
      Chart.register(streamingPlugin)
    }
  }
}
```

::: tip Installation
```bash
npm install @aziham/chartjs-plugin-streaming chartjs-adapter-luxon luxon
```
Note: This plugin requires a date adapter. Luxon is recommended.
:::

## Basic Realtime Chart

A line chart with realtime scrolling data:

```chart
type: line
data:
  datasets:
    - label: Dataset 1
      borderColor: rgba(54, 162, 235, 1)
      backgroundColor: rgba(54, 162, 235, 0.2)
      fill: true
      data: []
    - label: Dataset 2
      borderColor: rgba(255, 99, 132, 1)
      backgroundColor: rgba(255, 99, 132, 0.2)
      fill: true
      data: []
options:
  scales:
    x:
      type: realtime
      realtime:
        duration: 20000
        refresh: 1000
        delay: 2000
    y:
      beginAtZero: true
      max: 100
  plugins:
    streaming: {}
    title:
      display: true
      text: Realtime Streaming Chart
```

**Code:**

````yaml
```chart
type: line
data:
  datasets:
    - label: Dataset 1
      data: []
options:
  scales:
    x:
      type: realtime
      realtime:
        duration: 20000
        refresh: 1000
        delay: 2000
  plugins:
    streaming: {}
```
````

::: warning Note
Streaming charts require JavaScript callbacks for `onRefresh` to add new data points. In static YAML configs, the chart will display but won't have dynamic data updates. For full functionality, use a JavaScript configuration file.
:::

---

## Configuration via JavaScript

For dynamic data, use a JavaScript configuration file:

**public/charts/streaming-demo.js:**

```javascript
export default function() {
  return {
    type: 'line',
    data: {
      datasets: [{
        label: 'Live Data',
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        data: []
      }]
    },
    options: {
      scales: {
        x: {
          type: 'realtime',
          realtime: {
            duration: 20000,
            refresh: 1000,
            delay: 2000,
            onRefresh: (chart) => {
              chart.data.datasets.forEach((dataset) => {
                dataset.data.push({
                  x: Date.now(),
                  y: Math.random() * 100
                });
              });
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100
        }
      },
      plugins: {
        streaming: {}
      }
    }
  };
}
```

**Usage:**

````yaml
```chart
url: /charts/streaming-demo.js
```
````

---

## Scale Configuration

### Realtime Scale Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | number | `10000` | Duration of visible data (ms) |
| `refresh` | number | `1000` | Refresh interval (ms) |
| `delay` | number | `0` | Delay before displaying data (ms) |
| `pause` | boolean | `false` | Pause the chart |
| `ttl` | number | - | Time-to-live for data points (ms) |
| `frameRate` | number | `30` | Animation frame rate |

### Example Configuration

```yaml
options:
  scales:
    x:
      type: realtime
      realtime:
        duration: 20000    # Show last 20 seconds
        refresh: 1000      # Update every second
        delay: 2000        # 2 second delay
        pause: false       # Not paused
        ttl: 60000         # Keep 60 seconds of data
```

---

## Plugin Configuration

### Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | number | `10000` | Default duration for all realtime scales |
| `delay` | number | `0` | Default delay for all realtime scales |
| `refresh` | number | `1000` | Default refresh rate |
| `frameRate` | number | `30` | Animation frame rate |

### Configuration Levels

Options can be set at 3 levels (in priority order):

1. **Per axis**: `options.scales.x.realtime.*`
2. **Per chart**: `options.plugins.streaming.*`
3. **Globally**: `Chart.defaults.plugins.streaming.*`

```yaml
options:
  plugins:
    streaming:
      duration: 20000    # Default for all realtime scales in this chart
  scales:
    x:
      type: realtime
      realtime:
        duration: 30000  # Override for this specific scale
```

---

## Multiple Datasets

```javascript
// streaming-multi.js
export default function() {
  return {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'CPU',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: []
        },
        {
          label: 'Memory',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: []
        },
        {
          label: 'Disk',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: []
        }
      ]
    },
    options: {
      scales: {
        x: {
          type: 'realtime',
          realtime: {
            duration: 30000,
            refresh: 2000,
            onRefresh: (chart) => {
              const now = Date.now();
              chart.data.datasets[0].data.push({ x: now, y: Math.random() * 100 });
              chart.data.datasets[1].data.push({ x: now, y: Math.random() * 80 });
              chart.data.datasets[2].data.push({ x: now, y: Math.random() * 60 });
            }
          }
        },
        y: {
          max: 100,
          title: {
            display: true,
            text: 'Usage (%)'
          }
        }
      }
    }
  };
}
```

---

## Bar Chart Streaming

Streaming also works with bar charts:

```javascript
// streaming-bar.js
export default function() {
  return {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Requests/sec',
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        data: []
      }]
    },
    options: {
      scales: {
        x: {
          type: 'realtime',
          realtime: {
            duration: 20000,
            refresh: 1000,
            onRefresh: (chart) => {
              chart.data.datasets[0].data.push({
                x: Date.now(),
                y: Math.floor(Math.random() * 100)
              });
            }
          }
        }
      }
    }
  };
}
```

---

## Pause and Resume

Control the streaming programmatically:

```javascript
// Pause streaming
chart.options.scales.x.realtime.pause = true;
chart.update('none');

// Resume streaming
chart.options.scales.x.realtime.pause = false;
chart.update('none');
```

---

## Use Cases

- **Server Monitoring**: CPU, memory, disk usage
- **Network Traffic**: Bandwidth, packets/sec
- **Stock Prices**: Real-time price updates
- **IoT Sensors**: Temperature, humidity, pressure
- **Application Metrics**: Requests/sec, response times

---

## Resources

- [GitHub Repository](https://github.com/aziham/chartjs-plugin-streaming) (Chart.js 4.x fork)
- [Original Documentation](https://nagix.github.io/chartjs-plugin-streaming/)
- [Chart.js Date Adapters](https://www.chartjs.org/docs/latest/axes/cartesian/time.html#date-adapters)
