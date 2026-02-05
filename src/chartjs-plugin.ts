import type { Plugin } from "vite";
import type { PluginConfig } from "./config";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

export interface ChartjsPluginConfig {
  class?: string;
}

const DEFAULT_OPTIONS: PluginConfig = {};

// Get VpChart.vue path relative to this module
const __dirname = dirname(fileURLToPath(import.meta.url));
const vpChartPath = resolve(__dirname, "VpChart.vue");

export function ChartjsPlugin(
  inlineOptions?: Partial<PluginConfig>
): Plugin {
  const options = {
    ...DEFAULT_OPTIONS,
    ...inlineOptions,
  };

  const virtualModuleId = "virtual:chartjs-config";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  const vpChartModuleId = "vitepress-plugin-chartjs/VpChart.vue";

  return {
    name: "vitepress-plugin-chartjs",
    enforce: "pre",

    transform(src, id) {
      // Register VpChart component in vue instance creation
      if (id.includes("vitepress/dist/client/app/index.js")) {
        src =
          `\nimport VpChart from '${vpChartModuleId}';\n` +
          src;

        const lines = src.split("\n");

        const targetLineIndex = lines.findIndex((line) =>
          line.includes("app.component")
        );

        lines.splice(
          targetLineIndex,
          0,
          '  app.component("VpChart", VpChart);'
        );

        src = lines.join("\n");

        return {
          code: src,
          map: null,
        };
      }
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      // Resolve VpChart.vue to the actual file path
      if (id === vpChartModuleId) {
        return vpChartPath;
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(options)};`;
      }
    },
  };
}
