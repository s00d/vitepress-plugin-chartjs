<template>
  <div class="vp-chart-wrapper" :style="{ height: height }">
    <canvas ref="canvasRef" :id="id"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, toRaw, watch, nextTick } from 'vue';
import { useData } from 'vitepress';
import { 
  Chart, 
  registerables 
} from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

// Track which plugins are already registered
const registeredPlugins = {
  zoom: false,
  datalabels: false,
  annotation: false,
};

// Register plugins based on config
const registerRequiredPlugins = async (config) => {
  const plugins = config?.options?.plugins || {};
  
  // Register zoom plugin if needed
  if (plugins.zoom && !registeredPlugins.zoom) {
    try {
      const zoomPlugin = await import('chartjs-plugin-zoom');
      Chart.register(zoomPlugin.default);
      registeredPlugins.zoom = true;
    } catch (e) {
      console.warn('[VpChart] chartjs-plugin-zoom not installed');
    }
  }
  
  // Register datalabels plugin if needed (check if not explicitly false)
  if (plugins.datalabels !== undefined && plugins.datalabels !== false && !registeredPlugins.datalabels) {
    try {
      const dataLabelsPlugin = await import('chartjs-plugin-datalabels');
      Chart.register(dataLabelsPlugin.default);
      registeredPlugins.datalabels = true;
    } catch (e) {
      console.warn('[VpChart] chartjs-plugin-datalabels not installed');
    }
  }
  
  // Register annotation plugin if needed
  if (plugins.annotation && !registeredPlugins.annotation) {
    try {
      const annotationPlugin = await import('chartjs-plugin-annotation');
      Chart.register(annotationPlugin.default);
      registeredPlugins.annotation = true;
    } catch (e) {
      console.warn('[VpChart] chartjs-plugin-annotation not installed');
    }
  }
};

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  config: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: false,
    default: '400px',
  },
});

const canvasRef = ref(null);
let chartInstance = null;

const { isDark } = useData();

// Update theme colors
const updateTheme = () => {
  if (!chartInstance) return;

  const dark = isDark.value;
  const textColor = dark ? '#e5e7eb' : '#374151';
  const gridColor = dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const options = chartInstance.options;

  if (options.scales) {
    Object.values(options.scales).forEach((scale) => {
      if (scale) {
        if (scale.ticks) scale.ticks.color = textColor;
        if (scale.grid) scale.grid.color = gridColor;
        if (scale.title) scale.title.color = textColor;
      }
    });
  }

  if (options.plugins) {
    if (options.plugins.legend?.labels) options.plugins.legend.labels.color = textColor;
    if (options.plugins.title) options.plugins.title.color = textColor;
  }

  chartInstance.update('none');
};

// Initialize chart
const initChart = async () => {
  if (!canvasRef.value) return;
  
  // Destroy old instance if exists (HMR)
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  try {
    const config = JSON.parse(decodeURIComponent(props.config));
    
    // Register only required plugins based on config
    await registerRequiredPlugins(config);
    
    chartInstance = new Chart(canvasRef.value, config);
    updateTheme();
  } catch (e) {
    console.error('[VpChart] Failed to init chart:', e);
  }
};

onMounted(() => {
  nextTick(initChart);
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});

// React to theme changes
watch(isDark, () => {
  updateTheme();
});
</script>

<style scoped>
.vp-chart-wrapper {
  position: relative;
  width: 100%;
  margin: 1em 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border-radius: 8px;
}

.vp-chart-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
