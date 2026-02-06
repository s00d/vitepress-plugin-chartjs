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
