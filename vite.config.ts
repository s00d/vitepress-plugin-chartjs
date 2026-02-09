import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const isWatch = process.argv.includes("--watch");

export default defineConfig({
  plugins: [
    vue(),
    dts({
      // In watch mode: generate individual .d.ts files (fast).
      // In production: bundle into single .d.ts via api-extractor.
      rollupTypes: !isWatch,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  build: {
    minify: false,
    // In watch mode, don't wipe dist/ — prevents race condition with VitePress dev server
    emptyOutDir: !isWatch,
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        client: path.resolve(__dirname, "src/client.ts"),
      },
    },
    rollupOptions: {
      external: [
        "vue",
        "vitepress",
        "fs",
        "path",
        "url",
        "child_process",
        "yaml",
        "chart.js",
        "zod",
      ],
      output: [
        {
          format: "es",
          exports: "named",
          entryFileNames: "[name].mjs",
          globals: {
            vue: "Vue",
            yaml: "YAML",
            "chart.js": "ChartJS",
          },
          assetFileNames: "style.css",
        },
        {
          format: "cjs",
          exports: "named",
          entryFileNames: "[name].cjs",
          globals: {
            vue: "Vue",
            yaml: "YAML",
            "chart.js": "ChartJS",
          },
          assetFileNames: "style.css",
        },
      ],
    },
  },
});
