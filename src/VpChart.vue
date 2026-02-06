<template>
  <div ref="wrapperRef" class="vp-chart-wrapper" :style="{ height: height }">
    <canvas v-if="isVisible" ref="canvasRef" :id="id"></canvas>
    <div v-else class="vp-chart-placeholder">
      <span>Loading chart...</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useData } from 'vitepress';
import { 
  Chart, 
  registerables 
} from 'chart.js';

// Register all Chart.js built-in components
Chart.register(...registerables);

// Note: All plugins and chart type extensions (boxplot, geo, matrix, etc.)
// must be registered by the user in .vitepress/theme/index.ts
// See documentation: /plugins/setup

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  config: {
    type: String,
    required: false,
    default: '',
  },
  configUrl: {
    type: String,
    required: false,
    default: '',
  },
  height: {
    type: String,
    required: false,
    default: '400px',
  },
  refreshInterval: {
    type: Number,
    required: false,
    default: 0,
  },
});

const wrapperRef = ref(null);
const isVisible = ref(false);
let observer = null;

// Load config from URL (supports YAML, JSON, and JS modules)
const loadConfigFromUrl = async (url) => {
  try {
    // Check if it's a JS file - use dynamic import
    if (url.endsWith('.js') || url.endsWith('.mjs')) {
      // For JS files, we need to import as ES module
      // The URL should be absolute or relative to the base
      const absoluteUrl = url.startsWith('http') ? url : new URL(url, window.location.origin).href;
      const module = await import(/* @vite-ignore */ absoluteUrl);
      
      // Support both default export and named 'config' export
      // Also support function that returns config (async or sync)
      let config = module.default || module.config || module;
      
      if (typeof config === 'function') {
        config = await config();
      }
      
      return config;
    }
    
    // For YAML/JSON files, fetch and parse
    const response = await fetch(url);
    const text = await response.text();
    
    // Try to parse as YAML first, then JSON
    try {
      const yaml = await import('yaml');
      return yaml.parse(text);
    } catch {
      return JSON.parse(text);
    }
  } catch (e) {
    console.error('[VpChart] Failed to load config from URL:', e);
    throw e;
  }
};

const canvasRef = ref(null);
let chartInstance = null;
let refreshTimer = null;

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

// Refresh chart data from URL
const refreshChartData = async () => {
  if (!chartInstance || !props.configUrl) return;
  
  try {
    const newConfig = await loadConfigFromUrl(props.configUrl);
    
    // Update chart data
    if (newConfig.data) {
      chartInstance.data.labels = newConfig.data.labels || chartInstance.data.labels;
      
      newConfig.data.datasets?.forEach((dataset, index) => {
        if (chartInstance.data.datasets[index]) {
          // Update existing dataset
          chartInstance.data.datasets[index].data = dataset.data;
          // Optionally update other properties
          if (dataset.backgroundColor) {
            chartInstance.data.datasets[index].backgroundColor = dataset.backgroundColor;
          }
          if (dataset.borderColor) {
            chartInstance.data.datasets[index].borderColor = dataset.borderColor;
          }
        } else {
          // Add new dataset
          chartInstance.data.datasets.push(dataset);
        }
      });
      
      // Remove extra datasets if new config has fewer
      if (newConfig.data.datasets && chartInstance.data.datasets.length > newConfig.data.datasets.length) {
        chartInstance.data.datasets.length = newConfig.data.datasets.length;
      }
    }
    
    chartInstance.update('none');
  } catch (e) {
    console.error('[VpChart] Failed to refresh chart data:', e);
  }
};

// Start auto-refresh timer
const startRefreshTimer = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
  
  if (props.refreshInterval > 0 && props.configUrl) {
    refreshTimer = setInterval(refreshChartData, props.refreshInterval);
  }
};

// Stop auto-refresh timer
const stopRefreshTimer = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
};

// Initialize chart
const initChart = async () => {
  if (!canvasRef.value) return;
  
  // Destroy old instance if exists (HMR)
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
  
  // Stop existing refresh timer
  stopRefreshTimer();

  try {
    let config;
    
    // Load config from URL or parse from props
    if (props.configUrl) {
      config = await loadConfigFromUrl(props.configUrl);
    } else if (props.config) {
      config = JSON.parse(decodeURIComponent(props.config));
    } else {
      console.error('[VpChart] No config or configUrl provided');
      return;
    }
    
    chartInstance = new Chart(canvasRef.value, config);
    updateTheme();
    
    // Start auto-refresh if interval is set
    startRefreshTimer();
  } catch (e) {
    console.error('[VpChart] Failed to init chart:', e);
  }
};

onMounted(() => {
  // Use IntersectionObserver for lazy loading
  if (typeof IntersectionObserver !== 'undefined' && wrapperRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            nextTick(initChart);
          } else {
            // Pause refresh when not visible
            stopRefreshTimer();
          }
        });
      },
      {
        rootMargin: '100px', // Load slightly before visible
        threshold: 0
      }
    );
    observer.observe(wrapperRef.value);
  } else {
    // Fallback for SSR or no IntersectionObserver support
    isVisible.value = true;
    nextTick(initChart);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  stopRefreshTimer();
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});

// React to theme changes
watch(isDark, () => {
  updateTheme();
});

// Resume refresh when becoming visible again
watch(isVisible, (visible) => {
  if (visible && chartInstance) {
    startRefreshTimer();
  }
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

.vp-chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--vp-c-text-2, #666);
  font-size: 14px;
}
</style>
