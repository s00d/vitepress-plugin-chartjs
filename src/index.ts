import { type UserConfig } from 'vitepress';
import { ChartjsMarkdown } from './markdown';
import { ChartjsPlugin } from './chartjs-plugin';
import type { PluginConfig } from './config';

export { ChartjsMarkdown } from './markdown';
export { ChartjsPlugin } from './chartjs-plugin';
export { resolveUrl } from './markdown';
export type { ResolveResult } from './markdown';
export { validateChartData, validateChartInput } from './config';
export type { ValidationResult } from './config';
export * from './config';

export { UserConfig };

declare module 'vitepress' {
  interface UserConfig {
    chartjs?: PluginConfig;
  }
}

export const withChartjs = (config: UserConfig) => {
  // 1. Markdown config
  if (!config.markdown) config.markdown = {};
  const markdownConfigOriginal = config.markdown.config || (() => {});
  config.markdown.config = (...args) => {
    ChartjsMarkdown(...args, config.chartjs);
    markdownConfigOriginal(...args);
  };

  // 2. Vite plugins
  if (!config.vite) config.vite = {};
  if (!config.vite.plugins) config.vite.plugins = [];
  config.vite.plugins.push(ChartjsPlugin(config.chartjs) as any);

  // 3. Vite optimizeDeps
  if (!config.vite.optimizeDeps) config.vite.optimizeDeps = {};
  if (!config.vite.optimizeDeps.include) config.vite.optimizeDeps.include = [];
  config.vite.optimizeDeps.include.push(
    'chart.js',
    'yaml',
    'zod'
  );

  // 4. SSR
  if (!config.vite.ssr) config.vite.ssr = {};
  if (!config.vite.ssr.noExternal) config.vite.ssr.noExternal = [];
  if (Array.isArray(config.vite.ssr.noExternal)) {
    config.vite.ssr.noExternal.push('vitepress-plugin-chartjs');
  }

  return config;
};
