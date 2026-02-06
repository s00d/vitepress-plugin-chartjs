// World Countries Choropleth Map
export default async function() {
  // Load topojson-client for parsing TopoJSON data
  const topojson = await import('https://esm.sh/topojson-client@3')
  
  const response = await fetch('https://unpkg.com/world-atlas/countries-50m.json')
  const world = await response.json()
  
  const land = topojson.feature(world, world.objects.land).features[0]
  const countries = topojson.feature(world, world.objects.countries).features
  
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
        datalabels: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.chart.data.labels[context.dataIndex]
              const value = context.raw.value
              return `${label}: ${value.toFixed(1)}`
            }
          }
        }
      },
      scales: {
        projection: {
          axis: 'x',
          projection: 'equalEarth'
        },
        color: {
          axis: 'x',
          quantize: 5,
          legend: {
            position: 'bottom-right'
          }
        }
      }
    }
  }
}
