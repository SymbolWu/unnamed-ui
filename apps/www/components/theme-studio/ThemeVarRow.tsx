"use client";

import * as React from "react";

import { Input } from "@/registry/wuhan/ui/input";
import {
  getResolvedColorHex,
  readComputedCssVar,
  readInlineCssVar,
} from "@/lib/theme-css-vars";

type VarDef = {
  key: string;
  label: string;
  kind: "color" | "length" | "string";
  placeholder?: string;
  description?: string;
};

function normalizeHex(input: string): string | null {
  const v = input.trim();
  if (!v.startsWith("#")) return null;
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    const r = v[1];
    const g = v[2];
    const b = v[3];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return null;
}

export const ThemeVarRow = React.memo(function ThemeVarRow({
  def,
  overriddenValue,
  isOverridden,
  activeTheme,
  showComputedValues,
  onSetOverride,
  onSetOverrideRaf,
}: {
  def: VarDef;
  overriddenValue?: string;
  isOverridden: boolean;
  activeTheme: string;
  showComputedValues: boolean;
  onSetOverride: (key: string, value: string) => void;
  onSetOverrideRaf?: (key: string, value: string) => void;
}) {
  const [computed, setComputed] = React.useState<string>("");
  const [inlineValue, setInlineValue] = React.useState<string | null>(null);
  const [hex, setHex] = React.useState<string>("#000000");

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    raf = window.requestAnimationFrame(() => {
      const nextInline = readInlineCssVar(def.key);
      const nextComputed = readComputedCssVar(def.key);

      setInlineValue((prev) => (prev === nextInline ? prev : nextInline));
      setComputed((prev) => (prev === nextComputed ? prev : nextComputed));

      if (def.kind === "color") {
        const maybeHex = overriddenValue ? normalizeHex(overriddenValue) : null;
        if (maybeHex) {
          setHex(maybeHex);
        } else {
          // Resolve actual color for <input type="color">. This is relatively expensive,
          // so we only run it on rAF and only for visible rows.
          setHex(getResolvedColorHex(def.key));
        }
      }
    });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [def.key, def.kind, overriddenValue, activeTheme]);

  const effectiveValue = overriddenValue ?? inlineValue ?? computed ?? "";

  return (
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{def.label}</span>
              <span className="text-muted-foreground text-xs">--{def.key}</span>
              {isOverridden ? (
                <span className="text-xs rounded bg-muted px-2 py-0.5">custom</span>
              ) : null}
            </div>
            {def.description ? (
              <div className="text-muted-foreground text-xs">{def.description}</div>
            ) : null}
          </div>
          {isOverridden ? (
            <button
              type="button"
              onClick={() => onSetOverride(def.key, "")}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              reset
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {def.kind === "color" ? (
            <div
              className="relative h-8 w-8 overflow-hidden rounded border"
              style={{ backgroundColor: effectiveValue || undefined }}
            >
              <input
                aria-label={`${def.label} color`}
                type="color"
                value={hex}
                onChange={(e) => {
                  setHex(e.target.value);
                  // 性能：颜色拖动会产生高频事件，这里允许上层用 rAF 节流
                  (onSetOverrideRaf ?? onSetOverride)(def.key, e.target.value);
                }}
                onPointerUp={(e) => {
                  // 确保最后一次值落盘（避免 rAF 队列未 flush）
                  const v = (e.currentTarget as HTMLInputElement).value;
                  onSetOverride(def.key, v);
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
          ) : null}
          <Input
            value={effectiveValue}
            onChange={(e) => onSetOverride(def.key, e.target.value)}
            placeholder={def.placeholder}
          />
        </div>
      </div>

      <div className="flex items-end justify-end">
        {showComputedValues ? (
          <div
            className="text-muted-foreground text-xs w-32 text-right truncate"
            title={computed}
          >
            {computed || "—"}
          </div>
        ) : null}
      </div>
    </div>
  );
});


