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
      datasets: [
        {
          label: 'Countries',
          outline: land,
          data: countries.map((d) => ({ feature: d, value: Math.random() * 10 })),
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        datalabels: { display: false },
      },
      scales: {
        projection: {
          axis: 'x',
          projection: 'equalEarth',
        },
        color: {
          axis: 'x',
          quantize: 5,
          legend: {
            position: 'bottom-right',
          },
        },
      },
    },
  };
}
