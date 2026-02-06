// Dynamic chart configuration with JavaScript
// This file exports a function that generates chart config

export default function() {
  // Generate random data
  const generateData = (count, min, max) => {
    return Array.from({ length: count }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Revenue 2024',
          data: generateData(12, 50, 150),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Revenue 2023',
          data: generateData(12, 40, 120),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Dynamic Data (Generated with JavaScript)'
        }
      }
    }
  };
}
