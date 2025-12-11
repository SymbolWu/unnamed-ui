"use client";

import { useState } from "react";
import { useThemeConfig } from "@/components/active-theme";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";

// 定义可用的主题列表
const COLOR_THEMES = [
  { name: "default", label: "默认" },
  { name: "brand", label: "品牌色" },
  { name: "success", label: "成功" },
  { name: "warning", label: "警告" },
  { name: "error", label: "错误" },
] as const;

const RADIUS_THEMES = [
  { name: "radius-small", label: "小圆角" },
  { name: "radius-medium", label: "中圆角" },
  { name: "radius-large", label: "大圆角" },
  { name: "radius-none", label: "无圆角" },
] as const;

const FONT_THEMES = [
  { name: "font-pingfang", label: "PingFang 字体" },
  { name: "font-helvetica", label: "Helvetica 字体" },
  { name: "font-display", label: "显示字体" },
] as const;

const SPECIAL_THEMES = [
  { name: "ai", label: "AI 渐变" },
] as const;

export function ThemeSelector({ className }: React.ComponentProps<"div">) {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  
  // 从当前主题中解析各个部分
  const parseThemes = (theme: string) => {
    const themes = theme.split(" ").filter(Boolean);
    return {
      color: themes.find(t => COLOR_THEMES.some(ct => ct.name === t)) || "default",
      radius: themes.find(t => RADIUS_THEMES.some(rt => rt.name === t)) || "radius-medium",
      font: themes.find(t => FONT_THEMES.some(ft => ft.name === t)) || null,
      special: themes.find(t => SPECIAL_THEMES.some(st => st.name === t)) || null,
    };
  };

  const currentThemes = parseThemes(activeTheme);
  const [colorTheme, setColorTheme] = useState(currentThemes.color);
  const [radiusTheme, setRadiusTheme] = useState(currentThemes.radius);
  const [fontTheme, setFontTheme] = useState<string | null>(currentThemes.font);
  const [specialTheme, setSpecialTheme] = useState<string | null>(currentThemes.special);

  // 组合主题
  const updateTheme = (
    type: "color" | "radius" | "font" | "special",
    value: string | null
  ) => {
    let newColorTheme = colorTheme;
    let newRadiusTheme = radiusTheme;
    let newFontTheme = fontTheme;
    let newSpecialTheme = specialTheme;

    if (type === "color") {
      newColorTheme = value || "default";
      setColorTheme(newColorTheme);
    } else if (type === "radius") {
      newRadiusTheme = value || "radius-medium";
      setRadiusTheme(newRadiusTheme);
    } else if (type === "font") {
      newFontTheme = value;
      setFontTheme(newFontTheme);
    } else if (type === "special") {
      newSpecialTheme = value;
      setSpecialTheme(newSpecialTheme);
    }

    // 组合所有选中的主题
    const themes = [];
    if (newColorTheme && newColorTheme !== "default") {
      themes.push(newColorTheme);
    }
    if (newRadiusTheme) {
      themes.push(newRadiusTheme);
    }
    if (newFontTheme) {
      themes.push(newFontTheme);
    }
    if (newSpecialTheme) {
      themes.push(newSpecialTheme);
    }

    // 设置组合后的主题
    const combinedTheme = themes.length > 0 ? themes.join(" ") : "default";
    setActiveTheme(combinedTheme);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div>
        <h3 className="text-sm font-semibold mb-2">主题切换</h3>
        <p className="text-xs text-muted-foreground mb-4">
          选择不同的主题来预览效果，可以组合使用
        </p>
      </div>
      
      {/* 颜色主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">颜色主题</h4>
        <div className="flex flex-wrap gap-2">
          {COLOR_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={colorTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("color", theme.name)}
              className={cn(
                "text-xs",
                colorTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 圆角主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">圆角主题</h4>
        <div className="flex flex-wrap gap-2">
          {RADIUS_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={radiusTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("radius", theme.name)}
              className={cn(
                "text-xs",
                radiusTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 字体主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">字体主题</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={fontTheme === null ? "default" : "outline"}
            size="sm"
            onClick={() => updateTheme("font", null)}
            className={cn(
              "text-xs",
              fontTheme === null && "bg-primary text-primary-foreground"
            )}
          >
            默认字体
          </Button>
          {FONT_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={fontTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("font", theme.name)}
              className={cn(
                "text-xs",
                fontTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 特殊主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">特殊主题</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={specialTheme === null ? "default" : "outline"}
            size="sm"
            onClick={() => updateTheme("special", null)}
            className={cn(
              "text-xs",
              specialTheme === null && "bg-primary text-primary-foreground"
            )}
          >
            无
          </Button>
          {SPECIAL_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={specialTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("special", theme.name)}
              className={cn(
                "text-xs",
                specialTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

