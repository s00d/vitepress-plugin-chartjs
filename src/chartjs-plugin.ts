import type { Plugin } from 'vite';
import type { PluginConfig } from './config';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function ChartjsPlugin(_inlineOptions?: Partial<PluginConfig>): Plugin {
  const vpChartModuleId = 'vitepress-plugin-chartjs/client';

  return {
    name: 'vitepress-plugin-chartjs',
    enforce: 'pre',

    transform(src, id) {
      if (id.includes('vitepress/dist/client/app/index.js')) {
        src = `\nimport VpChart from '${vpChartModuleId}';\n` + src;

        const lines = src.split('\n');
        const targetLineIndex = lines.findIndex((line) => line.includes('app.component'));

        if (targetLineIndex !== -1) {
          lines.splice(targetLineIndex, 0, '  app.component("VpChart", VpChart);');
        }
        src = lines.join('\n');

        return { code: src, map: null };
      }
    },

    resolveId(id) {
      if (id === vpChartModuleId) {
        // 1. Dev mode: source .ts file exists next to this file
        const devPath = resolve(__dirname, 'client.ts');
        if (existsSync(devPath)) {
          return devPath;
        }

        // 2. Production: compiled .mjs (ES module)
        const prodMjs = resolve(__dirname, 'client.mjs');
        if (existsSync(prodMjs)) {
          return prodMjs;
        }

        // 3. Fallback: .js
        const prodJs = resolve(__dirname, 'client.js');
        if (existsSync(prodJs)) {
          return prodJs;
        }
      }
    },
  };
}
