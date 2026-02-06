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
