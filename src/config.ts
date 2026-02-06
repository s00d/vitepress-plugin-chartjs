/**
 * Supported chart types in Chart.js 4.x
 */
export type SupportedChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'polarArea'
  | 'bubble'
  | 'scatter'
  | 'boxplot'
  | 'violin'
  | 'choropleth'
  | 'bubbleMap'
  | 'matrix'
  | 'treemap'
  | 'graph'
  | 'forceDirectedGraph'
  | 'dendrogram'
  | 'tree';

/**
 * Dataset configuration for Line charts
 */
export interface LineDatasetConfig {
  label?: string;
  data: (number | { x: number | string; y: number } | null)[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  borderDash?: number[];
  borderDashOffset?: number;
  borderCapStyle?: 'butt' | 'round' | 'square';
  borderJoinStyle?: 'bevel' | 'round' | 'miter';
  fill?: boolean | string | { target: string | number; above?: string; below?: string };
  tension?: number;
  pointBackgroundColor?: string | string[];
  pointBorderColor?: string | string[];
  pointBorderWidth?: number | number[];
  pointRadius?: number | number[];
  pointHoverRadius?: number | number[];
  pointHoverBackgroundColor?: string | string[];
  pointHoverBorderColor?: string | string[];
  pointHoverBorderWidth?: number | number[];
  pointStyle?: 'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle' | false;
  showLine?: boolean;
  spanGaps?: boolean | number;
  stepped?: boolean | 'before' | 'after' | 'middle';
  order?: number;
  hidden?: boolean;
  stack?: string;
  yAxisID?: string;
  xAxisID?: string;
  clip?: number | { left: number; top: number; right: number; bottom: number } | false;
  segment?: {
    backgroundColor?: (ctx: unknown) => string;
    borderColor?: (ctx: unknown) => string;
    borderDash?: (ctx: unknown) => number[];
  };
}

/**
 * Dataset configuration for Bar charts
 */
export interface BarDatasetConfig {
  label?: string;
  data: (number | [number, number] | { x: number | string; y: number } | null)[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number | { top?: number; right?: number; bottom?: number; left?: number };
  borderRadius?: number | { topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number };
  borderSkipped?: 'start' | 'end' | 'middle' | 'bottom' | 'left' | 'top' | 'right' | false;
  barPercentage?: number;
  categoryPercentage?: number;
  barThickness?: number | 'flex';
  maxBarThickness?: number;
  minBarLength?: number;
  grouped?: boolean;
  hoverBackgroundColor?: string | string[];
  hoverBorderColor?: string | string[];
  hoverBorderWidth?: number;
  hoverBorderRadius?: number;
  order?: number;
  hidden?: boolean;
  stack?: string;
  yAxisID?: string;
  xAxisID?: string;
  base?: number;
  clip?: number | { left: number; top: number; right: number; bottom: number } | false;
  inflateAmount?: number | 'auto';
}

/**
 * Dataset configuration for Pie/Doughnut charts
 */
export interface PieDatasetConfig {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number | number[];
  borderAlign?: 'center' | 'inner';
  borderJoinStyle?: 'bevel' | 'round' | 'miter';
  borderRadius?: number | { outerStart?: number; outerEnd?: number; innerStart?: number; innerEnd?: number };
  hoverBackgroundColor?: string | string[];
  hoverBorderColor?: string | string[];
  hoverBorderWidth?: number | number[];
  hoverBorderJoinStyle?: 'bevel' | 'round' | 'miter';
  hoverOffset?: number | number[];
  offset?: number | number[];
  rotation?: number;
  circumference?: number;
  spacing?: number;
  weight?: number;
  hidden?: boolean;
  clip?: number | { left: number; top: number; right: number; bottom: number } | false;
}

/**
 * Dataset configuration for Doughnut charts (extends Pie)
 */
export interface DoughnutDatasetConfig extends PieDatasetConfig {
  cutout?: string | number;
}

/**
 * Dataset configuration for Radar charts
 */
export interface RadarDatasetConfig {
  label?: string;
  data: (number | null)[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderDash?: number[];
  borderDashOffset?: number;
  borderCapStyle?: 'butt' | 'round' | 'square';
  borderJoinStyle?: 'bevel' | 'round' | 'miter';
  fill?: boolean | string | { target: string | number; above?: string; below?: string };
  tension?: number;
  pointBackgroundColor?: string | string[];
  pointBorderColor?: string | string[];
  pointBorderWidth?: number | number[];
  pointRadius?: number | number[];
  pointHoverRadius?: number | number[];
  pointHoverBackgroundColor?: string | string[];
  pointHoverBorderColor?: string | string[];
  pointHoverBorderWidth?: number | number[];
  pointStyle?: 'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle' | false;
  spanGaps?: boolean;
  order?: number;
  hidden?: boolean;
  clip?: number | { left: number; top: number; right: number; bottom: number } | false;
}

/**
 * Dataset configuration for Polar Area charts
 */
export interface PolarAreaDatasetConfig {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number | number[];
  borderAlign?: 'center' | 'inner';
  borderJoinStyle?: 'bevel' | 'round' | 'miter';
  hoverBackgroundColor?: string | string[];
  hoverBorderColor?: string | string[];
  hoverBorderWidth?: number | number[];
  hoverBorderJoinStyle?: 'bevel' | 'round' | 'miter';
  circular?: boolean;
  hidden?: boolean;
  clip?: number | { left: number; top: number; right: number; bottom: number } | false;
}

/**
 * Dataset configuration for Bubble charts
 */
export interface BubbleDatasetConfig {
  label?: string;
  data: { x: number; y: number; r: number }[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  hoverBackgroundColor?: string | string[];
  hoverBorderColor?: string | string[];
  hoverBorderWidth?: number;
  hoverRadius?: number;
  hitRadius?: number;
  pointStyle?: 'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle' | false;
  rotation?: number;
  radius?: number;
  order?: number;
  hidden?: boolean;
  drawActiveElementsOnTop?: boolean;
  clip?: number | { left: number; top: number; right: number; bottom: number } | false;
}

/**
 * Dataset configuration for Scatter charts
 */
export interface ScatterDatasetConfig {
  label?: string;
  data: { x: number; y: number }[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  pointBackgroundColor?: string | string[];
  pointBorderColor?: string | string[];
  pointBorderWidth?: number | number[];
  pointRadius?: number | number[];
  pointHoverRadius?: number | number[];
  pointHoverBackgroundColor?: string | string[];
  pointHoverBorderColor?: string | string[];
  pointHoverBorderWidth?: number | number[];
  pointStyle?: 'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle' | false;
  showLine?: boolean;
  order?: number;
  hidden?: boolean;
  yAxisID?: string;
  xAxisID?: string;
  clip?: number | { left: number; top: number; right: number; bottom: number } | false;
}

/**
 * Union type for all dataset configurations
 */
export type DatasetConfig =
  | LineDatasetConfig
  | BarDatasetConfig
  | PieDatasetConfig
  | DoughnutDatasetConfig
  | RadarDatasetConfig
  | PolarAreaDatasetConfig
  | BubbleDatasetConfig
  | ScatterDatasetConfig;

/**
 * Zoom plugin options
 */
export interface ZoomPluginOptions {
  pan?: {
    enabled?: boolean;
    mode?: 'x' | 'y' | 'xy';
    threshold?: number;
    modifierKey?: 'ctrl' | 'alt' | 'shift' | 'meta';
    onPanStart?: (context: { chart: unknown }) => boolean;
    onPan?: (context: { chart: unknown }) => void;
    onPanComplete?: (context: { chart: unknown }) => void;
    onPanRejected?: (context: { chart: unknown; event: unknown }) => void;
  };
  zoom?: {
    wheel?: {
      enabled?: boolean;
      speed?: number;
      modifierKey?: 'ctrl' | 'alt' | 'shift' | 'meta';
    };
    drag?: {
      enabled?: boolean;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      threshold?: number;
      modifierKey?: 'ctrl' | 'alt' | 'shift' | 'meta';
    };
    pinch?: {
      enabled?: boolean;
    };
    mode?: 'x' | 'y' | 'xy';
    onZoomStart?: (context: { chart: unknown; event: unknown; point: unknown }) => boolean;
    onZoom?: (context: { chart: unknown }) => void;
    onZoomComplete?: (context: { chart: unknown }) => void;
    onZoomRejected?: (context: { chart: unknown; event: unknown }) => void;
  };
  limits?: {
    x?: { min?: number | 'original'; max?: number | 'original'; minRange?: number };
    y?: { min?: number | 'original'; max?: number | 'original'; minRange?: number };
  };
}

/**
 * Datalabels plugin options
 */
export interface DatalabelsPluginOptions {
  align?: 'start' | 'end' | 'center' | 'top' | 'bottom' | 'left' | 'right' | number;
  anchor?: 'start' | 'end' | 'center';
  backgroundColor?: string | null;
  borderColor?: string | null;
  borderRadius?: number;
  borderWidth?: number;
  clamp?: boolean;
  clip?: boolean;
  color?: string;
  display?: boolean | 'auto';
  font?: {
    family?: string;
    size?: number;
    style?: 'normal' | 'italic' | 'oblique';
    weight?: string | number;
    lineHeight?: number | string;
  };
  formatter?: (value: unknown, context: unknown) => string | number | null;
  labels?: Record<string, Partial<DatalabelsPluginOptions>>;
  listeners?: Record<string, (context: unknown) => boolean | void>;
  offset?: number;
  opacity?: number;
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  rotation?: number;
  textAlign?: 'start' | 'end' | 'center' | 'left' | 'right';
  textStrokeColor?: string;
  textStrokeWidth?: number;
}

/**
 * Annotation types
 */
export type AnnotationType = 'line' | 'box' | 'ellipse' | 'point' | 'polygon' | 'label';

/**
 * Base annotation options
 */
export interface BaseAnnotationOptions {
  type: AnnotationType;
  id?: string;
  display?: boolean;
  adjustScaleRange?: boolean;
  borderColor?: string;
  borderDash?: number[];
  borderDashOffset?: number;
  borderWidth?: number;
  drawTime?: 'beforeDatasetsDraw' | 'afterDatasetsDraw' | 'beforeDraw' | 'afterDraw';
  enter?: (context: unknown, event: unknown) => boolean | void;
  leave?: (context: unknown, event: unknown) => boolean | void;
  click?: (context: unknown, event: unknown) => boolean | void;
}

/**
 * Line annotation options
 */
export interface LineAnnotationOptions extends BaseAnnotationOptions {
  type: 'line';
  xMin?: number | string;
  xMax?: number | string;
  yMin?: number | string;
  yMax?: number | string;
  xScaleID?: string;
  yScaleID?: string;
  endValue?: number | string;
  scaleID?: string;
  value?: number | string;
  borderShadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  arrowHeads?: {
    start?: { display?: boolean; length?: number; width?: number; fill?: boolean; backgroundColor?: string };
    end?: { display?: boolean; length?: number; width?: number; fill?: boolean; backgroundColor?: string };
  };
  label?: {
    backgroundColor?: string;
    borderCapStyle?: 'butt' | 'round' | 'square';
    borderColor?: string;
    borderDash?: number[];
    borderJoinStyle?: 'bevel' | 'round' | 'miter';
    borderRadius?: number;
    borderWidth?: number;
    color?: string;
    content?: string | string[];
    display?: boolean;
    font?: { family?: string; size?: number; style?: string; weight?: string | number };
    padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    position?: 'start' | 'center' | 'end' | number;
    rotation?: number | 'auto';
    textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
    xAdjust?: number;
    yAdjust?: number;
  };
}

/**
 * Box annotation options
 */
export interface BoxAnnotationOptions extends BaseAnnotationOptions {
  type: 'box';
  backgroundColor?: string;
  borderCapStyle?: 'butt' | 'round' | 'square';
  borderJoinStyle?: 'bevel' | 'round' | 'miter';
  borderRadius?: number | { topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number };
  cornerRadius?: number;
  xMin?: number | string;
  xMax?: number | string;
  yMin?: number | string;
  yMax?: number | string;
  xScaleID?: string;
  yScaleID?: string;
  label?: {
    content?: string | string[];
    display?: boolean;
    color?: string;
    font?: { family?: string; size?: number; style?: string; weight?: string | number };
    padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    position?: { x?: 'start' | 'center' | 'end'; y?: 'start' | 'center' | 'end' };
    rotation?: number;
    textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
    xAdjust?: number;
    yAdjust?: number;
  };
  rotation?: number;
}

/**
 * Ellipse annotation options
 */
export interface EllipseAnnotationOptions extends BaseAnnotationOptions {
  type: 'ellipse';
  backgroundColor?: string;
  xMin?: number | string;
  xMax?: number | string;
  yMin?: number | string;
  yMax?: number | string;
  xScaleID?: string;
  yScaleID?: string;
  rotation?: number;
  label?: {
    content?: string | string[];
    display?: boolean;
    color?: string;
    font?: { family?: string; size?: number; style?: string; weight?: string | number };
    padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    position?: { x?: 'start' | 'center' | 'end'; y?: 'start' | 'center' | 'end' };
    rotation?: number;
    textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
    xAdjust?: number;
    yAdjust?: number;
  };
}

/**
 * Point annotation options
 */
export interface PointAnnotationOptions extends BaseAnnotationOptions {
  type: 'point';
  backgroundColor?: string;
  pointStyle?: 'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle';
  radius?: number;
  rotation?: number;
  xValue?: number | string;
  yValue?: number | string;
  xScaleID?: string;
  yScaleID?: string;
  xAdjust?: number;
  yAdjust?: number;
}

/**
 * Label annotation options
 */
export interface LabelAnnotationOptions extends BaseAnnotationOptions {
  type: 'label';
  backgroundColor?: string;
  borderCapStyle?: 'butt' | 'round' | 'square';
  borderJoinStyle?: 'bevel' | 'round' | 'miter';
  borderRadius?: number;
  callout?: {
    borderCapStyle?: 'butt' | 'round' | 'square';
    borderColor?: string;
    borderDash?: number[];
    borderDashOffset?: number;
    borderJoinStyle?: 'bevel' | 'round' | 'miter';
    borderWidth?: number;
    display?: boolean;
    margin?: number;
    position?: 'auto' | 'left' | 'right' | 'top' | 'bottom';
    side?: number;
    start?: number | string;
  };
  color?: string;
  content?: string | string[];
  font?: { family?: string; size?: number; style?: string; weight?: string | number; lineHeight?: number | string };
  height?: number | string;
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  position?: { x?: 'start' | 'center' | 'end'; y?: 'start' | 'center' | 'end' };
  rotation?: number;
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
  width?: number | string;
  xAdjust?: number;
  yAdjust?: number;
  xValue?: number | string;
  yValue?: number | string;
  xScaleID?: string;
  yScaleID?: string;
}

/**
 * Polygon annotation options
 */
export interface PolygonAnnotationOptions extends BaseAnnotationOptions {
  type: 'polygon';
  backgroundColor?: string;
  borderCapStyle?: 'butt' | 'round' | 'square';
  borderJoinStyle?: 'bevel' | 'round' | 'miter';
  radius?: number;
  rotation?: number;
  sides?: number;
  xValue?: number | string;
  yValue?: number | string;
  xScaleID?: string;
  yScaleID?: string;
  xAdjust?: number;
  yAdjust?: number;
}

/**
 * Union type for all annotation options
 */
export type AnnotationOptions =
  | LineAnnotationOptions
  | BoxAnnotationOptions
  | EllipseAnnotationOptions
  | PointAnnotationOptions
  | LabelAnnotationOptions
  | PolygonAnnotationOptions;

/**
 * Annotation plugin options
 */
export interface AnnotationPluginOptions {
  animations?: {
    numbers?: { properties: string[]; type: string };
  };
  clip?: boolean;
  common?: Partial<BaseAnnotationOptions>;
  annotations?: Record<string, AnnotationOptions> | AnnotationOptions[];
}

/**
 * Scale configuration
 */
export interface ScaleConfig {
  type?: 'linear' | 'logarithmic' | 'category' | 'time' | 'timeseries' | 'radialLinear';
  display?: boolean;
  position?: 'top' | 'left' | 'bottom' | 'right' | 'center' | { [key: string]: number };
  min?: number | string;
  max?: number | string;
  suggestedMin?: number;
  suggestedMax?: number;
  beginAtZero?: boolean;
  reverse?: boolean;
  stacked?: boolean | 'single';
  offset?: boolean;
  bounds?: 'ticks' | 'data';
  grace?: number | string;
  weight?: number;
  title?: {
    display?: boolean;
    text?: string | string[];
    color?: string;
    font?: { family?: string; size?: number; style?: string; weight?: string | number };
    padding?: number | { top?: number; bottom?: number };
    align?: 'start' | 'center' | 'end';
  };
  ticks?: {
    display?: boolean;
    color?: string;
    font?: { family?: string; size?: number; style?: string; weight?: string | number };
    padding?: number;
    backdropColor?: string;
    backdropPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    callback?: (tickValue: string | number, index: number, ticks: unknown[]) => string | string[] | number | null | undefined;
    major?: { enabled?: boolean };
    align?: 'start' | 'center' | 'end' | 'inner';
    crossAlign?: 'near' | 'center' | 'far';
    showLabelBackdrop?: boolean;
    autoSkip?: boolean;
    autoSkipPadding?: number;
    includeBounds?: boolean;
    labelOffset?: number;
    maxRotation?: number;
    minRotation?: number;
    mirror?: boolean;
    sampleSize?: number;
    stepSize?: number;
    count?: number;
    maxTicksLimit?: number;
    precision?: number;
    format?: Intl.NumberFormatOptions;
    z?: number;
  };
  grid?: {
    display?: boolean;
    color?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    borderDash?: number[];
    borderDashOffset?: number;
    circular?: boolean;
    drawBorder?: boolean;
    drawOnChartArea?: boolean;
    drawTicks?: boolean;
    lineWidth?: number | number[];
    offset?: boolean;
    tickBorderDash?: number[];
    tickBorderDashOffset?: number;
    tickColor?: string | string[];
    tickLength?: number;
    tickWidth?: number | number[];
    z?: number;
  };
  border?: {
    display?: boolean;
    color?: string;
    width?: number;
    dash?: number[];
    dashOffset?: number;
    z?: number;
  };
  // Time scale specific
  time?: {
    displayFormats?: Record<string, string>;
    isoWeekday?: boolean | number;
    parser?: string | ((value: unknown) => number);
    round?: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | false;
    tooltipFormat?: string;
    unit?: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | false;
    minUnit?: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
  };
  adapters?: {
    date?: unknown;
  };
  // Radial scale specific
  angleLines?: {
    display?: boolean;
    color?: string;
    lineWidth?: number;
    borderDash?: number[];
    borderDashOffset?: number;
  };
  pointLabels?: {
    display?: boolean;
    color?: string | string[];
    font?: { family?: string; size?: number; style?: string; weight?: string | number };
    callback?: (label: string, index: number) => string | string[] | number;
    backdropColor?: string;
    backdropPadding?: number;
    borderRadius?: number;
    centerPointLabels?: boolean;
    padding?: number;
  };
  startAngle?: number;
  animate?: boolean;
}

/**
 * Full chart configuration for markdown code blocks
 */
export interface ChartConfig {
  /** Chart type */
  type: SupportedChartType;
  
  /** Chart data */
  data: {
    labels?: (string | string[] | number | null)[];
    datasets: DatasetConfig[];
  };
  
  /** Chart options */
  options?: {
    /** Responsive configuration */
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    aspectRatio?: number;
    resizeDelay?: number;
    
    /** Device pixel ratio */
    devicePixelRatio?: number;
    
    /** Layout configuration */
    layout?: {
      autoPadding?: boolean;
      padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    };
    
    /** Locale */
    locale?: string;
    
    /** Interaction options */
    interaction?: {
      mode?: 'point' | 'nearest' | 'index' | 'dataset' | 'x' | 'y';
      intersect?: boolean;
      axis?: 'x' | 'y' | 'xy' | 'r';
      includeInvisible?: boolean;
    };
    
    /** Hover options */
    hover?: {
      mode?: 'point' | 'nearest' | 'index' | 'dataset' | 'x' | 'y';
      intersect?: boolean;
      axis?: 'x' | 'y' | 'xy' | 'r';
      animationDuration?: number;
    };
    
    /** Animation options */
    animation?: boolean | {
      duration?: number;
      easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';
      delay?: number;
      loop?: boolean;
      onProgress?: (animation: unknown) => void;
      onComplete?: (animation: unknown) => void;
    };
    animations?: {
      [key: string]: {
        properties?: string[];
        type?: string;
        from?: number | string | boolean;
        to?: number | string | boolean;
        fn?: (from: number, to: number, factor: number) => number;
        duration?: number;
        easing?: string;
        delay?: number;
        loop?: boolean;
      };
    };
    transitions?: {
      [key: string]: {
        animation?: {
          duration?: number;
          easing?: string;
          delay?: number;
        };
        animations?: Record<string, unknown>;
      };
    };
    
    /** Scales configuration */
    scales?: Record<string, ScaleConfig>;
    
    /** Index axis */
    indexAxis?: 'x' | 'y';
    
    /** Elements styling */
    elements?: {
      point?: {
        radius?: number;
        pointStyle?: string;
        rotation?: number;
        backgroundColor?: string;
        borderWidth?: number;
        borderColor?: string;
        hitRadius?: number;
        hoverRadius?: number;
        hoverBorderWidth?: number;
      };
      line?: {
        tension?: number;
        backgroundColor?: string;
        borderWidth?: number;
        borderColor?: string;
        borderCapStyle?: string;
        borderDash?: number[];
        borderDashOffset?: number;
        borderJoinStyle?: string;
        capBezierPoints?: boolean;
        cubicInterpolationMode?: 'default' | 'monotone';
        fill?: boolean | string | { target: string | number; above?: string; below?: string };
        stepped?: boolean;
      };
      bar?: {
        backgroundColor?: string;
        borderWidth?: number;
        borderColor?: string;
        borderSkipped?: string;
        borderRadius?: number;
        inflateAmount?: number | 'auto';
        pointStyle?: string;
      };
      arc?: {
        angle?: number;
        backgroundColor?: string;
        borderAlign?: string;
        borderColor?: string;
        borderJoinStyle?: string;
        borderWidth?: number;
        circular?: boolean;
      };
    };
    
    /** Plugins configuration */
    plugins?: {
      /** Title plugin */
      title?: {
        display?: boolean;
        text?: string | string[];
        color?: string;
        font?: { family?: string; size?: number; style?: string; weight?: string | number; lineHeight?: number | string };
        padding?: number | { top?: number; bottom?: number };
        align?: 'start' | 'center' | 'end';
        position?: 'top' | 'left' | 'bottom' | 'right';
        fullSize?: boolean;
      };
      
      /** Subtitle plugin */
      subtitle?: {
        display?: boolean;
        text?: string | string[];
        color?: string;
        font?: { family?: string; size?: number; style?: string; weight?: string | number; lineHeight?: number | string };
        padding?: number | { top?: number; bottom?: number };
        align?: 'start' | 'center' | 'end';
        position?: 'top' | 'left' | 'bottom' | 'right';
        fullSize?: boolean;
      };
      
      /** Legend plugin */
      legend?: {
        display?: boolean;
        position?: 'top' | 'left' | 'bottom' | 'right' | 'chartArea';
        align?: 'start' | 'center' | 'end';
        maxHeight?: number;
        maxWidth?: number;
        fullSize?: boolean;
        reverse?: boolean;
        rtl?: boolean;
        textDirection?: 'ltr' | 'rtl';
        labels?: {
          boxWidth?: number;
          boxHeight?: number;
          color?: string;
          font?: { family?: string; size?: number; style?: string; weight?: string | number; lineHeight?: number | string };
          padding?: number;
          generateLabels?: (chart: unknown) => unknown[];
          filter?: (item: unknown, data: unknown) => boolean;
          sort?: (a: unknown, b: unknown, data: unknown) => number;
          pointStyle?: string;
          textAlign?: 'left' | 'right' | 'center';
          usePointStyle?: boolean;
          pointStyleWidth?: number;
          useBorderRadius?: boolean;
          borderRadius?: number;
        };
        title?: {
          display?: boolean;
          text?: string;
          color?: string;
          font?: { family?: string; size?: number; style?: string; weight?: string | number };
          padding?: number | { top?: number; bottom?: number };
        };
        onClick?: (e: unknown, legendItem: unknown, legend: unknown) => void;
        onHover?: (e: unknown, legendItem: unknown, legend: unknown) => void;
        onLeave?: (e: unknown, legendItem: unknown, legend: unknown) => void;
      };
      
      /** Tooltip plugin */
      tooltip?: {
        enabled?: boolean;
        external?: (context: unknown) => void;
        mode?: 'point' | 'nearest' | 'index' | 'dataset' | 'x' | 'y';
        intersect?: boolean;
        position?: 'average' | 'nearest';
        callbacks?: {
          beforeTitle?: (tooltipItems: unknown[]) => string | string[];
          title?: (tooltipItems: unknown[]) => string | string[];
          afterTitle?: (tooltipItems: unknown[]) => string | string[];
          beforeBody?: (tooltipItems: unknown[]) => string | string[];
          beforeLabel?: (tooltipItem: unknown) => string | string[];
          label?: (tooltipItem: unknown) => string | string[];
          labelColor?: (tooltipItem: unknown) => { borderColor: string; backgroundColor: string; borderWidth?: number; borderDash?: number[]; borderRadius?: number };
          labelTextColor?: (tooltipItem: unknown) => string;
          labelPointStyle?: (tooltipItem: unknown) => { pointStyle: string; rotation: number };
          afterLabel?: (tooltipItem: unknown) => string | string[];
          afterBody?: (tooltipItems: unknown[]) => string | string[];
          beforeFooter?: (tooltipItems: unknown[]) => string | string[];
          footer?: (tooltipItems: unknown[]) => string | string[];
          afterFooter?: (tooltipItems: unknown[]) => string | string[];
        };
        itemSort?: (a: unknown, b: unknown, data: unknown) => number;
        filter?: (tooltipItem: unknown, data: unknown) => boolean;
        backgroundColor?: string;
        titleColor?: string;
        titleFont?: { family?: string; size?: number; style?: string; weight?: string | number; lineHeight?: number | string };
        titleAlign?: 'left' | 'right' | 'center';
        titleSpacing?: number;
        titleMarginBottom?: number;
        bodyColor?: string;
        bodyFont?: { family?: string; size?: number; style?: string; weight?: string | number; lineHeight?: number | string };
        bodyAlign?: 'left' | 'right' | 'center';
        bodySpacing?: number;
        footerColor?: string;
        footerFont?: { family?: string; size?: number; style?: string; weight?: string | number; lineHeight?: number | string };
        footerAlign?: 'left' | 'right' | 'center';
        footerSpacing?: number;
        footerMarginTop?: number;
        padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
        caretPadding?: number;
        caretSize?: number;
        cornerRadius?: number;
        multiKeyBackground?: string;
        displayColors?: boolean;
        boxWidth?: number;
        boxHeight?: number;
        boxPadding?: number;
        usePointStyle?: boolean;
        borderColor?: string;
        borderWidth?: number;
        rtl?: boolean;
        textDirection?: 'ltr' | 'rtl';
        xAlign?: 'left' | 'center' | 'right';
        yAlign?: 'top' | 'center' | 'bottom';
      };
      
      /** Filler plugin */
      filler?: {
        propagate?: boolean;
        drawTime?: 'beforeDatasetsDraw' | 'beforeDatasetDraw' | 'beforeDraw';
      };
      
      /** Decimation plugin */
      decimation?: {
        enabled?: boolean;
        algorithm?: 'min-max' | 'lttb';
        samples?: number;
        threshold?: number;
      };
      
      /** Zoom plugin (chartjs-plugin-zoom) */
      zoom?: ZoomPluginOptions;
      
      /** Datalabels plugin (chartjs-plugin-datalabels) */
      datalabels?: DatalabelsPluginOptions | false;
      
      /** Annotation plugin (chartjs-plugin-annotation) */
      annotation?: AnnotationPluginOptions;
    };
    
    /** Parsing options */
    parsing?: boolean | {
      xAxisKey?: string;
      yAxisKey?: string;
      key?: string;
    };
    
    /** Normalized data */
    normalized?: boolean;
    
    /** Skip null values */
    skipNull?: boolean;
    
    /** Span gaps */
    spanGaps?: boolean | number;
    
    /** Show line (scatter/bubble) */
    showLine?: boolean;
    
    /** Cutout (doughnut/pie) */
    cutout?: string | number;
    
    /** Radius (doughnut/pie/polarArea) */
    radius?: string | number;
    
    /** Rotation (doughnut/pie/polarArea/radar) */
    rotation?: number;
    
    /** Circumference (doughnut/pie/polarArea) */
    circumference?: number;
    
    /** Spacing (doughnut/pie) */
    spacing?: number;
    
    /** Offset (doughnut/pie) */
    offset?: number | number[];
    
    /** Events */
    events?: ('mousemove' | 'mouseout' | 'click' | 'touchstart' | 'touchmove')[];
    
    /** onClick handler */
    onClick?: (event: unknown, elements: unknown[], chart: unknown) => void;
    
    /** onHover handler */
    onHover?: (event: unknown, elements: unknown[], chart: unknown) => void;
    
    /** onResize handler */
    onResize?: (chart: unknown, size: { width: number; height: number }) => void;
  };
  
  /** Width of the chart canvas */
  width?: number | string;
  
  /** Height of the chart canvas */
  height?: number | string;
}

/**
 * Plugin configuration for VitePress
 */
export interface PluginConfig {
  /** Default chart options applied to all charts */
  defaultOptions?: ChartConfig['options'];
  
  /** Default width for charts */
  defaultWidth?: number | string;
  
  /** Default height for charts */
  defaultHeight?: number | string;
  
  /** Enable zoom plugin globally */
  enableZoom?: boolean;
  
  /** Enable datalabels plugin globally */
  enableDatalabels?: boolean;
  
  /** Enable annotation plugin globally */
  enableAnnotation?: boolean;
  
  /** Custom CSS class for chart containers */
  containerClass?: string;
  
  /** Global color palette */
  colorPalette?: string[];
  
  /** Dark mode color palette */
  darkColorPalette?: string[];
  
  /** Auto dark mode detection */
  autoDarkMode?: boolean;
}

/**
 * Default color palette
 */
export const DEFAULT_COLORS = [
  'rgba(54, 162, 235, 0.8)',   // Blue
  'rgba(255, 99, 132, 0.8)',   // Red
  'rgba(75, 192, 192, 0.8)',   // Teal
  'rgba(255, 206, 86, 0.8)',   // Yellow
  'rgba(153, 102, 255, 0.8)',  // Purple
  'rgba(255, 159, 64, 0.8)',   // Orange
  'rgba(199, 199, 199, 0.8)',  // Grey
  'rgba(83, 102, 255, 0.8)',   // Indigo
  'rgba(255, 99, 255, 0.8)',   // Pink
  'rgba(99, 255, 132, 0.8)',   // Green
];

/**
 * Default dark mode color palette
 */
export const DEFAULT_DARK_COLORS = [
  'rgba(100, 181, 246, 0.8)',  // Light Blue
  'rgba(239, 83, 80, 0.8)',    // Light Red
  'rgba(77, 208, 225, 0.8)',   // Light Teal
  'rgba(255, 238, 88, 0.8)',   // Light Yellow
  'rgba(179, 157, 219, 0.8)',  // Light Purple
  'rgba(255, 183, 77, 0.8)',   // Light Orange
  'rgba(189, 189, 189, 0.8)',  // Light Grey
  'rgba(121, 134, 203, 0.8)',  // Light Indigo
  'rgba(240, 98, 146, 0.8)',   // Light Pink
  'rgba(129, 199, 132, 0.8)',  // Light Green
];
