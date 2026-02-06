# Color Schemes

The `hw-chartjs-plugin-colorschemes` provides predefined color schemes for Chart.js based on popular tools like ColorBrewer, Microsoft Office, and Tableau.

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
      
      // This plugin self-registers
      await import('hw-chartjs-plugin-colorschemes')
    }
  }
}
```

::: tip Installation
```bash
npm install hw-chartjs-plugin-colorschemes
```
:::

## Basic Usage

Specify a color scheme using the `scheme` option:

```chart
type: bar
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Dataset 1
      data: [65, 59, 80, 81, 56, 55]
    - label: Dataset 2
      data: [45, 79, 60, 91, 76, 85]
    - label: Dataset 3
      data: [35, 49, 70, 71, 46, 65]
options:
  plugins:
    colorschemes:
      scheme: brewer.Paired12
    title:
      display: true
      text: ColorBrewer Paired12 Scheme
```

**Code:**

````yaml
```chart
type: bar
data:
  labels: [January, February, March, April, May, June]
  datasets:
    - label: Dataset 1
      data: [65, 59, 80, 81, 56, 55]
    - label: Dataset 2
      data: [45, 79, 60, 91, 76, 85]
    - label: Dataset 3
      data: [35, 49, 70, 71, 46, 65]
options:
  plugins:
    colorschemes:
      scheme: brewer.Paired12
```
````

---

## Office Schemes

Microsoft Office color schemes:

```chart
type: line
data:
  labels: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  datasets:
    - label: Website A
      data: [120, 190, 300, 250, 420, 380, 450]
    - label: Website B
      data: [100, 150, 280, 220, 380, 350, 400]
    - label: Website C
      data: [80, 120, 200, 180, 300, 280, 350]
    - label: Website D
      data: [60, 90, 150, 140, 220, 200, 280]
options:
  plugins:
    colorschemes:
      scheme: office.Excel16
    title:
      display: true
      text: Office Excel16 Scheme
```

**Code:**

````yaml
```chart
options:
  plugins:
    colorschemes:
      scheme: office.Excel16
```
````

---

## Tableau Schemes

Tableau visualization color schemes:

```chart
type: pie
data:
  labels: [Red, Blue, Yellow, Green, Purple, Orange, Pink, Brown]
  datasets:
    - data: [12, 19, 3, 5, 2, 3, 7, 4]
options:
  plugins:
    colorschemes:
      scheme: tableau.Tableau10
    title:
      display: true
      text: Tableau10 Scheme
```

**Code:**

````yaml
```chart
options:
  plugins:
    colorschemes:
      scheme: tableau.Tableau10
```
````

---

## Reversed Colors

Reverse the order of colors in a scheme:

```chart
type: doughnut
data:
  labels: [A, B, C, D, E, F]
  datasets:
    - data: [30, 25, 20, 15, 7, 3]
options:
  plugins:
    colorschemes:
      scheme: brewer.Blues6
      reverse: true
    title:
      display: true
      text: Reversed Blues6 Scheme
```

**Code:**

````yaml
```chart
options:
  plugins:
    colorschemes:
      scheme: brewer.Blues6
      reverse: true
```
````

---

## Fill Alpha

Control the transparency of fill colors:

```chart
type: line
data:
  labels: [Q1, Q2, Q3, Q4]
  datasets:
    - label: Revenue
      data: [100, 150, 180, 220]
      fill: true
    - label: Expenses
      data: [80, 120, 140, 160]
      fill: true
options:
  plugins:
    colorschemes:
      scheme: brewer.Set1_3
      fillAlpha: 0.3
    title:
      display: true
      text: Fill Alpha 0.3
```

**Code:**

````yaml
```chart
options:
  plugins:
    colorschemes:
      scheme: brewer.Set1_3
      fillAlpha: 0.3
```
````

---

## Polar Area with Scheme

```chart
type: polarArea
data:
  labels: [Speed, Reliability, Comfort, Safety, Efficiency]
  datasets:
    - data: [11, 16, 7, 14, 10]
options:
  plugins:
    colorschemes:
      scheme: brewer.Spectral5
    title:
      display: true
      text: Spectral5 Color Scheme
```

**Code:**

````yaml
```chart
type: polarArea
options:
  plugins:
    colorschemes:
      scheme: brewer.Spectral5
```
````

---

## Radar Chart

```chart
type: radar
data:
  labels: [Eating, Drinking, Sleeping, Designing, Coding, Running]
  datasets:
    - label: Person A
      data: [65, 59, 90, 81, 56, 55]
    - label: Person B
      data: [28, 48, 40, 19, 96, 27]
    - label: Person C
      data: [45, 75, 60, 50, 70, 40]
options:
  plugins:
    colorschemes:
      scheme: brewer.Dark2_3
      fillAlpha: 0.2
    title:
      display: true
      text: Dark2 Color Scheme
```

**Code:**

````yaml
```chart
type: radar
options:
  plugins:
    colorschemes:
      scheme: brewer.Dark2_3
      fillAlpha: 0.2
```
````

---

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `scheme` | string/array | `'brewer.Paired12'` | Color scheme name or array of colors |
| `fillAlpha` | number | `0.5` | Fill transparency (0.0 - 1.0) |
| `reverse` | boolean | `false` | Reverse color order |
| `override` | boolean | `false` | Override existing color settings |

---

## Popular Color Schemes

### ColorBrewer Schemes

| Category | Schemes |
|----------|---------|
| **Sequential** | `brewer.Blues`, `brewer.Greens`, `brewer.Oranges`, `brewer.Reds`, `brewer.Purples` |
| **Diverging** | `brewer.Spectral`, `brewer.RdYlGn`, `brewer.RdYlBu`, `brewer.BrBG` |
| **Qualitative** | `brewer.Paired12`, `brewer.Set1_9`, `brewer.Set2_8`, `brewer.Set3_12`, `brewer.Dark2_8` |

### Office Schemes

| Scheme | Description |
|--------|-------------|
| `office.Excel16` | Excel 2016 default colors |
| `office.Office6` | Office standard 6 colors |
| `office.Aspect6` | Aspect theme colors |

### Tableau Schemes

| Scheme | Description |
|--------|-------------|
| `tableau.Tableau10` | Tableau 10 default colors |
| `tableau.Tableau20` | Extended 20 colors |
| `tableau.ColorBlind10` | Color blind friendly |

---

## Custom Color Array

You can also provide a custom array of colors:

```yaml
options:
  plugins:
    colorschemes:
      scheme:
        - '#FF6384'
        - '#36A2EB'
        - '#FFCE56'
        - '#4BC0C0'
        - '#9966FF'
```

---

## Override Existing Colors

Use `override: true` to replace colors even if they're already defined:

```yaml
options:
  plugins:
    colorschemes:
      scheme: tableau.Tableau10
      override: true
```

---

## Resources

- [Color Chart Reference](https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html)
- [GitHub Repository](https://github.com/nicwest/chartjs-plugin-colorschemes)
- [ColorBrewer](https://colorbrewer2.org/)
