export type ThemeOverrides = Record<string, string>;

function uniqueElements<T extends Element>(items: T[]): T[] {
  const seen = new Set<T>();
  const out: T[] = [];
  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

let targetsCache: HTMLElement[] | null = null;
let observerInitialized = false;

function initTargetsObserver() {
  if (observerInitialized) return;
  observerInitialized = true;
  if (typeof document === "undefined") return;

  // DOM 结构变化（尤其 Radix popper）会影响目标集合；用 MutationObserver 让 cache 自动失效。
  try {
    const observer = new MutationObserver(() => {
      targetsCache = null;
    });
    observer.observe(document.body, { childList: true, subtree: true });
  } catch {
    // ignore
  }
}

function getThemeTargetsCached(): HTMLElement[] {
  if (typeof document === "undefined") return [];
  initTargetsObserver();
  if (targetsCache) return targetsCache;

  const targets: HTMLElement[] = [];
  targets.push(document.documentElement);
  targets.push(document.body);
  targets.push(...Array.from(document.querySelectorAll<HTMLElement>(".theme-container")));

  // Radix popper wrapper is where many components get their vars applied in `themes.css`.
  targets.push(
    ...Array.from(document.querySelectorAll<HTMLElement>("[data-radix-popper-content-wrapper]")),
  );

  targetsCache = uniqueElements(targets);
  return targetsCache;
}

export type CssVarPatch = Record<string, string | null | undefined>;

/**
 * 批量更新 CSS 变量：单次遍历目标元素，避免 set/remove 每个 key 都 query + 遍历带来的卡顿。
 * - value 为 string：setProperty
 * - value 为 null/undefined：removeProperty
 */
export function applyCssVarsEverywhere(patch: CssVarPatch) {
  if (typeof document === "undefined") return;
  const entries = Object.entries(patch);
  if (entries.length === 0) return;

  for (const el of getThemeTargetsCached()) {
    for (const [key, value] of entries) {
      if (value == null || value === "") {
        el.style.removeProperty(`--${key}`);
      } else {
        el.style.setProperty(`--${key}`, value);
      }
    }
  }
}

export function setCssVarEverywhere(key: string, value: string) {
  if (typeof document === "undefined") return;
  for (const el of getThemeTargetsCached()) {
    el.style.setProperty(`--${key}`, value);
  }
}

export function removeCssVarEverywhere(key: string) {
  if (typeof document === "undefined") return;
  for (const el of getThemeTargetsCached()) {
    el.style.removeProperty(`--${key}`);
  }
}

export function readInlineCssVar(key: string): string | null {
  if (typeof document === "undefined") return null;
  // Prefer the most specific place the app uses: theme-container inline overrides.
  const themeContainer = document.querySelector<HTMLElement>(".theme-container");
  const candidates = [
    themeContainer,
    document.body,
    document.documentElement,
  ].filter(Boolean) as HTMLElement[];

  for (const el of candidates) {
    const value = el.style.getPropertyValue(`--${key}`).trim();
    if (value) return value;
  }
  return null;
}

export function readComputedCssVar(key: string): string {
  if (typeof window === "undefined") return "";
  return window.getComputedStyle(document.documentElement).getPropertyValue(`--${key}`).trim();
}

// --- Color helpers ---
export function colorToRgb(color: string): { r: number; g: number; b: number } {
  if (!color || !color.trim() || typeof window === "undefined") {
    return { r: 0, g: 0, b: 0 };
  }

  const temp = document.createElement("div");
  temp.style.color = color;
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.pointerEvents = "none";
  document.body.appendChild(temp);

  const computed =
    window.getComputedStyle(temp).color || window.getComputedStyle(temp).backgroundColor;

  temp.remove();

  const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return {
      r: Number.parseInt(match[1], 10),
      g: Number.parseInt(match[2], 10),
      b: Number.parseInt(match[3], 10),
    };
  }
  return { r: 0, g: 0, b: 0 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

export function getResolvedColorValue(key: string): string {
  if (typeof window === "undefined") return "";

  const temp = document.createElement("div");
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.pointerEvents = "none";
  temp.style.width = "1px";
  temp.style.height = "1px";
  temp.style.backgroundColor = `var(--${key})`;

  const themeContainer = document.querySelector(".theme-container");
  if (themeContainer) {
    themeContainer.appendChild(temp);
  } else {
    document.body.appendChild(temp);
  }

  const computedColor = window.getComputedStyle(temp).backgroundColor;
  temp.remove();
  return computedColor;
}

export function getResolvedColorHex(key: string): string {
  const rgbStr = getResolvedColorValue(key);
  if (!rgbStr) return "#000000";
  const rgb = colorToRgb(rgbStr);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export function parsePx(value: string): number | null {
  const v = value.trim();
  if (!v) return null;
  const m = v.match(/^(-?\d+(\.\d+)?)(px)?$/);
  if (!m) return null;
  return Number.parseFloat(m[1]);
}


