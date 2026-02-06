# Timestack Scale

The `chartjs-scale-timestack` adds a custom time scale that formats time in two stacked rows. The top row shows fine ticks while the bottom row shows context (like day/month).

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
      
      // This scale self-registers
      await import('chartjs-scale-timestack')
    }
  }
}
```

::: tip Installation
```bash
npm install luxon chartjs-scale-timestack
```
Note: This scale requires [Luxon](https://moment.github.io/luxon/) for locale-aware time formatting.
:::

## Basic Usage

Use `type: 'timestack'` in your scale configuration. Data points must use millisecond timestamps in `{x, y}` format.

```chart
type: line
data:
  datasets:
    - label: Temperature
      data:
        - { x: 1711537200000, y: 18 }
        - { x: 1711540800000, y: 19 }
        - { x: 1711544400000, y: 21 }
        - { x: 1711548000000, y: 23 }
        - { x: 1711551600000, y: 24 }
        - { x: 1711555200000, y: 25 }
        - { x: 1711558800000, y: 24 }
        - { x: 1711562400000, y: 22 }
        - { x: 1711566000000, y: 20 }
        - { x: 1711569600000, y: 18 }
      borderColor: rgba(54, 162, 235, 1)
      backgroundColor: rgba(54, 162, 235, 0.2)
      fill: true
      tension: 0.4
options:
  scales:
    x:
      type: timestack
    y:
      title:
        display: true
        text: Temperature (°C)
  plugins:
    title:
      display: true
      text: Hourly Temperature
```

**Code:**

````yaml
```chart
type: line
data:
  datasets:
    - label: Temperature
      data:
        - { x: 1711537200000, y: 18 }
        - { x: 1711540800000, y: 19 }
        - { x: 1711544400000, y: 21 }
        - { x: 1711548000000, y: 23 }
        - { x: 1711551600000, y: 24 }
        - { x: 1711555200000, y: 25 }
        - { x: 1711558800000, y: 24 }
        - { x: 1711562400000, y: 22 }
        - { x: 1711566000000, y: 20 }
        - { x: 1711569600000, y: 18 }
      borderColor: rgba(54, 162, 235, 1)
      tension: 0.4
options:
  scales:
    x:
      type: timestack
```
````

---

## Daily Data

Timestack automatically adjusts formatting based on the time range:

```chart
type: line
data:
  datasets:
    - label: Daily Sales
      data:
        - { x: 1709251200000, y: 150 }
        - { x: 1709337600000, y: 180 }
        - { x: 1709424000000, y: 165 }
        - { x: 1709510400000, y: 200 }
        - { x: 1709596800000, y: 220 }
        - { x: 1709683200000, y: 190 }
        - { x: 1709769600000, y: 175 }
        - { x: 1709856000000, y: 210 }
        - { x: 1709942400000, y: 230 }
        - { x: 1710028800000, y: 205 }
      borderColor: rgba(75, 192, 192, 1)
      backgroundColor: rgba(75, 192, 192, 0.2)
      fill: true
options:
  scales:
    x:
      type: timestack
    y:
      beginAtZero: true
      title:
        display: true
        text: Sales ($)
  plugins:
    title:
      display: true
      text: Daily Sales (March 2024)
```

**Code:**

````yaml
```chart
type: line
data:
  datasets:
    - label: Daily Sales
      data:
        - { x: 1709251200000, y: 150 }
        - { x: 1709337600000, y: 180 }
        # ... more data points with timestamps
options:
  scales:
    x:
      type: timestack
```
````

---

## Multiple Datasets

```chart
type: line
data:
  datasets:
    - label: Server 1
      data:
        - { x: 1711537200000, y: 45 }
        - { x: 1711540800000, y: 52 }
        - { x: 1711544400000, y: 48 }
        - { x: 1711548000000, y: 55 }
        - { x: 1711551600000, y: 60 }
        - { x: 1711555200000, y: 58 }
      borderColor: rgba(54, 162, 235, 1)
    - label: Server 2
      data:
        - { x: 1711537200000, y: 35 }
        - { x: 1711540800000, y: 42 }
        - { x: 1711544400000, y: 38 }
        - { x: 1711548000000, y: 45 }
        - { x: 1711551600000, y: 50 }
        - { x: 1711555200000, y: 48 }
      borderColor: rgba(255, 99, 132, 1)
options:
  scales:
    x:
      type: timestack
    y:
      title:
        display: true
        text: CPU Usage (%)
  plugins:
    title:
      display: true
      text: Server CPU Usage Over Time
```

**Code:**

````yaml
```chart
type: line
data:
  datasets:
    - label: Server 1
      data:
        - { x: 1711537200000, y: 45 }
        # ... timestamps in milliseconds
    - label: Server 2
      data:
        - { x: 1711537200000, y: 35 }
        # ...
options:
  scales:
    x:
      type: timestack
```
````

---

## Scatter Chart with Timestack

```chart
type: scatter
data:
  datasets:
    - label: Events
      data:
        - { x: 1711537200000, y: 5 }
        - { x: 1711541800000, y: 12 }
        - { x: 1711545400000, y: 8 }
        - { x: 1711549000000, y: 15 }
        - { x: 1711552600000, y: 20 }
        - { x: 1711556200000, y: 18 }
        - { x: 1711559800000, y: 25 }
      backgroundColor: rgba(255, 99, 132, 0.8)
      pointRadius: 8
options:
  scales:
    x:
      type: timestack
    y:
      beginAtZero: true
      title:
        display: true
        text: Event Count
  plugins:
    title:
      display: true
      text: Events Distribution Over Time
```

**Code:**

````yaml
```chart
type: scatter
data:
  datasets:
    - label: Events
      data:
        - { x: 1711537200000, y: 5 }
        # ... timestamps in milliseconds
options:
  scales:
    x:
      type: timestack
```
````

---

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `datetime` | `{}` | Luxon DateTime creation options (zone, locale, etc) |
| `density` | `0.5` | Desired labels density [0..1] |
| `max_density` | `0.75` | Maximum labels density [0..1] |
| `tooltip_format` | auto | Tooltip format options (Intl.DateTimeFormatOptions) |
| `left_floating_tick_thres` | `0.33` | Threshold for left floating tick |
| `right_floating_tick_thres` | `false` | Threshold for right floating tick |
| `format_style` | - | Formatting options (Intl.DateTimeFormatOptions) |

## Data Format

::: warning Important
- Data points must use `{x, y}` format with **millisecond timestamps**
- X-values are not parsed automatically
- Labels as X-values are not supported
- Bar charts with offset gridlines are not supported
:::

```javascript
// Correct format
const data = [
  { x: 1711537965000, y: 1 },  // millisecond timestamp
  { x: 1711537973000, y: 2 },
];

// Get current timestamp in milliseconds
const now = Date.now();

// Convert Date to timestamp
const timestamp = new Date('2024-03-27T12:00:00').getTime();
```

## Tick Formatting

Timestack automatically chooses human-friendly ticks:

| View | Example Ticks |
|------|---------------|
| Hourly | 14:00, 14:30, 15:00, 15:30 |
| Daily | 1, 5, 10, 15, 25 (days of month) |
| Monthly | Jan, Feb, Mar, Apr |

## Timezone Configuration

```yaml
options:
  scales:
    x:
      type: timestack
      timestack:
        datetime:
          zone: 'America/New_York'
          locale: 'en-US'
```

## Custom Format Style

```yaml
options:
  scales:
    x:
      type: timestack
      timestack:
        format_style:
          hour12: true
          month: 'long'
          minute: '2-digit'
```
