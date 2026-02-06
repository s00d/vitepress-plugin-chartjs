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
