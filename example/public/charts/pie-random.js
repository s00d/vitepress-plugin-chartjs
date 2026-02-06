// Pie chart with random distribution
// Export config object directly

const segments = ['Segment A', 'Segment B', 'Segment C', 'Segment D', 'Segment E'];

// Generate random percentages that sum to 100
function generatePercentages(count) {
  const values = Array.from({ length: count }, () => Math.random());
  const sum = values.reduce((a, b) => a + b, 0);
  return values.map(v => Math.round((v / sum) * 100));
}

const data = generatePercentages(segments.length);

export default {
  type: 'pie',
  data: {
    labels: segments,
    datasets: [{
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ],
      borderWidth: 2
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Random Distribution (JS Object Export)'
      },
      legend: {
        position: 'right'
      }
    }
  }
};
