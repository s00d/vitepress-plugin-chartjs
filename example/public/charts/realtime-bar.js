// Bar chart with dynamically generated data
// Demonstrates async config generation

export default async function() {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports', 'Home'];
  
  // Generate sales data
  const salesData = categories.map(() => Math.floor(Math.random() * 500) + 100);
  const profitData = salesData.map(sale => Math.floor(sale * (0.1 + Math.random() * 0.3)));
  
  return {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Sales ($K)',
          data: salesData,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Profit ($K)',
          data: profitData,
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Sales & Profit by Category (Async JS)'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}
