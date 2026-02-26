"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { ToggleButton } from "@/registry/wuhan/composed/toggle-button/toggle-button";

/**
 * 仅图标的开关按钮示例
 * 使用 option.tooltip 由组件内部正确包裹 Tooltip（Tooltip > button）
 */
export default function ToggleButtonIcon() {
  const [webSearchEnabled, setWebSearchEnabled] = useState<
    string | undefined
  >();

  return (
    <ToggleButton
      options={[
        {
          id: "web-search",
          label: "联网搜索",
          icon: <Globe className="size-4" />,
          tooltip: "联网搜索",
        },
      ]}
      value={webSearchEnabled}
      onChange={setWebSearchEnabled}
      variant="compact"
      className="p-2"
    />
  );
}
