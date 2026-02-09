<template>
  <div ref="wrapperRef" class="vp-chart-wrapper" :style="{ height: height }">
    <canvas v-show="isVisible" ref="canvasRef" :id="id"></canvas>
    <div v-show="!isVisible" class="vp-chart-placeholder">
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
  /** Pre-parsed chart configuration (resolved at build time). */
  data: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: String,
    default: '400px',
  },
});

const wrapperRef = ref(null);
const canvasRef = ref(null);
const isVisible = ref(false);
let chartInstance = null;
let observer = null;

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
const initChart = () => {
  if (!canvasRef.value) return;

  // Destroy old instance if exists (HMR)
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  try {
    const config = props.data;

    if (!config || !config.type) {
      console.error('[VpChart] No valid config provided');
      return;
    }

    chartInstance = new Chart(canvasRef.value, config);
    updateTheme();
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
          }
        });
      },
      {
        rootMargin: '100px',
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
