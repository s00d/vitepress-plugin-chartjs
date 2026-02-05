import YAML from 'yaml';
import type { ChartConfig, PluginConfig } from './config';

// --- Helpers ---

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);
  
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  const result = { ...target };
  
  Object.keys(source).forEach(key => {
    const targetValue = result[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      result[key] = [...sourceValue];
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      result[key] = deepMerge({ ...targetValue }, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  });

  return result;
}

const DEFAULT_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
};

const DEFAULT_COLORS = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(255, 99, 255, 0.8)',
  'rgba(99, 255, 132, 0.8)',
];

function applyDefaultColors(config: ChartConfig, colors: string[]): ChartConfig {
  if (!config.data?.datasets) return config;
  
  config.data.datasets = config.data.datasets.map((dataset, index) => {
    const color = colors[index % colors.length];
    const borderColor = color.replace(/[\d.]+\)$/, '1)');
    
    if (config.type === 'line' || config.type === 'radar') {
      return {
        ...dataset,
        borderColor: dataset.borderColor || borderColor,
        backgroundColor: dataset.backgroundColor || color,
      };
    } else if (config.type === 'bar') {
      return {
        ...dataset,
        backgroundColor: dataset.backgroundColor || color,
        borderColor: dataset.borderColor || borderColor,
        borderWidth: (dataset as any).borderWidth ?? 1,
      };
    } else if (config.type === 'pie' || config.type === 'doughnut' || config.type === 'polarArea') {
      if (!dataset.backgroundColor) {
        const dataLength = Array.isArray(dataset.data) ? dataset.data.length : 0;
        const bgColors = Array.from({ length: dataLength }, (_, i) => colors[i % colors.length]);
        const borderColors = bgColors.map(c => c.replace(/[\d.]+\)$/, '1)'));
        return {
          ...dataset,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: (dataset as any).borderWidth ?? 1,
        };
      }
      return dataset;
    } else if (config.type === 'scatter' || config.type === 'bubble') {
      return {
        ...dataset,
        backgroundColor: dataset.backgroundColor || color,
        borderColor: dataset.borderColor || borderColor,
      };
    }
    
    return dataset;
  });
  
  return config;
}

// --- Markdown Plugin ---

export const ChartjsMarkdown = (md: any, pluginOptions: PluginConfig = {}) => {
  const colors = pluginOptions.colorPalette || DEFAULT_COLORS;
  const fence = md.renderer.rules.fence?.bind(md.renderer.rules) ||
    ((tokens: any, idx: any, options: any, _env: any, self: any) => self.renderToken(tokens, idx, options));

  md.renderer.rules.fence = (tokens: any, idx: number, options: any, _env: any, self: any) => {
    const token = tokens[idx];
    const info = token.info.trim().toLowerCase();

    if (info === 'chart' || info === 'chartjs') {
      try {
        const content = token.content.trim();
        let config: ChartConfig;
        
        try {
          config = YAML.parse(content);
        } catch {
          config = JSON.parse(content);
        }

        if (!config || !config.type) {
          throw new Error('Invalid chart config: missing "type"');
        }

        const validTypes = ['line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea', 'bubble', 'scatter'];
        if (!validTypes.includes(config.type)) {
          throw new Error(`Invalid chart type: "${config.type}". Must be one of: ${validTypes.join(', ')}`);
        }

        if (pluginOptions.defaultOptions) {
          config.options = deepMerge(pluginOptions.defaultOptions, config.options || {});
        }
        config.options = deepMerge(DEFAULT_OPTIONS, config.options || {});

        config = applyDefaultColors(config, colors);

        if (!config.options) config.options = {};
        if (!config.options.plugins) config.options.plugins = {};

        if (pluginOptions.enableZoom && !config.options.plugins.zoom) {
          config.options.plugins.zoom = {
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: 'xy',
            },
            pan: {
              enabled: true,
              mode: 'xy',
            },
          };
        }

        if (config.options.plugins.datalabels === undefined) {
          config.options.plugins.datalabels = pluginOptions.enableDatalabels ? {} : false;
        }

        const height = pluginOptions.defaultHeight || '400px';
        const chartId = `chart-${idx}`;
        const encodedConfig = encodeURIComponent(JSON.stringify(config));

        // Return Vue component with Suspense for async loading
        return `
<Suspense>
  <template #default>
    <VpChart id="${chartId}" config="${encodedConfig}" height="${height}" />
  </template>
  <template #fallback>
    <div class="vp-chart-loading" style="height: ${height}; display: flex; align-items: center; justify-content: center; background: var(--vp-c-bg-soft); border-radius: 8px; margin: 1em 0;">
      Loading chart...
    </div>
  </template>
</Suspense>`;

      } catch (e: any) {
        const errorMsg = e.message || 'Unknown error';
        return `<div class="chartjs-error" style="color: #e53e3e; padding: 1rem; border: 1px solid #e53e3e; border-radius: 4px; margin: 1rem 0; background: #fff5f5;"><strong>Chart.js Error:</strong> ${md.utils.escapeHtml(errorMsg)}</div>`;
      }
    }

    return fence(tokens, idx, options, _env, self);
  };
};
