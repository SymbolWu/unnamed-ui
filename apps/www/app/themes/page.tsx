"use client";

import { ActiveThemeProvider } from "@/components/active-theme";
import { ThemesPreviewTabs } from "@/components/themes/ThemesPreviewTabs";
import { ThemeStudioPanel } from "@/components/theme-studio/ThemeStudioPanel";
import { Separator } from "@/registry/wuhan/ui/separator";

export default function Themes() {
  return (
    <ActiveThemeProvider initialTheme="brand radius-medium">
      <div
        data-themes-page
        // 让内部滚动生效；页面级滚动由 globals.css 的 :has([data-themes-page]) 规则禁止
        className="flex flex-1 min-h-0 overflow-hidden"
        style={{ gap: "calc(var(--spacing) * 6)", padding: "calc(var(--spacing) * 6)" }}
      >
        {/* 左侧：主题工作台（高级） */}
        <div className="flex-shrink-0 w-[520px] flex flex-col overflow-hidden min-h-0 theme-container">
          <div className="flex-1 overflow-y-auto pr-1 min-h-0">
            <ThemeStudioPanel />
          </div>
        </div>

        {/* 分隔线 */}
        <Separator orientation="vertical" className="h-full" />

        {/* 右侧：组件预览区域 */}
        <div 
          className="flex-1 flex flex-col overflow-y-auto min-w-0 min-h-0 theme-container"
          style={{ gap: "calc(var(--spacing) * 6)" }}
        >
          <ThemesPreviewTabs />
      </div>
    </div>
    </ActiveThemeProvider>
  );
}
