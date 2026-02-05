declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'chartjs-plugin-zoom' {
  const plugin: any;
  export default plugin;
}

declare module 'chartjs-plugin-datalabels' {
  const plugin: any;
  export default plugin;
}

declare module 'chartjs-plugin-annotation' {
  const plugin: any;
  export default plugin;
}
