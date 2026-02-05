import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/VpChart.vue",
          dest: "./",
        },
      ],
    }),
    dts(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ChartjsPlugin",
      fileName: (format: string) =>
        format == "es"
          ? `vitepress-plugin-chartjs.${format}.mjs`
          : `vitepress-plugin-chartjs.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "vitepress",
        "vite",
        "yaml",
        "chart.js",
        "chartjs-plugin-zoom",
        "chartjs-plugin-datalabels",
        "chartjs-plugin-annotation",
        "path",
        "url",
      ],
      output: {
        globals: {
          vue: "Vue",
          yaml: "YAML",
          path: "path",
          url: "url",
        },
      },
    },
  },
});
