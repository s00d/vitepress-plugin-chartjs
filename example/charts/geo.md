# Geographic Charts

Choropleth and Bubble Map charts for geographic data visualization.

## Registration

Add to `.vitepress/theme/index.ts`:

```typescript
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-chartjs/style.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)

      const geo = await import('chartjs-chart-geo')
      Chart.register(
        geo.ChoroplethController,
        geo.BubbleMapController,
        geo.GeoFeature,
        geo.ProjectionScale,
        geo.ColorScale,
        geo.SizeScale
      )
    }
  }
}
```

::: tip Installation
```bash
npm install chartjs-chart-geo topojson-client
```
:::

---

## Loading from External File

The recommended way to create geo charts with real map data is using JavaScript configuration files. JS modules run at **build time** in Node.js, so use installed npm packages (not browser imports).

### US States Map

```chart
url: /charts/us-states.js
height: 350px
```

**Code:** | [View Config](/charts/us-states.js)

````yaml
```chart
url: /charts/us-states.js
```
````

::: details View us-states.js source
```javascript
// US States Choropleth Map
// Build-time: uses Node.js fetch + installed topojson-client
import * as topojson from 'topojson-client';

export default async function () {
  const response = await fetch('https://unpkg.com/us-atlas/states-10m.json');
  const us = await response.json();

  const nation = topojson.feature(us, us.objects.nation).features[0];
  const states = topojson.feature(us, us.objects.states).features;

  return {
    type: 'choropleth',
    data: {
      labels: states.map((d) => d.properties.name),
      datasets: [{
        label: 'States',
        outline: nation,
        data: states.map((d) => ({ feature: d, value: Math.random() * 10 }))
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        datalabels: { display: false }
      },
      scales: {
        projection: { axis: 'x', projection: 'albersUsa' },
        color: { axis: 'x', quantize: 5, legend: { display: false } }
      }
    }
  }
}
```
:::

---

### World Countries Map

```chart
url: /charts/world-countries.js
height: 350px
```

**Code:** | [View Config](/charts/world-countries.js)

````yaml
```chart
url: /charts/world-countries.js
```
````

::: details View world-countries.js source
```javascript
// World Countries Choropleth Map
// Build-time: uses Node.js fetch + installed topojson-client
import * as topojson from 'topojson-client';

export default async function () {
  const response = await fetch('https://unpkg.com/world-atlas/countries-50m.json');
  const world = await response.json();

  const land = topojson.feature(world, world.objects.land).features[0];
  const countries = topojson.feature(world, world.objects.countries).features;

  return {
    type: 'choropleth',
    data: {
      labels: countries.map((d) => d.properties.name),
      datasets: [{
        label: 'Countries',
        outline: land,
        data: countries.map((d) => ({ feature: d, value: Math.random() * 10 }))
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        datalabels: { display: false }
      },
      scales: {
        projection: { axis: 'x', projection: 'equalEarth' },
        color: { axis: 'x', quantize: 5, legend: { position: 'bottom-right' } }
      }
    }
  }
}
```
:::

---

## Inline Data Examples

For simple maps without external data, you can define geometry inline.

### Choropleth (Inline)

```chart
type: choropleth
data:
  labels: [France, Germany, Italy, Spain, Poland]
  datasets:
    - label: GDP (billions)
      outline:
        type: Feature
        properties: {}
        geometry:
          type: Polygon
          coordinates: [[[-10, 35], [30, 35], [30, 60], [-10, 60], [-10, 35]]]
      data:
        - feature:
            type: Feature
            properties:
              name: France
            geometry:
              type: Polygon
              coordinates: [[[-5, 42], [8, 42], [8, 51], [-5, 51], [-5, 42]]]
          value: 2778
        - feature:
            type: Feature
            properties:
              name: Germany
            geometry:
              type: Polygon
              coordinates: [[[6, 47], [15, 47], [15, 55], [6, 55], [6, 47]]]
          value: 4072
        - feature:
            type: Feature
            properties:
              name: Italy
            geometry:
              type: Polygon
              coordinates: [[[7, 37], [18, 37], [18, 47], [7, 47], [7, 37]]]
          value: 2100
        - feature:
            type: Feature
            properties:
              name: Spain
            geometry:
              type: Polygon
              coordinates: [[[-9, 36], [3, 36], [3, 44], [-9, 44], [-9, 36]]]
          value: 1397
        - feature:
            type: Feature
            properties:
              name: Poland
            geometry:
              type: Polygon
              coordinates: [[[14, 49], [24, 49], [24, 55], [14, 55], [14, 49]]]
          value: 688
options:
  plugins:
    title:
      display: true
      text: European Countries GDP (Simplified)
    legend:
      display: false
  scales:
    projection:
      axis: x
      projection: equirectangular
    color:
      axis: x
      quantize: 5
      legend:
        position: bottom-right
```

---

### Bubble Map (Inline)

```chart
type: bubbleMap
data:
  labels: [Tokyo, Delhi, Shanghai, São Paulo, Mexico City, Cairo, Mumbai, Beijing, Dhaka, Osaka]
  datasets:
    - label: Population (millions)
      outline:
        type: Feature
        properties: {}
        geometry:
          type: Polygon
          coordinates: [[[-180, -60], [180, -60], [180, 80], [-180, 80], [-180, -60]]]
      data:
        - latitude: 35.6762
          longitude: 139.6503
          value: 37.4
        - latitude: 28.7041
          longitude: 77.1025
          value: 32.9
        - latitude: 31.2304
          longitude: 121.4737
          value: 28.5
        - latitude: -23.5505
          longitude: -46.6333
          value: 22.4
        - latitude: 19.4326
          longitude: -99.1332
          value: 21.9
        - latitude: 30.0444
          longitude: 31.2357
          value: 21.3
        - latitude: 19.0760
          longitude: 72.8777
          value: 21.0
        - latitude: 39.9042
          longitude: 116.4074
          value: 20.9
        - latitude: 23.8103
          longitude: 90.4125
          value: 22.5
        - latitude: 34.6937
          longitude: 135.5023
          value: 19.1
options:
  plugins:
    title:
      display: true
      text: World's Largest Cities by Population
    legend:
      display: false
  scales:
    projection:
      axis: x
      projection: equirectangular
    size:
      axis: x
      size: [5, 30]
```

---

## Configuration Reference

### Projection Types

| Projection | Description |
|------------|-------------|
| `equirectangular` | Simple cylindrical projection |
| `mercator` | Standard web map projection |
| `albersUsa` | Optimized for USA maps |
| `naturalEarth1` | Pseudo-cylindrical projection |
| `equalEarth` | Equal-area projection |
| `orthographic` | Globe view |

### Scales

```yaml
options:
  scales:
    projection:
      axis: x
      projection: mercator
    color:
      axis: x
      quantize: 5
      interpolate: blues
      legend:
        position: bottom-right
    size:                   # For bubbleMap
      axis: x
      size: [5, 30]
```

### Data Formats

**Choropleth:**
```yaml
data:
  - feature: <GeoJSON Feature>
    value: 100
```

**Bubble Map:**
```yaml
data:
  - latitude: 40.7128
    longitude: -74.006
    value: 1000
```

---

## Resources

- [chartjs-chart-geo](https://github.com/sgratzl/chartjs-chart-geo) - Plugin documentation
- [Natural Earth](https://www.naturalearthdata.com/) - Free GeoJSON data
- [US Atlas TopoJSON](https://github.com/topojson/us-atlas) - US states and counties
- [World Atlas TopoJSON](https://github.com/topojson/world-atlas) - World countries
