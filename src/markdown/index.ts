import YAML from 'yaml';
import type { ChartConfig, PluginConfig } from '../config';
import { validateChartData, DEFAULT_COLORS } from '../config';
import { resolveUrl } from './resolver';

// Re-export schemas and types from config
export { ChartConfigSchema, UrlConfigSchema, validateChartData, validateChartInput } from '../config';
export type { ChartConfig, ChartBlock, UrlConfig, ChartData, ChartOptions, DatasetConfig, SupportedChartType, ValidationResult } from '../config';

export { resolveUrl } from './resolver';
export type { ResolveResult } from './resolver';

// ─── Helpers ─────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escape a JSON string for use inside a single-quoted HTML attribute. */
function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;');
}

function renderError(
  title: string,
  messages: string[],
  warnings: string[] = [],
): string {
  const body =
    messages.length === 1
      ? `<p style="margin:0">${escapeHtml(messages[0])}</p>`
      : `<ul style="margin:0;padding-left:1.2em">${messages.map(m => `<li>${escapeHtml(m)}</li>`).join('')}</ul>`;

  const warnBody =
    warnings.length > 0
      ? `<ul style="margin:0.5em 0 0;padding-left:1.2em;color:#b7791f">${warnings.map(w => `<li>${escapeHtml(w)}</li>`).join('')}</ul>`
      : '';

  return (
    `<div class="chartjs-error" style="color: #e53e3e; padding: 1rem; border: 1px solid #e53e3e; border-radius: 4px; margin: 1rem 0; background: #fff5f5;">` +
    `<strong>${escapeHtml(title)}:</strong> ${body}${warnBody}` +
    `</div>`
  );
}

function renderWarning(warnings: string[]): string {
  if (warnings.length === 0) return '';
  const list = warnings.map(w => `<li>${escapeHtml(w)}</li>`).join('');
  return (
    `<div class="chartjs-warning" style="color: #b7791f; padding: 0.75rem 1rem; border: 1px solid #ecc94b; border-radius: 4px; margin: 1rem 0 0; background: #fffff0;">` +
    `<strong>Warning:</strong>` +
    `<ul style="margin:0.25em 0 0;padding-left:1.2em">${list}</ul>` +
    `</div>`
  );
}

// ─── Default options & colors ────────────────────────────────────────

const DEFAULT_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
};

// ─── Deep merge ──────────────────────────────────────────────────────

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

// ─── Apply default colors ────────────────────────────────────────────

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

// ─── Process chart config ────────────────────────────────────────────

function processConfig(config: any, pluginOptions: PluginConfig, colors: string[]): any {
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

  return config;
}

// ─── Markdown-it plugin ─────────────────────────────────────────────
//
// **Data-First architecture**: ALL parsing, validation and file I/O
// happens here at build time. The Vue component receives only
// pre-computed data and never touches YAML, the filesystem, or fetch.
//
// What happens where:
//   Build-time (this file):
//     • YAML / JSON parsing
//     • `url:` → build-time resolution (local files, HTTP, JS modules)
//     • Default options / color application
//     • Error HTML rendering
//   Client-side (Vue component):
//     • Decode JSON from `data` prop → render chart (that's it!)

export const ChartjsMarkdown = (md: any, pluginOptions: PluginConfig = {}) => {
  const colors = pluginOptions.colorPalette || DEFAULT_COLORS;
  const rootDir = pluginOptions.root || process.cwd();

  const fence =
    md.renderer.rules.fence?.bind(md.renderer.rules) ||
    ((tokens: any, idx: any, options: any, _env: any, self: any) =>
      self.renderToken(tokens, idx, options));

  // ── Helper: build <VpChart /> tag ──────────────────────────────
  function buildTag(dataAttr: string, height: string, chartId: string): string {
    return `<VpChart id="${chartId}" ${dataAttr} height="${height}" />`;
  }

  function encodeData(config: any): string {
    return `:data='${escapeAttr(JSON.stringify(config))}'`;
  }

  // ── Fence renderer ─────────────────────────────────────────────
  md.renderer.rules.fence = (
    tokens: any,
    idx: number,
    options: any,
    _env: any,
    self: any,
  ) => {
    const token = tokens[idx];
    const info = token.info.trim().toLowerCase();

    if (info !== 'chart' && info !== 'chartjs') {
      return fence(tokens, idx, options, _env, self);
    }

    const chartId = `chart-${idx}`;

    try {
      const content = token.content.trim();
      let config: any;

      // ── Parse YAML/JSON ───────────────────────────────────
      try {
        config = YAML.parse(content);
      } catch {
        try {
          config = JSON.parse(content);
        } catch (e: any) {
          return renderError('YAML Syntax Error', [e.message || 'Unknown error']);
        }
      }

      // ── Validate with Zod ─────────────────────────────────
      const validation = validateChartData(config);
      if (!validation.valid) {
        return renderError(
          'Invalid Chart Configuration',
          validation.errors,
          validation.warnings,
        );
      }

      // ── 1. URL directive → build-time resolution ─────────
      if (config && config.url) {
        const url = String(config.url);
        const height = config.height || pluginOptions.defaultHeight || '400px';

        const result = resolveUrl(url, rootDir);
        if (result.type === 'data') {
          // Validate resolved data too
          const resolvedValidation = validateChartData(result.data);
          if (!resolvedValidation.valid) {
            return renderError(
              'Invalid Chart Configuration',
              resolvedValidation.errors,
              resolvedValidation.warnings,
            );
          }

          let resolvedConfig = result.data;
          resolvedConfig = processConfig(resolvedConfig, pluginOptions, colors);

          const warningHtml = renderWarning(resolvedValidation.warnings);
          return warningHtml + buildTag(encodeData(resolvedConfig), String(height), chartId);
        }
        return renderError('Chart.js Error', [result.error!]);
      }

      // ── 2. Inline config ─────────────────────────────────
      const height = config.height || pluginOptions.defaultHeight || '400px';
      // Remove layout props from chart config
      delete config.height;
      delete config.width;

      config = processConfig(config, pluginOptions, colors);

      const warningHtml = renderWarning(validation.warnings);
      return warningHtml + buildTag(encodeData(config), String(height), chartId);
    } catch (e: any) {
      const errorMsg = e.message || 'Unknown error';
      return renderError('Chart.js Error', [errorMsg]);
    }
  };
};
