// US States Choropleth Map
export default async function() {
  // Load topojson-client for parsing TopoJSON data
  const topojson = await import('https://esm.sh/topojson-client@3')
  
  const response = await fetch('https://unpkg.com/us-atlas/states-10m.json')
  const us = await response.json()
  
  const nation = topojson.feature(us, us.objects.nation).features[0]
  const states = topojson.feature(us, us.objects.states).features
  
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
          projection: 'albersUsa'
        },
        color: {
          axis: 'x',
          quantize: 5,
          legend: {
            display: false
          }
        }
      }
    }
  }
}
