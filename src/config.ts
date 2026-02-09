import { z } from 'zod';

// ─── Chart type ──────────────────────────────────────────────────────
// Any string is allowed — custom plugins may register additional types.

export const ChartTypeSchema = z.string().min(1, 'Chart "type" is required.');

export type SupportedChartType = z.infer<typeof ChartTypeSchema>;

// ─── Color / style primitives ────────────────────────────────────────

const ColorValue = z.union([z.string(), z.array(z.string())]);
const NumberOrArray = z.union([z.number(), z.array(z.number())]);

// ─── Dataset schema ──────────────────────────────────────────────────
// Loose — Chart.js has many type-specific fields that we pass through.

export const datasetFields = {
  label: z.union([z.string(), z.number()]).nullish(),
  data: z.array(z.any()).nullish(),
  type: z.string().nullish(),
  backgroundColor: ColorValue.nullish(),
  borderColor: ColorValue.nullish(),
  borderWidth: z.union([z.number(), z.record(z.string(), z.number())]).nullish(),
  borderDash: z.array(z.number()).nullish(),
  borderRadius: z.union([z.number(), z.record(z.string(), z.number())]).nullish(),
  fill: z.union([z.boolean(), z.string(), z.record(z.string(), z.any())]).nullish(),
  tension: z.number().nullish(),
  pointRadius: NumberOrArray.nullish(),
  pointStyle: z.union([z.string(), z.literal(false)]).nullish(),
  showLine: z.boolean().nullish(),
  spanGaps: z.union([z.boolean(), z.number()]).nullish(),
  stepped: z.union([z.boolean(), z.string()]).nullish(),
  order: z.number().nullish(),
  hidden: z.boolean().nullish(),
  stack: z.string().nullish(),
  yAxisID: z.string().nullish(),
  xAxisID: z.string().nullish(),
};

export const DatasetSchema = z.object(datasetFields).loose();

export type DatasetConfig = z.infer<typeof DatasetSchema>;

// ─── Data schema ─────────────────────────────────────────────────────

export const dataFields = {
  labels: z.array(z.any()).nullish(),
  datasets: z.array(DatasetSchema).min(1, 'At least one dataset is required.'),
};

export const DataSchema = z.object(dataFields).loose();

export type ChartData = z.infer<typeof DataSchema>;

// ─── Options schema ──────────────────────────────────────────────────
// Loose — allows any Chart.js option and plugin config to pass through.

const TitleSchema = z.object({
  display: z.boolean().nullish(),
  text: z.union([z.string(), z.array(z.string())]).nullish(),
  color: z.string().nullish(),
  font: z.record(z.string(), z.any()).nullish(),
  padding: z.union([z.number(), z.record(z.string(), z.number())]).nullish(),
  align: z.enum(['start', 'center', 'end']).nullish(),
  position: z.enum(['top', 'left', 'bottom', 'right']).nullish(),
  fullSize: z.boolean().nullish(),
}).loose();

const LegendSchema = z.object({
  display: z.boolean().nullish(),
  position: z.enum(['top', 'left', 'bottom', 'right', 'chartArea']).nullish(),
  align: z.enum(['start', 'center', 'end']).nullish(),
  labels: z.record(z.string(), z.any()).nullish(),
  title: z.record(z.string(), z.any()).nullish(),
  reverse: z.boolean().nullish(),
  rtl: z.boolean().nullish(),
}).loose();

const TooltipSchema = z.object({
  enabled: z.boolean().nullish(),
  mode: z.string().nullish(),
  intersect: z.boolean().nullish(),
  callbacks: z.record(z.string(), z.any()).nullish(),
}).loose();

// Plugins — loose, any plugin config passes through
const PluginsSchema = z.object({
  title: TitleSchema.nullish(),
  subtitle: TitleSchema.nullish(),
  legend: LegendSchema.nullish(),
  tooltip: TooltipSchema.nullish(),
}).loose();

export const optionsFields = {
  responsive: z.boolean().nullish(),
  maintainAspectRatio: z.boolean().nullish(),
  aspectRatio: z.number().nullish(),
  indexAxis: z.enum(['x', 'y']).nullish(),
  scales: z.record(z.string(), z.any()).nullish(),
  plugins: PluginsSchema.nullish(),
  animation: z.union([z.boolean(), z.record(z.string(), z.any())]).nullish(),
  animations: z.record(z.string(), z.any()).nullish(),
  transitions: z.record(z.string(), z.any()).nullish(),
  interaction: z.record(z.string(), z.any()).nullish(),
  hover: z.record(z.string(), z.any()).nullish(),
  layout: z.record(z.string(), z.any()).nullish(),
  elements: z.record(z.string(), z.any()).nullish(),
  parsing: z.union([z.boolean(), z.record(z.string(), z.any())]).nullish(),
  normalized: z.boolean().nullish(),
  locale: z.string().nullish(),
  // Pie / Doughnut / PolarArea
  circumference: z.number().nullish(),
  rotation: z.number().nullish(),
  cutout: z.union([z.number(), z.string()]).nullish(),
  radius: z.union([z.number(), z.string()]).nullish(),
  // Bar
  barPercentage: z.number().nullish(),
  categoryPercentage: z.number().nullish(),
  barThickness: z.union([z.number(), z.string()]).nullish(),
  maxBarThickness: z.number().nullish(),
  minBarLength: z.number().nullish(),
  // Line
  showLine: z.boolean().nullish(),
  spanGaps: z.union([z.boolean(), z.number()]).nullish(),
  // General
  clip: z.union([z.number(), z.boolean(), z.record(z.string(), z.any())]).nullish(),
  resizeDelay: z.number().nullish(),
  devicePixelRatio: z.number().nullish(),
  events: z.array(z.string()).nullish(),
};

export const OptionsSchema = z.object(optionsFields).loose();

export type ChartOptions = z.infer<typeof OptionsSchema>;

// ─── Chart config schema ─────────────────────────────────────────────

export const chartConfigFields = {
  type: ChartTypeSchema,
  data: DataSchema,
  options: OptionsSchema.nullish(),
  height: z.union([z.number(), z.string()]).nullish(),
  width: z.union([z.number(), z.string()]).nullish(),
};

export const ChartConfigSchema = z.object(chartConfigFields).loose();

export type ChartConfig = z.infer<typeof ChartConfigSchema>;

// ─── URL config schema ───────────────────────────────────────────────

export const UrlConfigSchema = z.object({
  url: z.string().min(1, '"url" must be a non-empty string.'),
  height: z.union([z.number(), z.string()]).nullish(),
}).loose();

export type UrlConfig = z.infer<typeof UrlConfigSchema>;

// ─── Combined block type ─────────────────────────────────────────────

export type ChartBlock = ChartConfig | UrlConfig;

// ─── Plugin configuration for VitePress ──────────────────────────────

export const PluginConfigSchema = z.object({
  /** Default chart options applied to all charts */
  defaultOptions: OptionsSchema.nullish(),
  /** Default width for charts */
  defaultWidth: z.union([z.number(), z.string()]).nullish(),
  /** Default height for charts */
  defaultHeight: z.union([z.number(), z.string()]).nullish(),
  /** Enable zoom plugin globally */
  enableZoom: z.boolean().nullish(),
  /** Enable datalabels plugin globally */
  enableDatalabels: z.boolean().nullish(),
  /** Custom CSS class for chart containers */
  containerClass: z.string().nullish(),
  /** Global color palette */
  colorPalette: z.array(z.string()).nullish(),
  /** Dark mode color palette */
  darkColorPalette: z.array(z.string()).nullish(),
  /** Auto dark mode detection */
  autoDarkMode: z.boolean().nullish(),
  /**
   * Root directory for resolving `url:` paths.
   * @default process.cwd()
   */
  root: z.string().nullish(),
}).loose();

export type PluginConfig = z.infer<typeof PluginConfigSchema>;


// ─── Validation ──────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate already-parsed chart config data (no YAML dependency).
 *
 * 1. Zod schema validation (structure, types, required fields).
 * 2. Warning pass (unknown keys, suspicious patterns).
 */
export function validateChartData(parsed: unknown): ValidationResult {
  if (parsed === null || parsed === undefined) {
    return { valid: false, errors: ['Chart config is empty.'], warnings: [] };
  }

  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { valid: false, errors: ['Chart config must be an object.'], warnings: [] };
  }

  const obj = parsed as Record<string, unknown>;

  // Pick the right schema based on the shape of the input
  const schema = 'url' in obj ? UrlConfigSchema : ChartConfigSchema;
  const zodResult = schema.safeParse(parsed);

  if (!zodResult.success) {
    const errors = zodResult.error.issues.map(issue => {
      const path = issue.path.length ? issue.path.join('.') : 'root';
      return `${path}: ${issue.message}`;
    });
    return { valid: false, errors, warnings: [] };
  }

  return { valid: true, errors: [], warnings: [] };
}

/**
 * Validate a raw YAML string (parses YAML first, then validates).
 *
 * Used by server-side code and the public API.
 * Client-side code should use `validateChartData()` directly with
 * already-parsed data to avoid static YAML import.
 */
export function validateChartInput(raw: string): ValidationResult {
  const trimmed = raw.trim();

  if (!trimmed) {
    return { valid: false, errors: ['Chart config is empty.'], warnings: [] };
  }

  let parsed: unknown;
  try {
    const YAML = require('yaml');
    parsed = YAML.parse(trimmed);
  } catch (e: any) {
    return { valid: false, errors: [`YAML syntax error: ${e.message ?? 'unknown'}`], warnings: [] };
  }

  return validateChartData(parsed);
}

// ─── Default palettes ────────────────────────────────────────────────

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
