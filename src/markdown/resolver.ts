import * as fs from 'fs';
import * as nodePath from 'path';
import { execSync } from 'child_process';
import YAML from 'yaml';

// ─── Types ───────────────────────────────────────────────────────────

export type ResolveResult =
  | { type: 'data'; data: any }
  | { type: 'error'; error: string };

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Resolve a `url:` directive **synchronously** at build time.
 *
 * Everything is resolved on the server — the client never fetches.
 *
 * - **Local YAML/JSON** → `fs.readFileSync` + parse
 * - **Local JS/MJS**    → `execSync` + dynamic `import()` in a child process
 * - **HTTP(S) URLs**    → `execSync` + `fetch()` in a child process
 * - **TS files**        → error (not supported without a TS loader)
 */
export function resolveUrl(url: string, rootDir: string): ResolveResult {
  // 1. HTTP(S) → sync fetch via child process
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return resolveHttp(url);
  }

  // 2. Resolve local path
  const ext = nodePath.extname(url).toLowerCase();
  const candidates = url.startsWith('/')
    ? [
        nodePath.join(rootDir, 'public', url.slice(1)),
        nodePath.join(rootDir, url.slice(1)),
      ]
    : [nodePath.join(rootDir, url)];

  const filePath = candidates.find(p => fs.existsSync(p));

  if (!filePath) {
    return { type: 'error', error: `External chart file not found: ${url}` };
  }

  // 3. JS/MJS → sync import via child process
  if (ext === '.js' || ext === '.mjs') {
    return resolveJsModule(filePath);
  }

  // 4. TS → not supported directly
  if (ext === '.ts') {
    return {
      type: 'error',
      error: `TypeScript files cannot be loaded at build time. Convert "${url}" to .json or .yaml.`,
    };
  }

  // 5. YAML/JSON → readFileSync
  return resolveLocalFile(filePath, url);
}

// ─── Internal: HTTP fetch ────────────────────────────────────────────

function resolveHttp(url: string): ResolveResult {
  try {
    const script =
      `fetch(${JSON.stringify(url)})` +
      `.then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.text()})` +
      `.then(t=>process.stdout.write(t))` +
      `.catch(e=>{process.stderr.write(e.message);process.exit(1)})`;

    const text = execSync(`node -e ${JSON.stringify(script)}`, {
      encoding: 'utf-8',
      timeout: 30000,
      maxBuffer: 50 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    return parseRawText(text, url);
  } catch (e: any) {
    const stderr = e.stderr?.toString().trim();
    return { type: 'error', error: `Failed to fetch ${url}: ${stderr || e.message}` };
  }
}

// ─── Internal: JS/MJS module import ──────────────────────────────────

function resolveJsModule(filePath: string): ResolveResult {
  try {
    const absPath = nodePath.resolve(filePath);
    const fileUrl = `file://${absPath}?t=${Date.now()}`; // bust cache for watch mode

    const script =
      `import(${JSON.stringify(fileUrl)})` +
      `.then(m=>{let d=m.default||m.config||m;` +
      `return typeof d==='function'?Promise.resolve(d()):d})` +
      `.then(d=>process.stdout.write(JSON.stringify(d)))` +
      `.catch(e=>{process.stderr.write(e.message);process.exit(1)})`;

    const json = execSync(`node --input-type=module -e ${JSON.stringify(script)}`, {
      encoding: 'utf-8',
      timeout: 30000,
      maxBuffer: 50 * 1024 * 1024, // 50 MB — geo data can be very large
      cwd: nodePath.dirname(absPath),
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    return normalizeData(JSON.parse(json), filePath);
  } catch (e: any) {
    const stderr = e.stderr?.toString().trim();
    return { type: 'error', error: `Failed to import ${filePath}: ${stderr || e.message}` };
  }
}

// ─── Internal: local file (YAML/JSON) ────────────────────────────────

function resolveLocalFile(filePath: string, url: string): ResolveResult {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const ext = nodePath.extname(filePath).toLowerCase();
    return parseRawText(content, url, ext);
  } catch (e: any) {
    return { type: 'error', error: `Failed to read ${url}: ${e.message}` };
  }
}

// ─── Internal: parse raw text (JSON or YAML) ─────────────────────────

function parseRawText(
  text: string,
  source: string,
  knownExt?: string,
): ResolveResult {
  let parsed: any;

  if (knownExt === '.json') {
    try {
      parsed = JSON.parse(text);
    } catch (e: any) {
      return { type: 'error', error: `Invalid JSON in ${source}: ${e.message}` };
    }
  } else {
    try {
      parsed = JSON.parse(text);
    } catch {
      try {
        parsed = YAML.parse(text.trim());
      } catch (e: any) {
        return { type: 'error', error: `Failed to parse ${source}: ${e.message}` };
      }
    }
  }

  return normalizeData(parsed, source);
}

// ─── Internal: normalize parsed data → chart config ──────────────────

function normalizeData(parsed: any, source: string): ResolveResult {
  if (!parsed || typeof parsed !== 'object') {
    return { type: 'error', error: `Invalid data format in ${source}` };
  }

  // Must have a `type` field to be a valid chart config
  if (!parsed.type) {
    return { type: 'error', error: `Missing "type" field in chart config from ${source}` };
  }

  return { type: 'data', data: parsed };
}
